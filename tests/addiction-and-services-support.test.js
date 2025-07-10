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
  if (window.conversationContext) {
    window.conversationContext.assessmentInProgress = false;
    window.conversationContext.assessmentPrompted = false;
    window.conversationContext.detectedSymptoms = {};
    window.conversationContext.messages = [];
    window.conversationContext.questionCount = 0;
    window.conversationContext.topicCounts = {};
    window.conversationContext.conversationFlow.lastAIQuestion = null;
    window.conversationContext.conversationFlow.lastAIIntent = null;
    window.conversationContext.conversationFlow.shortResponseCount = 0;
    window.conversationContext.conversationFlow.lastTopicDiscussed = null;
    window.conversationContext.userPreferences.previousTopics = [];
    window.conversationContext.crisisKeywords = [];
  }
}

async function runAddictionAndServicesTests() {
  console.log('Testing addiction and services support functionality...');

  // Test 1: Addiction intent detection
  resetContext();
  console.log('Test 1: Addiction intent detection...');
  
  const addictionInputs = [
    'I have a drinking problem',
    'I think I\'m addicted to drugs',
    'struggling with substance abuse',
    'I need help with alcoholism',
    'been using cocaine daily',
    'can\'t stop drinking',
    'recovery from addiction',
    'relapsed last week',
    'having cravings'
  ];

  for (const input of addictionInputs) {
    const response = await window.generateAIResponse(input);
    console.log(`Input: "${input}" -> Response snippet: "${response.substring(0, 100)}..."`);
    assert.ok(response.length > 0, `Should generate response for: ${input}`);
    assert.ok(
      response.toLowerCase().includes('addiction') || 
      response.toLowerCase().includes('substance') || 
      response.toLowerCase().includes('recovery') ||
      response.toLowerCase().includes('courage') ||
      response.toLowerCase().includes('medical condition'),
      `Response should be addiction-focused for: ${input}`
    );
  }
  console.log('✓ Addiction intent detection working');

  // Test 2: Addiction resource links
  resetContext();
  console.log('Test 2: Addiction resource links...');
  
  const response = await window.generateAIResponse('I struggle with alcohol addiction');
  assert.ok(response.includes('SAMHSA') || response.includes('1-800-662-4357'), 'Should include SAMHSA helpline');
  assert.ok(response.includes('/services') || response.includes('Fernly'), 'Should include service links');
  console.log('✓ Addiction resources included');

  // Test 3: Enhanced services detection
  resetContext();
  console.log('Test 3: Enhanced services detection...');
  
  const serviceInputs = [
    'services',
    'I need help',
    'where can I get help',
    'what services do you offer',
    'need support',
    'help me',
    'what help is available'
  ];

  for (const input of serviceInputs) {
    const response = await window.generateAIResponse(input);
    assert.ok(response.length > 0, `Should generate response for: ${input}`);
    assert.ok(
      response.toLowerCase().includes('service') || 
      response.toLowerCase().includes('help') || 
      response.toLowerCase().includes('treatment') ||
      response.toLowerCase().includes('support'),
      `Response should be service-focused for: ${input}`
    );
  }
  console.log('✓ Enhanced services detection working');

  // Test 4: Contextual services guidance after addiction discussion
  resetContext();
  console.log('Test 4: Contextual services guidance...');
  
  // First establish addiction context
  await window.generateAIResponse('I have been struggling with alcohol addiction');
  window.conversationContext.userPreferences.previousTopics.push('addiction');
  
  // Then ask for services
  const servicesResponse = await window.generateAIResponse('what services do you have');
  assert.ok(
    servicesResponse.toLowerCase().includes('addiction') || 
    servicesResponse.toLowerCase().includes('mat') || 
    servicesResponse.toLowerCase().includes('substance'),
    'Should provide addiction-specific services when addiction was discussed'
  );
  console.log('✓ Contextual services guidance working');

  // Test 5: Enhanced help responses
  resetContext();
  console.log('Test 5: Enhanced help responses...');
  
  const helpResponse = await window.generateAIResponse('help');
  assert.ok(helpResponse.length > 50, 'Help response should be substantial');
  assert.ok(
    helpResponse.toLowerCase().includes('emotional support') || 
    helpResponse.toLowerCase().includes('what kind of help') ||
    helpResponse.toLowerCase().includes('information') ||
    helpResponse.toLowerCase().includes('services'),
    'Help response should offer different types of support'
  );
  console.log('✓ Enhanced help responses working');

  // Test 6: Priority order - addiction should be high priority
  resetContext();
  console.log('Test 6: Intent priority order...');
  
  const mixedResponse = await window.generateAIResponse('I feel anxious and have been drinking too much');
  // Since addiction is higher priority than anxiety, response should focus on addiction
  assert.ok(
    mixedResponse.toLowerCase().includes('addiction') || 
    mixedResponse.toLowerCase().includes('substance') ||
    mixedResponse.toLowerCase().includes('drinking'),
    'Should prioritize addiction intent when multiple intents detected'
  );
  console.log('✓ Intent priority order working');

  // Test 7: Short responses with "why"
  resetContext();
  console.log('Test 7: Short question handling...');
  
  const whyResponse = await window.generateAIResponse('why');
  assert.ok(whyResponse.length > 30, 'Why response should be substantial');
  assert.ok(
    whyResponse.toLowerCase().includes('help') || 
    whyResponse.toLowerCase().includes('explain') ||
    whyResponse.toLowerCase().includes('clarify'),
    'Why response should offer clarification'
  );
  console.log('✓ Short question handling working');

  console.log('All addiction and services support tests passed! ✅');
}

// Export the test function for external execution
if (typeof module !== 'undefined' && module.exports) {
  module.exports = runAddictionAndServicesTests;
}

// Run tests if executed directly
if (require.main === module) {
  runAddictionAndServicesTests().catch(console.error);
}