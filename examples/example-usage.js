/**
 * NodusAI API - Example Usage
 * All examples use MOCK endpoints and are safe to publish.
 */

import {
  NodusAIClient,
  formatLikelihood,
  formatConfidenceInterval,
  SOURCE_CATEGORIES
} from './client.js';

const config = {
  apiUrl: process.env.NODUSAI_API_URL || 'https://api.example.com',
  // Optional: depending on deployment, auth may be API token and/or x402 payment verification.
  accessToken: process.env.NODUSAI_ACCESS_TOKEN || '',
  timeout: 30000
};

const client = new NodusAIClient(config);

async function simpleAssessment() {
  console.log('=== Simple Assessment ===\n');

  try {
    const result = await client.assess(
      'Will the Federal Reserve raise interest rates in Q1 2026?'
    );

    console.log('Query:', result.query);

    // Prefer neutral fields (align to your schema)
    if (result.label) console.log('Label:', result.label);
    if (result.likelihood?.estimate != null) {
      console.log('Likelihood:', formatLikelihood(result.likelihood.estimate));
    }
  } catch (error) {
    console.error('Error:', error.message);

    // If using x402, a 402 may include payment instructions (mocked in docs)
    if (error.code === 'payment_required' && error.payment) {
      console.log('Payment required:', error.payment);
    }

    console.log('(Expected when using mock endpoints)');
  }
}

async function assessmentWithOptions() {
  console.log('\n=== Assessment with Options ===\n');

  try {
    const result = await client.assess({
      query: 'Will Company X announce earnings above expectations?',
      sources: ['news', 'financial', 'social'],
      options: {
        include_sources: true,
        confidence_level: 'narrow',
        max_sources: 15
      }
    });

    if (result.label) console.log('Label:', result.label);
    if (result.likelihood) {
      console.log('Confidence:', formatConfidenceInterval(result.likelihood));
    }
    if (Array.isArray(result.evidence)) {
      console.log('Sources returned:', result.evidence.length);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

function showSourceCategories() {
  console.log('\n=== Available Source Categories ===\n');
  SOURCE_CATEGORIES.forEach(cat => console.log(`  - ${cat}`));
}

async function main() {
  console.log('NodusAI Client Examples');
  console.log('Note: Using MOCK endpoints\n');

  await simpleAssessment();
  await assessmentWithOptions();
  showSourceCategories();

  console.log('\nExamples complete!');
}

main().catch(console.error);
