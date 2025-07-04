const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test to verify transformers.min.js dependency has been removed
console.log('Testing transformers.min.js dependency removal...');

// Read the index.html file
const indexHtmlPath = path.join(__dirname, '..', 'docs', 'index.html');
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Test 1: Check that transformers CDN script has been removed
console.log('Test 1: Checking transformers CDN removal...');
assert.ok(
  !indexHtml.includes('src="https://cdn.jsdelivr.net/npm/@xenova/transformers/dist/transformers.min.js"'),
  'Transformers CDN script should be removed'
);

// Test 2: Check that transformers-cdn ID has been removed
console.log('Test 2: Checking transformers-cdn ID removal...');
assert.ok(
  !indexHtml.includes('id="transformers-cdn"'),
  'transformers-cdn ID should be removed'
);

// Test 3: Check that transformers event handlers have been removed
console.log('Test 3: Checking transformers event handlers removal...');
assert.ok(
  !indexHtml.includes('scriptEl.addEventListener'),
  'Transformers event handlers should be removed'
);

// Test 4: Check that window.transformers checks have been removed
console.log('Test 4: Checking window.transformers checks removal...');
assert.ok(
  !indexHtml.includes('window.transformers'),
  'window.transformers references should be removed'
);

// Test 5: Check that ensureLlmLoaded import has been removed from module
console.log('Test 5: Checking ensureLlmLoaded import removal...');
assert.ok(
  !indexHtml.includes('ensureLlmLoaded'),
  'ensureLlmLoaded references should be removed'
);

// Test 6: Check that AI status is set directly
console.log('Test 6: Checking direct AI status setting...');
assert.ok(
  indexHtml.includes('Smart AI Active'),
  'AI status should be set directly to Smart AI Active'
);

// Test 7: Check that dependencies checking script still exists
console.log('Test 7: Checking dependencies checking functionality...');
assert.ok(
  indexHtml.includes('checkDependencies'),
  'Dependencies checking functionality should remain'
);

console.log('All transformers dependency removal tests passed!');