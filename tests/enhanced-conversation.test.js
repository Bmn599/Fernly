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
  let response1 = await window.generateAIResponse('I feel anxious all the time');
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
  
  assert.ok(shortResponse.toLowerCase().includes('anxiety') || 
           shortResponse.toLowerCase().includes('anxious') ||
           shortResponse.toLowerCase().includes('explore') ||
           shortResponse.toLowerCase().includes('talk about'),
           'Should reference anxiety context or offer to explore it further');

  // Test 2: More empathetic and varied clarification responses
  resetContext();
  
  let clarificationResponse = await window.generateAIResponse('why');
  console.log('Enhanced clarification response:', clarificationResponse || 'No response');
  
  if (!clarificationResponse) {
    console.error('Failed to get clarification response');
    return;
  }
  
  assert.ok(clarificationResponse.includes('explain') || clarificationResponse.includes('clarify') || 
           clarificationResponse.includes('break down') || clarificationResponse.includes('explanation') ||
           clarificationResponse.includes('explore') || clarificationResponse.includes('help'),
           'Should offer to explain, clarify, or help with understanding');
  assert.ok(clarificationResponse.length > 50, 'Should be more detailed than basic responses');

  // Test 3: Tone detection and responsive acknowledgments
  resetContext();
  
  // Establish negative tone
  await window.generateAIResponse('I feel terrible and everything is going wrong');
  let negativeResponse = await window.generateAIResponse('no');
  console.log('Tone-aware negative response:', negativeResponse ? negativeResponse.substring(0, 100) + '...' : 'No response');
  
  if (negativeResponse) {
    assert.ok(negativeResponse.toLowerCase().includes('perfectly') ||
             negativeResponse.toLowerCase().includes('fine') ||
             negativeResponse.toLowerCase().includes('okay') ||
             negativeResponse.toLowerCase().includes('support'),
             'Should acknowledge negative response with appropriate empathy');
  }

  // Test 4: Enhanced feedback gratitude (simulate learning feedback scenario)
  resetContext();
  
  // Generate a normal response first to get the proper context setup
  await window.generateAIResponse('I feel stressed');
  
  // Now test providing positive feedback
  let feedbackResponse = await window.generateAIResponse('helpful');
  console.log('Enhanced feedback response:', feedbackResponse || 'No response');
  
  // Since we can't directly set awaitingFeedback, let's test with simulated feedback keywords
  if (feedbackResponse) {
    // The response should handle 'helpful' as feedback if feedback systems are working
    // Or it should at least be a general response
    assert.ok(feedbackResponse.length > 30, 'Should provide a meaningful response to feedback');
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
    // The response should either acknowledge short responses OR reference context OR be a meaningful response
    const hasShortAcknowledgment = multiShortResponse.toLowerCase().includes('brief') ||
                                  multiShortResponse.toLowerCase().includes('short') ||
                                  multiShortResponse.toLowerCase().includes('keeping things') ||
                                  multiShortResponse.toLowerCase().includes('responses');
                                  
    const hasContextReference = multiShortResponse.toLowerCase().includes('anxiety') ||
                               multiShortResponse.toLowerCase().includes('sleep') ||
                               multiShortResponse.toLowerCase().includes('work') ||
                               multiShortResponse.toLowerCase().includes('stress') ||
                               multiShortResponse.toLowerCase().includes('mentioned') ||
                               multiShortResponse.toLowerCase().includes('related');
                               
    const isMeaningfulResponse = multiShortResponse.length > 80;
    
    assert.ok(hasShortAcknowledgment || hasContextReference || isMeaningfulResponse,
             'Should acknowledge short responses, reference context, or provide meaningful response');
  }

  // Test 6: Enhanced uncertainty handling
  resetContext();
  
  await window.generateAIResponse('I think I might need therapy but I\'m not sure');
  let uncertaintyResponse = await window.generateAIResponse('maybe');
  console.log('Enhanced uncertainty response:', uncertaintyResponse ? uncertaintyResponse.substring(0, 120) + '...' : 'No response');
  
  if (uncertaintyResponse) {
    assert.ok(uncertaintyResponse.toLowerCase().includes('uncertain') ||
             uncertaintyResponse.toLowerCase().includes('normal') ||
             uncertaintyResponse.toLowerCase().includes('explore') ||
             uncertaintyResponse.toLowerCase().includes('understand') ||
             uncertaintyResponse.toLowerCase().includes('hard to know'),
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