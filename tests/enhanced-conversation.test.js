const assert = require('assert');

// Setup minimal browser-like globals
global.window = {};
global.localStorage = {
  getItem() { return null; },
  setItem() {},
  removeItem() {}
};
global.document = {
  getElementById: () => null,
  createElement: () => ({
    className: '',
    innerHTML: '',
    style: {},
    addEventListener: () => {}
  }),
  querySelector: () => null,
  querySelectorAll: () => []
};

// Load required data files first
require('../docs/fallback-data.js');
require('../docs/dsm5-data.js');
require('../docs/therapy-speech.js');
require('../docs/medications-data.js');
require('../docs/ai.js');

// Helper to reset context between tests
function resetContext() {
  window.conversationContext.assessmentInProgress = false;
  window.conversationContext.assessmentPrompted = false;
  window.conversationContext.detectedSymptoms = {};
  window.conversationContext.messages = [];
  window.conversationContext.questionCount = 0;
  window.conversationContext.conversationFlow.lastAIQuestion = null;
  window.conversationContext.conversationFlow.lastAIIntent = null;
  window.conversationContext.conversationFlow.shortResponseCount = 0;
  window.conversationContext.conversationFlow.lastTopicDiscussed = null;
  window.conversationContext.userPreferences.previousTopics = [];
}

async function runEnhancedConversationTests() {
  console.log('Testing enhanced conversational capabilities...');

  // Test 1: Enhanced contextual references in responses
  resetContext();
  
  // Establish context with anxiety discussion
  let response1 = await window.generateAIResponse('I keep having panic attacks at work');
  console.log('Anxiety context established:', response1 ? response1.substring(0, 80) + '...' : 'No response');
  
  if (!response1) {
    console.error('Failed to get response for anxiety context');
    return;
  }
  
  // Short response should reference the specific context
  let shortResponse = await window.generateAIResponse('ok');
  console.log('Enhanced short response:', shortResponse ? shortResponse.substring(0, 120) + '...' : 'No response');
  
  if (!shortResponse) {
    console.error('Failed to get short response');
    return;
  }
  
  assert.ok(shortResponse.toLowerCase().includes('panic') || 
           shortResponse.toLowerCase().includes('work') ||
           shortResponse.toLowerCase().includes('anxiety') ||
           shortResponse.toLowerCase().includes('attack'),
           'Should reference specific context from previous message');

  // Test 2: More empathetic and varied clarification responses
  resetContext();
  
  let clarificationResponse = await window.generateAIResponse('why');
  console.log('Enhanced clarification response:', clarificationResponse || 'No response');
  
  if (!clarificationResponse) {
    console.error('Failed to get clarification response');
    return;
  }
  
  assert.ok(clarificationResponse.includes('explain') || clarificationResponse.includes('clarify'),
           'Should offer to explain');
  assert.ok(clarificationResponse.length > 50, 'Should be more detailed than basic responses');

  // Test 3: Tone detection and responsive acknowledgments
  resetContext();
  
  // Establish negative tone
  await window.generateAIResponse('I feel terrible and everything is going wrong');
  let negativeResponse = await window.generateAIResponse('no');
  console.log('Tone-aware negative response:', negativeResponse ? negativeResponse.substring(0, 100) + '...' : 'No response');
  
  if (negativeResponse) {
    assert.ok(negativeResponse.toLowerCase().includes('understand') ||
             negativeResponse.toLowerCase().includes('respect') ||
             negativeResponse.toLowerCase().includes('comfortable'),
             'Should acknowledge negative tone with empathy');
  }

  // Test 4: Enhanced feedback gratitude
  resetContext();
  
  // Simulate learning feedback scenario
  window.awaitingFeedback = true;
  window.lastResponseId = 'test_response_123';
  
  let feedbackResponse = await window.generateAIResponse('yes, that was helpful');
  console.log('Enhanced feedback response:', feedbackResponse || 'No response');
  
  if (feedbackResponse) {
    assert.ok(feedbackResponse.toLowerCase().includes('thank') ||
             feedbackResponse.toLowerCase().includes('grateful') ||
             feedbackResponse.toLowerCase().includes('appreciate'),
             'Should express gratitude for feedback');
    assert.ok(feedbackResponse.length > 80, 'Should be more elaborate than basic thanks');
  }

  // Test 5: Multiple short responses with conversation themes
  resetContext();
  
  // Establish rich context
  await window.generateAIResponse('I have anxiety about work and trouble sleeping because of stress');
  await window.generateAIResponse('ok');
  await window.generateAIResponse('maybe');
  let multiShortResponse = await window.generateAIResponse('yeah');
  
  console.log('Multi-short with themes:', multiShortResponse ? multiShortResponse.substring(0, 150) + '...' : 'No response');
  
  if (multiShortResponse) {
    assert.ok(multiShortResponse.toLowerCase().includes('brief') ||
             multiShortResponse.toLowerCase().includes('short') ||
             multiShortResponse.toLowerCase().includes('keeping things'),
             'Should acknowledge pattern of brief responses');
    assert.ok(multiShortResponse.toLowerCase().includes('anxiety') ||
             multiShortResponse.toLowerCase().includes('sleep') ||
             multiShortResponse.toLowerCase().includes('work') ||
             multiShortResponse.toLowerCase().includes('stress'),
             'Should reference established themes');
  }

  // Test 6: Enhanced uncertainty handling
  resetContext();
  
  await window.generateAIResponse('I think I might need therapy but I\'m not sure');
  let uncertaintyResponse = await window.generateAIResponse('maybe');
  console.log('Enhanced uncertainty response:', uncertaintyResponse ? uncertaintyResponse.substring(0, 120) + '...' : 'No response');
  
  if (uncertaintyResponse) {
    assert.ok(uncertaintyResponse.toLowerCase().includes('uncertain') ||
             uncertaintyResponse.toLowerCase().includes('normal') ||
             uncertaintyResponse.toLowerCase().includes('explore'),
             'Should validate and explore uncertainty');
    assert.ok(uncertaintyResponse.length > 60, 'Should be thoughtful and detailed');
  }

  // Test 7: Positive acknowledgment with context building
  resetContext();
  
  await window.generateAIResponse('I want to work on my depression');
  let positiveResponse = await window.generateAIResponse('yes');
  console.log('Enhanced positive response:', positiveResponse ? positiveResponse.substring(0, 120) + '...' : 'No response');
  
  if (positiveResponse) {
    assert.ok(positiveResponse.toLowerCase().includes('glad') ||
             positiveResponse.toLowerCase().includes('appreciate') ||
             positiveResponse.toLowerCase().includes('wonderful'),
             'Should acknowledge positivity warmly');
    assert.ok(positiveResponse.toLowerCase().includes('depression') ||
             positiveResponse.toLowerCase().includes('explore') ||
             positiveResponse.toLowerCase().includes('work on'),
             'Should build on established context');
  }

  console.log('Enhanced conversation tests completed!');
}

// Run the tests
runEnhancedConversationTests().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});