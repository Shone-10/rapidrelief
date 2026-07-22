# RapidRelief — Problem Statement

**Theme:** Disaster response.

## The problem

In the first hours after a flood, fire, or building collapse, information arrives fast and unstructured — voice notes, WhatsApp texts, panicked phone calls describing what's happening in whatever order and detail the reporter can manage. Responders and coordinators then have to manually read each one, figure out how urgent it is, and decide what to do — a slow, error-prone process exactly when speed matters most.

## Who it affects

Disaster response coordinators and volunteer relief teams who receive a flood of raw citizen reports and have to triage them by hand. Indirectly, everyone waiting on the ground for help — every minute lost to manual triage is a minute of delayed rescue or aid.

## Why existing solutions fail

- Crowd-reporting tools (community WhatsApp groups, generic incident-report forms) collect reports but don't triage them — a "boat needed for 3 people trapped on a roof" and a "we're low on drinking water" report look identical in a group chat until someone reads both carefully.
- Structured incident-report forms solve this in theory, but panicked or exhausted reporters skip fields, under-describe severity, or simply don't have time to fill out a form correctly.
- Nothing currently converts a messy, real-language description directly into a sorted, severity-ranked action list.

## Our approach

RapidRelief asks for one thing: describe what's happening, in your own words. An AI model then extracts:

- **Category** (flood, fire, building collapse, medical emergency, trapped/rescue, road blocked, supply shortage, other)
- **Urgency** (critical / high / medium / low, based on immediate life-threat vs. general hardship)
- **The single most important need**, as a short headline
- **Estimated people affected**

Every report lands on a live, auto-sorted board — most critical always on top — so a coordinator can scan the board instead of reading full reports one by one. The board is saved locally in the browser, so it stays viewable even if connectivity drops after reports are in, which matches the real conditions of a disaster zone.

## Why AI is central, not decorative

The entire value of RapidRelief is the triage judgment call — turning a rambling, real description into an accurate urgency ranking and a clear need statement. That's a task that previously required a trained human reading carefully; the AI model does it in seconds, directly from the reporter's own words, with no form-filling required from someone who may not have time or composure to fill one out.
