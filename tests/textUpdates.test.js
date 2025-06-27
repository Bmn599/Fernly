const assert = require('assert');
const fs = require('fs');

// Test that the text changes were made correctly
const indexHtml = fs.readFileSync('/home/runner/work/Fernly/Fernly/docs/index.html', 'utf8');

// Test 1: Check that the main heading was updated correctly
assert.ok(indexHtml.includes('Ask Away We\'re Listening'), 'Main heading should be updated without em dash');
assert.ok(!indexHtml.includes('Ask Away—We\'re Listening'), 'Should not contain the old heading with em dash');

// Test 2: Check that the description text was updated correctly
assert.ok(indexHtml.includes('Get instant answers on mental health conditions, and quick wellness check-ins confidentially and judgment free'), 'Description should be updated correctly');
assert.ok(!indexHtml.includes('Get instant answers on medications, mental-health conditions'), 'Should not mention medications in description');
assert.ok(!indexHtml.includes('judgment-free'), 'Should not contain hyphens in judgment-free');

// Test 3: Check that medical disclaimer was updated
assert.ok(indexHtml.includes('I can provide general information about mental health conditions'), 'Medical disclaimer should mention mental health conditions');
assert.ok(!indexHtml.includes('mental health and medications'), 'Medical disclaimer should not mention medications');

// Test 4: Check that blog content was updated
assert.ok(indexHtml.includes('Mental Health Information'), 'Blog title should be updated');
assert.ok(!indexHtml.includes('Psychiatric Medications Guide'), 'Should not contain medication blog title');
assert.ok(indexHtml.includes('NIMH'), 'Should reference NIMH instead of MedlinePlus');

console.log('Text update tests passed!');