const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test that the privacy policy page was implemented correctly
const privacyHtml = fs.readFileSync(
  path.join(__dirname, '..', 'docs', 'privacy.html'),
  'utf8'
);

// Test 1: Check that the privacy policy page has the required structure
assert.ok(privacyHtml.includes('Privacy Policy'), 'Privacy policy page should have Privacy Policy heading');
assert.ok(privacyHtml.includes('Last Updated: January 1, 2025'), 'Privacy policy should have last updated date');
assert.ok(privacyHtml.includes('Important Healthcare Notice'), 'Privacy policy should have healthcare notice');

// Test 2: Check that the privacy policy has HIPAA and healthcare focus
assert.ok(privacyHtml.includes('HIPAA'), 'Privacy policy should mention HIPAA');
assert.ok(privacyHtml.includes('protected health information'), 'Privacy policy should mention PHI');
assert.ok(privacyHtml.includes('mental health'), 'Privacy policy should mention mental health');
assert.ok(privacyHtml.includes('Fernly Health'), 'Privacy policy should mention Fernly Health');

// Test 3: Check that the privacy policy has strong legal language
assert.ok(privacyHtml.includes('condition of using our services'), 'Privacy policy should have strong agreement language');
assert.ok(privacyHtml.includes('broad rights to use'), 'Privacy policy should have broad usage rights');
assert.ok(privacyHtml.includes('without prior notice'), 'Privacy policy should allow changes without notice');
assert.ok(privacyHtml.includes('Limitation of Liability'), 'Privacy policy should have liability limitation');
assert.ok(privacyHtml.includes('User Indemnification'), 'Privacy policy should have user indemnification');

// Test 4: Check that the privacy policy covers data sharing
assert.ok(privacyHtml.includes('Healthcare Partners'), 'Privacy policy should mention healthcare partners');
assert.ok(privacyHtml.includes('Technology and Service Providers'), 'Privacy policy should mention tech providers');
assert.ok(privacyHtml.includes('Business Partners and Affiliates'), 'Privacy policy should mention business partners');
assert.ok(privacyHtml.includes('broad range of third parties'), 'Privacy policy should mention broad sharing');

// Test 5: Check that the privacy policy has data retention details
assert.ok(privacyHtml.includes('Data Retention and Storage'), 'Privacy policy should have retention section');
assert.ok(privacyHtml.includes('extended periods'), 'Privacy policy should mention extended retention');
assert.ok(privacyHtml.includes('Mental health records: Up to 25 years'), 'Privacy policy should have long retention for mental health records');

// Test 6: Check that the privacy policy has AI processing disclosure
assert.ok(privacyHtml.includes('artificial intelligence systems'), 'Privacy policy should mention AI processing');
assert.ok(privacyHtml.includes('machine learning algorithms'), 'Privacy policy should mention ML processing');
assert.ok(privacyHtml.includes('automated decision-making'), 'Privacy policy should mention automated decisions');

// Test 7: Check that the privacy policy has secure contact form
assert.ok(privacyHtml.includes('secure form below'), 'Privacy policy should have secure contact form');
assert.ok(privacyHtml.includes('We do not accept privacy inquiries via email'), 'Privacy policy should specify secure contact only');
assert.ok(privacyHtml.includes('privacyContactForm'), 'Privacy policy should have contact form');

// Test 8: Check that the privacy policy has Arizona jurisdiction
assert.ok(privacyHtml.includes('State of Arizona'), 'Privacy policy should specify Arizona jurisdiction');
assert.ok(privacyHtml.includes('courts of Arizona'), 'Privacy policy should specify Arizona courts');

// Test 9: Check that the privacy policy is mobile-friendly
assert.ok(privacyHtml.includes('@media (max-width: 768px)'), 'Privacy policy should have mobile responsive styles');

console.log('Privacy policy implementation tests passed!');