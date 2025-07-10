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
  window.conversationContext.messages = [];
  window.conversationContext.questionCount = 0;
  window.conversationContext.conversationFlow.lastAIQuestion = null;
  window.conversationContext.conversationFlow.lastAIIntent = null;
  window.conversationContext.conversationFlow.shortResponseCount = 0;
  window.conversationContext.conversationFlow.lastTopicDiscussed = null;
  window.conversationContext.userPreferences.previousTopics = [];
}

async function runEnhancedContextualTests() {
  console.log('Testing enhanced contextual responses and human-like behavior...');

  // Test 1: Enhanced empathetic responses for multiple short inputs
  resetContext();
  
  // Establish a topic first
  await window.generateAIResponse('I have anxiety and trouble sleeping');
  
  // Generate multiple short responses to trigger enhanced empathetic logic
  await window.generateAIResponse('ok');
  await window.generateAIResponse('maybe');
  let enhancedResponse = await window.generateAIResponse('yeah');
  
  console.log('Enhanced response for multiple short inputs:', enhancedResponse.substring(0, 150) + '...');
  
  // Should contain empathetic language and reference topics
  assert.ok(enhancedResponse.toLowerCase().includes('brief') || 
           enhancedResponse.toLowerCase().includes('short') ||
           enhancedResponse.toLowerCase().includes('keeping things') ||
           enhancedResponse.toLowerCase().includes('completely okay') ||
           enhancedResponse.toLowerCase().includes('concise') ||
           enhancedResponse.toLowerCase().includes('honest') ||
           enhancedResponse.toLowerCase().includes('communicates differently'),
           'Should acknowledge communication style empathetically');
  
  assert.ok(enhancedResponse.toLowerCase().includes('anxiety') ||
           enhancedResponse.toLowerCase().includes('sleep'),
           'Should reference previously discussed topics');

  // Test 2: Enhanced positive acknowledgment variety
  resetContext();
  
  await window.generateAIResponse('I think I have depression');
  let positiveResponse = await window.generateAIResponse('yes');
  
  console.log('Enhanced positive response:', positiveResponse.substring(0, 150) + '...');
  
  // Should be more varied and warm than generic responses
  assert.ok(positiveResponse.toLowerCase().includes('glad') ||
           positiveResponse.toLowerCase().includes('appreciate') ||
           positiveResponse.toLowerCase().includes('honored') ||
           positiveResponse.toLowerCase().includes('thank') ||
           positiveResponse.toLowerCase().includes('walk through') ||
           positiveResponse.toLowerCase().includes('whatever pace') ||
           positiveResponse.toLowerCase().includes('here to'),
           'Should use warm, varied positive acknowledgment language');

  // Test 3: Enhanced negative acknowledgment with empathy
  resetContext();
  
  await window.generateAIResponse('Do you think I should get therapy?');
  let negativeResponse = await window.generateAIResponse('no');
  
  console.log('Enhanced negative response:', negativeResponse.substring(0, 150) + '...');
  
  // Should be empathetic and offer alternatives
  assert.ok(negativeResponse.toLowerCase().includes('understand') ||
           negativeResponse.toLowerCase().includes('completely') ||
           negativeResponse.toLowerCase().includes('perfectly') ||
           negativeResponse.toLowerCase().includes('okay'),
           'Should acknowledge negative response with empathy');

  // Test 4: Enhanced uncertainty handling
  resetContext();
  
  await window.generateAIResponse('I might have ADHD');
  let uncertainResponse = await window.generateAIResponse('maybe');
  
  console.log('Enhanced uncertainty response:', uncertainResponse.substring(0, 150) + '...');
  
  // Should validate uncertainty and offer gentle exploration
  assert.ok(uncertainResponse.toLowerCase().includes('uncertainty') ||
           uncertainResponse.toLowerCase().includes('thoughtful') ||
           uncertainResponse.toLowerCase().includes('honest') ||
           uncertainResponse.toLowerCase().includes('normal'),
           'Should validate uncertainty empathetically');

  // Test 5: Enhanced feedback responses with gratitude
  resetContext();
  
  // Simulate feedback scenario by setting up context
  window.conversationContext.questionCount = 20; // Trigger feedback prompt
  let responseWithFeedback = await window.generateAIResponse('I feel anxious');
  
  // Test grateful feedback response
  let feedbackResponse = window.provideFeedback('helpful');
  
  console.log('Enhanced feedback response:', feedbackResponse.substring(0, 150) + '...');
  
  // Should be more grateful and warm
  assert.ok(feedbackResponse.toLowerCase().includes('grateful') ||
           feedbackResponse.toLowerCase().includes('means a lot') ||
           feedbackResponse.toLowerCase().includes('appreciate') ||
           feedbackResponse.toLowerCase().includes('thank'),
           'Should express genuine gratitude for feedback');

  // Test 6: Empathetic short response templates
  resetContext();
  
  // Test individual short responses for improved empathy
  let shortOkResponse = await window.generateAIResponse('ok');
  console.log('Enhanced "ok" response:', shortOkResponse.substring(0, 100) + '...');
  
  assert.ok(shortOkResponse.length > 50, 'Should provide substantial response even to short input');
  assert.ok(!shortOkResponse.includes('What would you like to talk about next?'), 
           'Should avoid generic templates');

  // Test 7: Varied default acknowledgments
  resetContext();
  
  let ack1 = await window.generateAIResponse('okay');
  resetContext();
  let ack2 = await window.generateAIResponse('okay');
  resetContext(); 
  let ack3 = await window.generateAIResponse('okay');
  
  console.log('Acknowledgment 1:', ack1.substring(0, 50));
  console.log('Acknowledgment 2:', ack2.substring(0, 50));
  console.log('Acknowledgment 3:', ack3.substring(0, 50));
  
  // Should have variety in responses (not always identical)
  assert.ok(ack1 !== ack2 || ack2 !== ack3, 
           'Should provide varied acknowledgment responses to avoid repetition');

  console.log('Enhanced contextual response tests passed!');
}

// Run the tests
runEnhancedContextualTests().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});