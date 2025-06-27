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

// Helper to access private functions for testing
function testRecognizeIntent(message) {
  // Since recognizeIntent is inside ai.js, we need to call generateAIResponse
  // and check the result to understand the intent recognition
  return new Promise(async (resolve) => {
    try {
      const response = await window.generateAIResponse(message);
      resolve(response);
    } catch (error) {
      resolve('Error: ' + error.message);
    }
  });
}

// Helper to reset context between tests
function resetContext() {
  window.conversationContext.assessmentInProgress = false;
  window.conversationContext.assessmentPrompted = false;
  window.conversationContext.detectedSymptoms = {};
  window.conversationContext.messages = [];
  window.conversationContext.questionCount = 0;
}

async function runTests() {
  console.log('Testing single-word input handling...');

  // Test acknowledgment words
  resetContext();
  let response = await testRecognizeIntent('ok');
  console.log('Response to "ok":', response);
  assert.ok(response && response.length > 0, 'Should respond to "ok"');
  // Just check that it's not a generic "I don't understand" response
  assert.ok(!response.includes("I don't understand") && !response.includes("could you tell me more"), 'Should provide a specific response to "ok"');

  resetContext();
  response = await testRecognizeIntent('yes');
  console.log('Response to "yes":', response);
  assert.ok(response && response.length > 0, 'Should respond to "yes"');
  assert.ok(!response.includes("I don't understand") && !response.includes("could you tell me more"), 'Should provide a specific response to "yes"');

  resetContext();
  response = await testRecognizeIntent('no');
  assert.ok(response && response.length > 0, 'Should respond to "no"');

  // Test clarification words
  resetContext();
  response = await testRecognizeIntent('why');
  console.log('Response to "why":', response);
  assert.ok(response && response.length > 0, 'Should respond to "why"');
  assert.ok(response.includes('explain') || response.includes('clarify') || response.includes('help'), 'Should provide clarification response to "why"');

  resetContext();
  response = await testRecognizeIntent('what');
  assert.ok(response && response.length > 0, 'Should respond to "what"');

  resetContext();
  response = await testRecognizeIntent("what's that");
  console.log('Response to "what\'s that":', response);
  assert.ok(response && response.length > 0, 'Should respond to "what\'s that"');
  assert.ok(response.includes('explain') || response.includes('clarify') || response.includes('help') || response.includes('break down'), 'Should offer to explain');

  // Test thank you responses
  resetContext();
  response = await testRecognizeIntent('thanks');
  assert.ok(response && response.length > 0, 'Should respond to "thanks"');

  console.log('Single-word input tests passed!');
}

// Run the tests
runTests().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});