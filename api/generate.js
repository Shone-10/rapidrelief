const SYS_PROMPT = `You are a disaster-response triage assistant. Given a raw, unstructured report from someone at or near a disaster site, extract a structured triage record. Respond ONLY with valid JSON, no markdown fences, no extra text:
{
  "category": "one of: Flood, Fire, Building Collapse, Medical Emergency, Trapped/Rescue, Road Blocked, Supply Shortage, Other",
  "urgency": "one of: critical, high, medium, low",
  "need": "a short (under 10 words) headline of the single most important need, e.g. 'Boat rescue for 3 people on rooftop'",
  "detail": "a 1-2 sentence clean summary of the situation in plain language",
  "people_affected": "your best estimate as a short string, e.g. '3 people' or 'unknown'"
}
Urgency guide: critical = immediate life threat (trapped, drowning, severe injury, fire spreading); high = serious risk if not addressed within hours; medium = significant hardship, not immediately life-threatening; low = general need, no urgency.`;

async function callGroq(apiKey, text) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYS_PROMPT },
        { role: 'user', content: text }
      ],
      temperature: 0.2
    })
  });
  if (!res.ok) throw new Error('Groq API error: ' + res.status + ' ' + (await res.text()));
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callOpenAI(apiKey, text) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYS_PROMPT },
        { role: 'user', content: text }
      ],
      temperature: 0.2
    })
  });
  if (!res.ok) throw new Error('OpenAI API error: ' + res.status + ' ' + (await res.text()));
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callAnthropic(apiKey, text) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 500,
      system: SYS_PROMPT,
      messages: [{ role: 'user', content: text }]
    })
  });
  if (!res.ok) throw new Error('Anthropic API error: ' + res.status + ' ' + (await res.text()));
  const data = await res.json();
  return data.content[0].text;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const { provider, apiKey, text } = req.body || {};
    if (!provider || !apiKey || !text) {
      res.status(400).json({ error: 'Missing provider, apiKey, or text' });
      return;
    }
    let content;
    if (provider === 'groq') content = await callGroq(apiKey, text);
    else if (provider === 'openai') content = await callOpenAI(apiKey, text);
    else if (provider === 'anthropic') content = await callAnthropic(apiKey, text);
    else { res.status(400).json({ error: 'Unknown provider' }); return; }

    res.status(200).json({ content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};