const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test that the services cards have the light cream color background
const servicesHtml = fs.readFileSync(
  path.join(__dirname, '..', 'docs', 'services.html'),
  'utf8'
);

// Test 1: Verify cards have light cream background color (#e8c864)
assert.ok(servicesHtml.includes('background: rgba(232, 200, 100, 0.95)') || servicesHtml.includes('background: #e8c864'), 
  'Cards should have light cream background color (#e8c864)');

// Test 2: Verify that old white background is removed from cards (not header)
assert.ok(!servicesHtml.includes('.card {\n      background: rgba(255, 255, 255, 0.95)') && 
          !servicesHtml.includes('.card{background:rgba(255,255,255,0.95)'), 
  'Cards should no longer have white background');

// Test 3: Verify other card styling is preserved
assert.ok(servicesHtml.includes('border-radius: 15px'), 'Card border-radius should be preserved');
assert.ok(servicesHtml.includes('padding: 2rem'), 'Card padding should be preserved');
assert.ok(servicesHtml.includes('text-align: center'), 'Card text alignment should be preserved');

// Test 4: Verify icon styling is preserved
assert.ok(servicesHtml.includes('background: transparent'), 'Icons should still have transparent background');
assert.ok(servicesHtml.includes('filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'), 'Icons should maintain drop shadow');

console.log('Services card color tests passed!');