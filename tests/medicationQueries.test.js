const assert = require('assert');

// Setup minimal browser-like globals
global.window = {};
global.localStorage = {
  getItem() { return null; },
  setItem() {},
  removeItem() {}
};

// Load data and AI code
require('../docs/therapy-speech.js');
require('../docs/medications-data.js');
require('../docs/ai.js');

function resetContext() {
  window.conversationContext.assessmentInProgress = false;
  window.conversationContext.assessmentPrompted = false;
  window.conversationContext.detectedSymptoms = {};
  window.conversationContext.messages = [];
  window.conversationContext.questionCount = 0;
}

async function runTests() {
  console.log('Testing medication related queries...');

  // Specific medication should return detailed info with disclaimer
  resetContext();
  let response = await window.generateAIResponse('Tell me about Prozac medication');
  assert.ok(response.includes('Prozac (Fluoxetine)'), 'Should mention the medication name');
  assert.ok(response.includes('educational purposes only'), 'Should include medication disclaimer');

  // Generic keyword should still return a response
  resetContext();
  response = await window.generateAIResponse('medication');
  assert.ok(response && response.length > 0, 'Should respond to generic medication keyword');
  assert.ok(!response.includes('educational purposes only'), 'Generic keyword alone should not include specific medication info');

  // General question about medication use
  resetContext();
  response = await window.generateAIResponse('What medication helps with depression?');
  assert.ok(response && response.length > 0, 'Should respond to broad medication question');

  console.log('Medication query tests passed');
}

runTests().catch(err => {
  console.error('Medication query tests failed:', err);
  process.exit(1);
});
