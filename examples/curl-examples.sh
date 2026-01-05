#!/usr/bin/env bash
set -euo pipefail

# NodusAI API - cURL Examples
# These examples use MOCK endpoints (https://api.example.com)

API_URL="${NODUSAI_API_URL:-https://api.example.com}"
ACCESS_TOKEN="${NODUSAI_ACCESS_TOKEN:-}"

auth_header=()
if [[ -n "${ACCESS_TOKEN}" ]]; then
  auth_header=(-H "Authorization: Bearer ${ACCESS_TOKEN}")
fi

echo "=== NodusAI API Examples ==="
echo "API URL: ${API_URL}"
echo ""

# Example 1: Basic Assessment
echo "=== Example 1: Basic Assessment ==="
curl -sS --fail-with-body -X POST "${API_URL}/v1/assess" \
  -H "Content-Type: application/json" \
  "${auth_header[@]}" \
  -d '{
    "query": "Will the Federal Reserve raise interest rates in Q1 2026?"
  }'
echo ""
echo ""

# Example 2: With Source Categories
echo "=== Example 2: With Source Categories ==="
curl -sS --fail-with-body -X POST "${API_URL}/v1/assess" \
  -H "Content-Type: application/json" \
  "${auth_header[@]}" \
  -d '{
    "query": "Will Company X announce earnings above expectations?",
    "sources": ["news", "financial", "social"]
  }'
echo ""
echo ""

# Example 3: With Options
echo "=== Example 3: With Options ==="
curl -sS --fail-with-body -X POST "${API_URL}/v1/assess" \
  -H "Content-Type: application/json" \
  "${auth_header[@]}" \
  -d '{
    "query": "Will inflation fall below 2% in the United States by end of 2026?",
    "sources": ["government", "financial", "academic"],
    "options": {
      "include_sources": true,
      "confidence_level": "narrow",
      "max_sources": 15
    }
  }'
echo ""
echo ""

# Example 4: Health Check
echo "=== Example 4: Health Check ==="
curl -sS --fail-with-body -X GET "${API_URL}/v1/health"
echo ""
echo ""
echo "=== Examples Complete ==="
