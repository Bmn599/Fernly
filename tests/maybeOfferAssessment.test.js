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

// Helper to reset context between tests
function resetContext() {
  window.conversationContext.assessmentInProgress = false;
  window.conversationContext.assessmentPrompted = false;
  window.conversationContext.detectedSymptoms = {};
}

// Test: no assessment when fewer than two symptoms
resetContext();
window.conversationContext.detectedSymptoms = { depression: ['sad'] };
assert.strictEqual(window.maybeOfferAssessment(), '', 'Should not offer assessment for single symptom');

// Test: assessment offered when two symptoms
resetContext();
window.conversationContext.detectedSymptoms = { anxiety: ['worried', 'nervous'] };
const prompt = window.maybeOfferAssessment();
assert.ok(prompt && prompt.includes('wellness assessment'), 'Should offer assessment when symptoms >= 2');

// Test: no assessment if already offered
resetContext();
window.conversationContext.detectedSymptoms = { anxiety: ['worried', 'nervous'] };
window.conversationContext.assessmentPrompted = true;
assert.strictEqual(window.maybeOfferAssessment(), '', 'Should not offer assessment if already prompted');

console.log('maybeOfferAssessment tests passed');
