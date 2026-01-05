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
