
---

## 7. docs/architecture.md

```markdown

## NodusAI Architecture Overview

> **Note**: This document describes only the public-facing architecture. The proprietary oracle engine and scoring algorithms are not included.

## System Overview

┌─────────────────────────────────────────────────────────────┐
│ Client Applications │
│ (Web, Mobile, API Integrations) │
└─────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ API Gateway │
│ (Authentication, Rate Limiting) │
└─────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ [PROPRIETARY - NOT INCLUDED] │
│ │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ Oracle │ │ Scoring │ │ Source │ │
│ │ Engine │◄──►│ System │◄──►│ Analyzer │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ │
│ │
└─────────────────────────────────────────────────────────────┘
│
▼
┌─────────────────────────────────────────────────────────────┐
│ Response Formatter │
│ (JSON serialization, disclaimers) │
└─────────────────────────────────────────────────────────────┘

```
## Request Flow

1. **Client Request**  
   An application submits an outcome-specific query via the public REST API.

2. **Access Validation**  
   Requests are validated at the API gateway (authentication, authorization, or payment verification, depending on configuration).

3. **Rate Limiting**  
   Requests are evaluated against applicable rate limits and usage policies.

4. **Processing**  
   The request is processed by NodusAI’s internal assessment engine (proprietary).

5. **Response**  
   A structured JSON response is returned containing an evidence-backed likelihood assessment.

---

## Public Components

### API Layer
- RESTful endpoints
- JSON-based request and response formats
- Authenticated access
- Rate-limiting headers and usage metadata

### Response Format
- Likelihood assessments with confidence scores
- Human-readable assessment categories
- Source citations with timestamps and metadata
- Required legal and informational disclaimers

---

## What’s Intentionally Not Documented

The following components are proprietary and intentionally excluded from this repository:

- Internal assessment and reasoning logic
- Scoring or weighting algorithms
- Source evaluation methodologies
- Model architectures or configurations
- Training data or training processes
- Production infrastructure and deployment systems

---

## Integration Points

### Input
- Outcome-focused text queries (10–1000 characters)
- Optional source category preferences
- Request-level configuration options

### Output
- Likelihood scores (0.0–1.0, non-deterministic)
- Confidence indicators
- Assessment labels
- Source citations
- Timestamps and supporting metadata
