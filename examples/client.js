/**
 * NodusAI JavaScript Client (Example)
 *
 * Minimal client for interacting with the NodusAI API.
 * Uses placeholder endpoints and mock configuration values.
 *
 * Note: Some deployments may use API credentials, x402 payment verification, or both.
 */

const DEFAULT_CONFIG = {
  apiUrl: 'https://api.example.com',
  apiVersion: 'v1',
  timeout: 30_000
};

export class NodusAIClient {
  constructor(config = {}) {
    this.apiUrl = config.apiUrl || DEFAULT_CONFIG.apiUrl;
    this.apiVersion = config.apiVersion || DEFAULT_CONFIG.apiVersion;
    this.timeout = config.timeout || DEFAULT_CONFIG.timeout;

    // Optional: depending on deployment, this may be required (API key) or not (x402-only flows)
    this.accessToken = config.accessToken;
  }

  async _request(method, endpoint, data = null, extraHeaders = {}) {
    const url = `${this.apiUrl}/${this.apiVersion}${endpoint}`;

    const headers = {
      'Content-Type': 'application/json',
      ...extraHeaders
    };

    // Only attach Authorization when present (avoid implying it’s always required)
    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    const options = { method, headers };

    if (data) options.body = JSON.stringify(data);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    options.signal = controller.signal;

    try {
      const response = await fetch(url, options);
      clearTimeout(timeoutId);

      const rateLimit = {
        limit: response.headers.get('X-RateLimit-Limit'),
        remaining: response.headers.get('X-RateLimit-Remaining'),
        reset: response.headers.get('X-RateLimit-Reset')
      };

      const responseData = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(responseData?.error?.message || 'API request failed');
        error.code = responseData?.error?.code;
        error.status = response.status;
        error.details = responseData?.error?.details;

        // If using x402, payment instructions may be returned on 402 responses
        error.payment = responseData?.error?.payment;

        error.rateLimit = rateLimit;
        throw error;
      }

      return { data: responseData, rateLimit };
    } catch (err) {
      clearTimeout(timeoutId);

      if (err?.name === 'AbortError') {
        const timeoutError = new Error('Request timeout');
        timeoutError.code = 'timeout';
        throw timeoutError;
      }

      throw err;
    }
  }

  async assess(queryOrOptions, options = {}) {
    const requestBody =
      typeof queryOrOptions === 'string'
        ? { query: queryOrOptions, ...options }
        : queryOrOptions;

    const result = await this._request('POST', '/assess', requestBody);
    return result.data;
  }

  async getAssessment(assessmentId) {
    const result = await this._request('GET', `/assess/${assessmentId}`);
    return result.data;
  }

  async health() {
    const result = await this._request('GET', '/health');
    return result.data;
  }
}

export const SOURCE_CATEGORIES = ['news', 'government', 'financial', 'academic', 'social'];

export function formatLikelihood(value) {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatConfidenceInterval(likelihood) {
  const lower = formatLikelihood(likelihood.lower_bound);
  const upper = formatLikelihood(likelihood.upper_bound);
  const estimate = formatLikelihood(likelihood.estimate);
  return `${estimate} (${lower}–${upper})`;
}

