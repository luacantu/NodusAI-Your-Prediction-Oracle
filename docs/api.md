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

```
## Parameters
  Field	 Type	 Required	 Description
  query	string	Yes	Research question (10-1000 chars)
  sources	array	No	Source categories to analyze
  options.include_sources	boolean	No	Include source citations (default: true)
  options.confidence_level	string	No	narrow, standard, or wide
  options.max_sources	integer	No	Max sources to cite (1-50, default: 10)

## Source Categories
  news - News articles and media
  government - Government publications and data
  financial - Financial reports and filings
  academic - Academic papers and research
  social - Social media and forums

--- 
