## Security Guidelines

### Reporting Security Issues

If you discover a potential security vulnerability, please report it responsibly:

- **Do NOT** open a public GitHub issue
- Contact the maintainers via the appropriate security email
- Provide clear reproduction steps and impact details
- Allow reasonable time for investigation and remediation before disclosure

---

### API Security Best Practices

#### Credential Management

**DO**
- Store credentials in environment variables or secure secret managers
- Rotate credentials regularly
- Limit credential scope and permissions

```bash
# Example: using environment variables
export NODUSAI_ACCESS_TOKEN="your_token_here"

```
## Security Practices

### Secure Storage

Clients should follow standard security best practices when integrating with the NodusAI API:

- Store access credentials in environment variables or secure secret managers
- Never commit credentials to version control
- Rotate credentials periodically
- Use separate credentials for development and production environments

---

### Request Security

All requests must be made over HTTPS.

```js
// Always use HTTPS
const API_URL = 'https://api.example.com';

// Include appropriate headers
const headers = {
  'Authorization': `Bearer ${process.env.NODUSAI_ACCESS_TOKEN}`,
  'Content-Type': 'application/json'
};
