const assert = require('assert');
const fs = require('fs');

// Test that the text changes were made correctly
// Use path relative to the repository root so tests work in any environment
const path = require('path');
const indexHtml = fs.readFileSync(
  path.join(__dirname, '..', 'docs', 'index.html'),
  'utf8'
);

// Test 1: Check that the main heading was updated correctly
assert.ok(indexHtml.includes('Ask Away We\'re Listening'), 'Main heading should be updated without em dash');
assert.ok(!indexHtml.includes('Ask Away—We\'re Listening'), 'Should not contain the old heading with em dash');

// Test 2: Check that the description text was updated correctly
assert.ok(indexHtml.includes('Get detailed answers on medications, mental health conditions, and quick wellness check-ins confidentially and judgment free'), 'Description should mention medications and mental health conditions');
assert.ok(!indexHtml.includes('judgment-free'), 'Should not contain hyphenated judgment-free');
assert.ok(!indexHtml.includes('Get instant answers on medications, mental health conditions, and quick wellness check-ins confidentially and judgment-free'), 'Should not contain the old description');

// Test 3: Check that medical disclaimer was updated
assert.ok(indexHtml.includes('I can provide general information about mental health and medications'), 'Medical disclaimer should mention mental health and medications');
assert.ok(!indexHtml.includes('I can provide general information about mental health conditions'), 'Medical disclaimer should not mention only mental health conditions');

// Test 4: Check that blog content was updated
assert.ok(indexHtml.includes('Psychiatric Medications Guide'), 'Blog title should be Psychiatric Medications Guide');
assert.ok(!indexHtml.includes('Mental Health Information'), 'Should not contain generic mental health title');
assert.ok(indexHtml.includes('MedlinePlus'), 'Should reference MedlinePlus instead of NIMH');

console.log('Text update tests passed!');