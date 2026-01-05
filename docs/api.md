# NodusAI API Reference

> **Note**: All endpoints in this documentation use placeholder URLs (`https://api.example.com`). Replace with your actual API endpoint when available.

## Base URL https://api.example.com/v1


## Authentication

All API requests require authentication via Bearer token:

```http
Authorization: Bearer YOUR_API_KEY

Endpoints
POST /assess
Generate a likelihood assessment for a research question.

Request

{
  "query": "Will the Federal Reserve raise interest rates in Q1 2026?",
  "sources": ["news", "government", "financial"],
  "options": {
    "include_sources": true,
    "confidence_level": "standard",
    "max_sources": 10
  }
}



{
  "id": "assess_abc123xyz789",
  "query": "Will the Federal Reserve raise interest rates in Q1 2026?",
  "likelihood": {
    "estimate": 0.35,
    "lower_bound": 0.25,
    "upper_bound": 0.45,
    "confidence_level": "standard"
  },
  "assessment": "Unlikely",
  "reasoning_summary": "Based on current economic indicators...",
  "sources": [
    {
      "title": "Federal Reserve Press Release",
      "url": "https://example.gov/fed-release",
      "published_at": "2025-12-15T14:00:00Z",
      "relevance": "high",
      "category": "government"
    }
  ],
  "generated_at": "2026-01-05T12:34:56Z",
  "expires_at": "2026-01-05T18:34:56Z",
  "disclaimer": "This is a probabilistic research signal, not a prediction or financial advice."
}
