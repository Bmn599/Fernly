const assert = require('assert');

// Setup minimal browser-like globals
global.window = {};
global.localStorage = {
  getItem() { return null; },
  setItem() {},
  removeItem() {}
};

// Load required files
require('../docs/fallback-data.js');
require('../docs/ai.js');

// Helper to reset context between tests
function resetContext() {
  if (window.conversationContext) {
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
}

async function runMentalHealthServicesTests() {
  console.log('Testing mental health services functionality...');
  
  resetContext();
  
  // Test 1: PHP definition request
  console.log('Test 1: PHP definition...');
  const phpResponse = await window.generateAIResponse('What is PHP?');
  assert.ok(phpResponse.includes('Partial Hospitalization Program'), 'PHP response should contain full name');
  assert.ok(phpResponse.includes('intensive clinical services'), 'PHP response should contain description');
  console.log('PHP response:', phpResponse.substring(0, 100) + '...');
  
  resetContext();
  
  // Test 2: IOP walkthrough request
  console.log('Test 2: IOP walkthrough...');
  const iopWalkthroughResponse = await window.generateAIResponse('Walk me through IOP');
  assert.ok(iopWalkthroughResponse.includes('Initial Assessment'), 'IOP walkthrough should contain steps');
  assert.ok(iopWalkthroughResponse.includes('Group Therapy'), 'IOP walkthrough should contain therapy info');
  console.log('IOP walkthrough response:', iopWalkthroughResponse.substring(0, 100) + '...');
  
  resetContext();
  
  // Test 3: Single acronym query
  console.log('Test 3: Single acronym query...');
  const acronymResponse = await window.generateAIResponse('php');
  assert.ok(acronymResponse.includes('Partial Hospitalization Program'), 'Single acronym should return definition');
  assert.ok(acronymResponse.includes('walk you through'), 'Should offer walkthrough');
  console.log('Acronym response:', acronymResponse.substring(0, 100) + '...');
  
  resetContext();
  
  // Test 4: Crisis stabilization info
  console.log('Test 4: Crisis stabilization...');
  const crisisResponse = await window.generateAIResponse('What is crisis stabilization?');
  assert.ok(crisisResponse.includes('immediate') || crisisResponse.includes('Crisis'), 'Should contain crisis stabilization info');
  console.log('Crisis response:', crisisResponse.substring(0, 100) + '...');
  
  resetContext();
  
  // Test 5: Telehealth definition
  console.log('Test 5: Telehealth definition...');
  const telehealthResponse = await window.generateAIResponse('Tell me about telehealth');
  assert.ok(telehealthResponse.includes('digital') || telehealthResponse.includes('video'), 'Should contain telehealth info');
  console.log('Telehealth response:', telehealthResponse.substring(0, 100) + '...');
  
  resetContext();
  
  // Test 6: MAT walkthrough
  console.log('Test 6: MAT walkthrough...');
  const matWalkthroughResponse = await window.generateAIResponse('How does MAT work?');
  assert.ok(matWalkthroughResponse.includes('Medical Evaluation') || matWalkthroughResponse.includes('medication'), 'MAT walkthrough should contain process steps');
  console.log('MAT walkthrough response:', matWalkthroughResponse.substring(0, 100) + '...');
  
  resetContext();
  
  // Test 7: Residential treatment
  console.log('Test 7: Residential treatment...');
  const residentialResponse = await window.generateAIResponse('What happens in residential treatment?');
  assert.ok(residentialResponse.includes('24-hour') || residentialResponse.includes('facility'), 'Should contain residential treatment info');
  console.log('Residential response:', residentialResponse.substring(0, 100) + '...');
  
  console.log('Mental health services tests passed!');
}

// Run tests
runMentalHealthServicesTests().catch(console.error);