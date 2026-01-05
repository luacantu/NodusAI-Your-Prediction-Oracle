# Security Guidelines

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public issue
2. Email security concerns to the appropriate contact
3. Provide detailed information about the vulnerability
4. Allow reasonable time for response and remediation

## API Security Best Practices

### API Key Management

```bash
# DO: Use environment variables
export NODUSAI_API_KEY="your_key_here"

# DON'T: Hardcode keys in source code
const apiKey = "sk_live_abc123";  # NEVER DO THIS
