
---

## 10. docs/x402-payments.md

# X402 Payment Integration

NodusAI supports the X402 payment protocol for crypto micropayments.

## Overview

X402 enables pay-per-request pricing using cryptocurrency, providing:
- No subscription required
- Pay only for what you use
- Instant settlement
- Transparent pricing

## How It Works

### 1. Request Without Payment

```http
POST /v1/assess
Content-Type: application/json

{
  "query": "Will gold prices rise in 2026?"
}

```
Receive 402 Response

HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "error": {
    "code": "payment_required",
    "message": "Payment required to process this request",
    "payment": {
      "amount": "0.01",
      "currency": "USDC",
      "network": "base-sepolia",
      "recipient": "0x1234567890abcdef1234567890abcdef12345678",
      "expires_at": "2026-01-05T12:35:00Z",
      "payment_id": "pay_abc123"
    }
  }
}

