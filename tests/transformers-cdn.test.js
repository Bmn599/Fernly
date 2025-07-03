const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test to verify transformers.min.js CDN implementation
console.log('Testing transformers.min.js CDN implementation...');

// Read the index.html file
const indexHtmlPath = path.join(__dirname, '..', 'docs', 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Test 1: Check that the script uses CDN source
console.log('Test 1: Checking CDN source...');
assert.ok(
  indexHtml.includes('src="https://cdn.jsdelivr.net/npm/@xenova/transformers/dist/transformers.min.js"'),
  'Script should use CDN source for transformers.min.js'
);

// Test 2: Check that there's no local reference
console.log('Test 2: Checking no local reference...');
assert.ok(
  !indexHtml.includes('src="transformers.min.js"'),
  'Should not reference local transformers.min.js'
);

// Test 3: Check that loadBackup function has been removed
console.log('Test 3: Checking loadBackup function removal...');
assert.ok(
  !indexHtml.includes('loadBackup'),
  'loadBackup function should be removed'
);

// Test 4: Check that old fallback mechanism has been removed
console.log('Test 4: Checking old fallback mechanism removal...');
assert.ok(
  !indexHtml.includes('alt.src = \'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.13.0/dist/transformers.min.js\''),
  'Old fallback mechanism should be removed'
);

// Test 5: Check that the comment has been updated
console.log('Test 5: Checking comment update...');
assert.ok(
  indexHtml.includes('<!-- Load Transformers.js from CDN -->'),
  'Comment should indicate CDN loading'
);

// Test 6: Check that local transformers.min.js file has been removed
console.log('Test 6: Checking local file removal...');
const localTransformersPath = path.join(__dirname, '..', 'docs', 'transformers.min.js');
assert.ok(
  !fs.existsSync(localTransformersPath),
  'Local transformers.min.js file should be removed'
);

// Test 7: Check that script has proper error handling for CDN failure
console.log('Test 7: Checking error handling...');
assert.ok(
  indexHtml.includes('addEventListener(\'error\', () => {'),
  'Should have error handling for CDN failure'
);

// Test 8: Check that the script element has correct ID
console.log('Test 8: Checking script element ID...');
assert.ok(
  indexHtml.includes('id="transformers-cdn"'),
  'Script should have transformers-cdn ID'
);

console.log('All transformers.min.js CDN tests passed!');