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

- Pay-per-request pricing
- USDC payments across supported networks
- No subscriptions required
- Deterministic payment → response flow

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

API Example

// All examples use mock endpoints - replace with your actual API URL
const response = await fetch('https://api.example.com/v1/assess', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: 'Will the Federal Reserve raise interest rates in Q1 2026?',
    sources: ['news', 'government', 'financial']
  })
});
const result = await response.json();
console.log(result.assessment);  // e.g., "Unlikely"
console.log(result.likelihood);  // { estimate: 0.35, lower_bound: 0.25, upper_bound: 0.45 }

Documentation

API Reference - Endpoints, authentication, request/response formats

Architecture Overview - System design (public components only)

X402 Payments - Crypto micropayment integration

Security - Security practices and guidelines

Legal & Disclaimers - Terms, liability, and usage restrictions

Repository Structure
├── docs/           # Documentation
├── schemas/        # JSON schemas for API validation
├── examples/       # Code examples and client libraries
├── demo-ui/        # Interactive demo (mock data only)
└── README.md       # This file

What's Included
API documentation and schemas
Example client implementations
Interactive demo UI (mock data)
Integration guides

What's NOT Included
Proprietary oracle engine
Scoring algorithms
Production API endpoints
Infrastructure configuration
Training data or models

Legal Notices

Disclaimer
THE LIKELIHOOD ASSESSMENTS PROVIDED BY NODUSAI ARE PROBABILISTIC RESEARCH SIGNALS, NOT PREDICTIONS OR GUARANTEES. They are based on publicly available information analyzed at a specific point in time and should not be used as the sole basis for any financial, investment, legal, or other decisions.

No Financial Advice
NodusAI does not provide financial, investment, legal, or tax advice. All outputs are for informational and research purposes only.

Limitation of Liability
See docs/legal.md for complete terms and conditions.

License
MIT License - See LICENSE for details.

Contact
Documentation Issues: Open a GitHub issue
Security Concerns: See SECURITY.md

