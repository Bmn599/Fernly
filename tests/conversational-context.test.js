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

async function runConversationalTests() {
  console.log('Testing conversational context awareness...');

  // Test 1: AI asks about anxiety, user says "yes" - should continue with anxiety content
  resetContext();
  
  // First, have AI ask about anxiety
  let aiResponse = await window.generateAIResponse('I feel worried all the time');
  console.log('AI response to anxiety mention:', aiResponse.substring(0, 100) + '...');
  
  // Now user responds with "yes" - should get anxiety-specific follow-up
  let yesResponse = await window.generateAIResponse('yes');
  console.log('Response to "yes" after anxiety topic:', yesResponse.substring(0, 100) + '...');
  
  // Verify it's anxiety-related and not generic
  assert.ok(yesResponse.toLowerCase().includes('anxiety') || 
           yesResponse.toLowerCase().includes('anxious') ||
           yesResponse.toLowerCase().includes('worried') ||
           yesResponse.toLowerCase().includes('trigger'),
           'Should provide anxiety-specific follow-up, not generic acknowledgment');

  // Test 2: AI asks about depression, user says "no" - should redirect appropriately
  resetContext();
  
  // Have AI mention depression
  aiResponse = await window.generateAIResponse('I feel really sad lately');
  console.log('AI response to depression mention:', aiResponse.substring(0, 100) + '...');
  
  // User says no
  let noResponse = await window.generateAIResponse('no');
  console.log('Response to "no" after depression topic:', noResponse.substring(0, 100) + '...');
  
  // Should acknowledge the "no" and redirect, not be generic
  assert.ok(!noResponse.includes("What would you like to talk about next?"), 
           'Should not use generic acknowledgment template');
  assert.ok(noResponse.toLowerCase().includes('understand') || 
           noResponse.toLowerCase().includes('okay') ||
           noResponse.toLowerCase().includes('fine') ||
           noResponse.toLowerCase().includes('natural') ||
           noResponse.toLowerCase().includes('worries') ||
           noResponse.toLowerCase().includes('heart'),
           'Should acknowledge the negative response appropriately');

  // Test 3: Multiple short responses should reference recent topics
  resetContext();
  
  // Establish some topics first
  let initialResponse = await window.generateAIResponse('I have trouble sleeping and feel anxious');
  console.log('Initial response established topics:', initialResponse.substring(0, 100) + '...');
  
  // Debug: Check if topics were tracked
  console.log('Topics tracked after initial:', window.conversationContext.userPreferences.previousTopics);
  console.log('Detected symptoms:', Object.keys(window.conversationContext.detectedSymptoms));
  
  // First short response
  let okResponse = await window.generateAIResponse('ok');
  console.log('Short response count after "ok":', window.conversationContext.conversationFlow.shortResponseCount);
  console.log('OK response:', okResponse.substring(0, 100));
  
  // Second short response  
  let maybeResponse2 = await window.generateAIResponse('maybe');
  console.log('Short response count after "maybe":', window.conversationContext.conversationFlow.shortResponseCount);
  console.log('Maybe response:', maybeResponse2.substring(0, 100));
  
  // Third short response should reference previous topics
  let multiShortResponse = await window.generateAIResponse('yeah');
  console.log('Response after multiple short responses:', multiShortResponse.substring(0, 200) + '...');
  console.log('Final short response count:', window.conversationContext.conversationFlow.shortResponseCount);
  console.log('Last AI intent:', window.conversationContext.conversationFlow.lastAIIntent);
  
  // Check if it references topics from detected symptoms or previous topics
  assert.ok(multiShortResponse.toLowerCase().includes('sleep') || 
           multiShortResponse.toLowerCase().includes('anxiety') ||
           multiShortResponse.toLowerCase().includes('anxious') ||
           multiShortResponse.toLowerCase().includes('earlier') ||
           multiShortResponse.toLowerCase().includes('mentioned') ||
           multiShortResponse.toLowerCase().includes('brief') ||
           multiShortResponse.toLowerCase().includes('short'),
           'Should reference earlier topics or acknowledge brief responses after multiple short responses');

  // Test 4: Context tracking for last AI question
  resetContext();
  
  // Generate a response that should contain a question
  aiResponse = await window.generateAIResponse('I feel sad');
  
  // Check that context tracking is working
  assert.ok(window.conversationContext.conversationFlow.lastAIIntent !== null, 
           'Should track last AI intent');
  assert.ok(window.conversationContext.messages.length > 0, 
           'Should have messages in context');

  // Test 5: "Maybe" responses should be handled contextually
  resetContext();
  
  await window.generateAIResponse('I think I might have ADHD');
  let maybeResponse = await window.generateAIResponse('maybe');
  console.log('Response to "maybe" after ADHD mention:', maybeResponse.substring(0, 100) + '...');
  
  assert.ok(maybeResponse.toLowerCase().includes('uncertain') ||
           maybeResponse.toLowerCase().includes('explore') ||
           maybeResponse.toLowerCase().includes('normal'),
           'Should handle uncertainty appropriately');

  console.log('Conversational context tests passed!');
}

// Run the tests
runConversationalTests().catch(error => {
  console.error('Test failed:', error);
  process.exit(1);
});