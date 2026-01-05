
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

```HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "error": {
    "code": "payment_required",
    "message": "Payment is required to process this request",
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


```
Send Payment
Send the specified amount to the recipient address on the indicated network.

```Retry with Proof
POST /v1/assess
Content-Type: application/json
X-Payment-Tx: 0xabc123...your_transaction_hash
X-Payment-Network: base-sepolia

{
  "query": "Will gold prices rise in 2026?"
}

```
Receive Assessment
```HTTP/1.1 200 OK

{
  "id": "assess_xyz789",
  "query": "Will gold prices rise in 2026?",
  "likelihood": { ... },
  ...
}

````
Supported Networks

| Network      | Currency | Environment |
| ------------ | -------- | ----------- |
| Base Sepolia | USDC     | Testnet     |
| Base Mainnet | USDC     | Production  |


Payment Headers

| Header              | Description                           |
| ------------------- | ------------------------------------- |
| `X-Payment-Tx`      | Transaction hash proving payment      |
| `X-Payment-Network` | Network on which the payment was made |


Error Codes

| Code                   | Description                                |
| ---------------------- | ------------------------------------------ |
| `payment_required`     | Payment is required to process the request |
| `payment_expired`      | Payment window has expired                 |
| `payment_invalid`      | Transaction not found or invalid           |
| `payment_insufficient` | Amount paid is less than required          |

