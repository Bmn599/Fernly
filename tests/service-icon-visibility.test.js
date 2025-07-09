const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test that service icons are visible and have proper styling after PR #131 fix
const servicesHtml = fs.readFileSync(
  path.join(__dirname, '..', 'docs', 'services.html'),
  'utf8'
);

// Test 1: Verify that problematic mix-blend-mode: screen is removed
assert.ok(!servicesHtml.includes('mix-blend-mode: screen'), 'mix-blend-mode: screen should be removed as it causes invisibility');

// Test 2: Verify that background remains transparent
assert.ok(servicesHtml.includes('background: transparent'), 'Icons should still have transparent background');

// Test 3: Verify that icons have drop shadow for visibility
assert.ok(servicesHtml.includes('drop-shadow(') || servicesHtml.includes('box-shadow:'), 'Icons should have drop shadow for visibility');

// Test 4: Verify card styling is preserved
assert.ok(servicesHtml.includes('background: rgba(232, 200, 100, 0.95)'), 'Card background should be light cream');
assert.ok(servicesHtml.includes('border-radius: 15px'), 'Card border-radius should be preserved');

// Test 5: Verify image sizing and layout is preserved
assert.ok(servicesHtml.includes('width: 80px'), 'Image width should be preserved');
assert.ok(servicesHtml.includes('height: 80px'), 'Image height should be preserved');
assert.ok(servicesHtml.includes('object-fit: contain'), 'Image object-fit should be preserved');

console.log('Service icon visibility tests passed!');