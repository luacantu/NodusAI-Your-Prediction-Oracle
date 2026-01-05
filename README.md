# NodusAI - Public Documentation

**Website:** https://nodusai.app

> Probabilistic likelihood assessments powered by real-time data analysis

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Note**: This repository intentionally excludes NodusAI's proprietary oracle engine. The core assessment logic, scoring algorithms, and production infrastructure are not included.


NodusAI is an outcome-focused research and verification platform designed to provide **evidence-backed likelihood assessments** for prediction markets and decision systems.

Rather than generating opinions or predictions, NodusAI produces **structured research signals** grounded in publicly available information, with clear sourcing, timestamps, and uncertainty.

---

## What NodusAI Does

NodusAI helps users and developers assess **how strongly current public evidence supports a specific outcome**, such as outcomes listed in prediction markets or event-based questions.

Core capabilities include:

- Outcome-specific research assessments (YES / NO outcomes evaluated independently)
- URL-grounded analysis for prediction market questions
- Structured, machine-readable outputs (not free-form chat)
- Source citations and time relevance
- Pay-per-request access using x402 micropayments (USDC)

---

## What NodusAI Is *Not*

To avoid ambiguity, NodusAI is intentionally **not**:

- A prediction engine
- A trading or betting tool
- Financial, legal, or investment advice
- A chatbot or conversational AI
- A system that guarantees correctness or outcomes

Outputs are **probabilistic research signals**, not assertions of fact.

----

## x402 Micropayments

NodusAI integrates x402, enabling:

-Pay-per-request pricing
-USDC payments across supported networks
-No subscriptions required
-Deterministic payment → response flow

This model allows access to research signals without relying on tokens, ads, or data extraction.

--- 
## Safety & Legal Posture

NodusAI provides evidence-backed likelihood assessments based on publicly available information.

- Outputs are research signals, not predictions or guarantees
- No trading, betting, or financial actions are recommended
- No assurance of accuracy or completeness is implied
- Users are responsible for their own decisions

For more details, see docs/legal.md

## Use Cases

- Prediction market research
- Outcome verification tooling
- Risk analysis dashboards
- Event-based decision support
- Academic or exploratory market analysis

---

## Status

NodusAI is under active development.
Interfaces and schemas may evolve as the platform expands.

Learn More

Website: https://nodusai.app

Documentation: see /docs

---

## Output Philosophy

NodusAI returns **structured assessments**, not recommendations.

Example (illustrative only):

```json
{
  "queried_outcome": "ETH ETF approved before March 31",
  "support_level": "MODERATE_SUPPORT",
  "confidence": 0.71,
  "evidence": [
    {
      "source": "Public regulatory filing",
      "url": "https://example.com",
      "timestamp": "2026-01-03"
    }
  ],
  "last_updated": "2026-01-05"
}


