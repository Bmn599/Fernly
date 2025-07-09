const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test that the scroll flash fix CSS properties were added correctly
const indexHtml = fs.readFileSync(
  path.join(__dirname, '..', 'docs', 'index.html'),
  'utf8'
);

// Test 1: Check that background-color fallback was added
assert.ok(indexHtml.includes('background-color: #8fbf8f;'), 'Body should have background-color fallback');

// Test 2: Check that will-change performance hint was added
assert.ok(indexHtml.includes('will-change: background;'), 'Body should have will-change: background performance hint');

// Test 3: Verify the gradient background is still present and unchanged
assert.ok(indexHtml.includes('background: linear-gradient('), 'Body should still have the gradient background');
assert.ok(indexHtml.includes('var(--g1) 0%'), 'Gradient should still use CSS custom properties');
assert.ok(indexHtml.includes('var(--g6) 100%'), 'Gradient should still include all color stops');

// Test 4: Verify animation and other properties are preserved
assert.ok(indexHtml.includes('animation: moodShift 12s ease-in-out infinite;'), 'Animation should be preserved');
assert.ok(indexHtml.includes('background-attachment: fixed;'), 'Background attachment should be preserved');
assert.ok(indexHtml.includes('background-size: 600% 600%;'), 'Background size should be preserved');

console.log('Scroll flash fix tests passed!');