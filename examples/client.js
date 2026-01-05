/**
 * NodusAI JavaScript Client
 * 
 * A minimal client for interacting with the NodusAI API.
 * This example uses MOCK endpoints - replace with your actual API URL.
 */

const DEFAULT_CONFIG = {
  apiUrl: 'https://api.example.com',
  apiVersion: 'v1',
  timeout: 30000
};

export class NodusAIClient {
  constructor(config = {}) {
    this.apiUrl = config.apiUrl || DEFAULT_CONFIG.apiUrl;
    this.apiKey = config.apiKey;
    this.apiVersion = config.apiVersion || DEFAULT_CONFIG.apiVersion;
    this.timeout = config.timeout || DEFAULT_CONFIG.timeout;

    if (!this.apiKey) {
      console.warn('NodusAI: No API key provided. Requests will likely fail.');
    }
  }

  async _request(method, endpoint, data = null) {
    const url = `${this.apiUrl}/${this.apiVersion}${endpoint}`;
    
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

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

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(responseData.error?.message || 'API request failed');
        error.code = responseData.error?.code;
        error.status = response.status;
        error.details = responseData.error?.details;
        error.payment = responseData.error?.payment;
        error.rateLimit = rateLimit;
        throw error;
      }

      return { data: responseData, rateLimit };
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        const timeoutError = new Error('Request timeout');
        timeoutError.code = 'timeout';
        throw timeoutError;
      }
      
      throw error;
    }
  }

  async assess(queryOrOptions, options = {}) {
    let requestBody;

    if (typeof queryOrOptions === 'string') {
      requestBody = { query: queryOrOptions, ...options };
    } else {
      requestBody = queryOrOptions;
    }

    const result = await this._request('POST', '/assess', requestBody);
    return result.data;
  }

  async getAssessment(assessmentId) {
    const result = await this._request('GET', `/assess/${assessmentId}`);
    return result.data;
  }

  async health() {
    const url = `${this.apiUrl}/${this.apiVersion}/health`;
    const response = await fetch(url);
    return response.json();
  }
}

export const ASSESSMENT_CATEGORIES = {
  'Highly Unlikely': { min: 0.00, max: 0.15 },
  'Unlikely': { min: 0.15, max: 0.35 },
  'Possible': { min: 0.35, max: 0.50 },
  'Likely': { min: 0.50, max: 0.70 },
  'Highly Likely': { min: 0.70, max: 0.85 },
  'Very Highly Likely': { min: 0.85, max: 1.00 }
};

export const SOURCE_CATEGORIES = ['news', 'government', 'financial', 'academic', 'social'];

export function formatLikelihood(likelihood) {
  return `${(likelihood * 100).toFixed(1)}%`;
}

export function formatConfidenceInterval(likelihood) {
  const lower = formatLikelihood(likelihood.lower_bound);
  const upper = formatLikelihood(likelihood.upper_bound);
  const estimate = formatLikelihood(likelihood.estimate);
  return `${estimate} (${lower} - ${upper})`;
}
