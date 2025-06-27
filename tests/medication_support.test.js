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

async function testMedicationSupport() {
  console.log('Testing medication support functionality...');
  
  // Test 1: Database is loaded
  const dbSize = Object.keys(window.medicationDatabase).length;
  assert.ok(dbSize > 40, 'Medication database should be substantial');
  
  // Test 2: AI can respond to specific medication queries
  const testMeds = ['prozac', 'zoloft', 'lexapro'];
  for (const med of testMeds) {
    if (window.medicationDatabase[med]) {
      const response = await window.generateAIResponse(`tell me about ${med}`);
      assert.ok(response.includes('medication-info'), `Should generate medication info for ${med}`);
    }
  }
  
  // Test 3: General medication queries get responses
  const generalQuery = 'what medications help with anxiety';
  const response = await window.generateAIResponse(generalQuery);
  assert.ok(response.length > 50, 'Should provide substantial response for general medication queries');
  
  // Test 4: Medication database has proper structure
  const sampleMed = Object.values(window.medicationDatabase)[0];
  assert.ok(sampleMed.name, 'Medications should have names');
  assert.ok(sampleMed.type, 'Medications should have types');
  assert.ok(sampleMed.commonUses, 'Medications should have common uses');
  assert.ok(sampleMed.warning, 'Medications should have warnings');
  
  console.log('All medication support tests passed');
}

testMedicationSupport().catch(error => {
  console.error('Medication support test failed:', error.message);
  process.exit(1);
});