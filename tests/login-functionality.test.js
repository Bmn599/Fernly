const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Test that the login page was implemented correctly
const loginHtml = fs.readFileSync(
  path.join(__dirname, '..', 'docs', 'login.html'),
  'utf8'
);

// Test 1: Check that the login page has the required elements
assert.ok(loginHtml.includes('Welcome Back'), 'Login page should have Welcome Back heading');
assert.ok(loginHtml.includes('Email or Username'), 'Login page should have email/username field');
assert.ok(loginHtml.includes('Password'), 'Login page should have password field');
assert.ok(loginHtml.includes('Remember me'), 'Login page should have remember me checkbox');
assert.ok(loginHtml.includes('Forgot password?'), 'Login page should have forgot password link');
assert.ok(loginHtml.includes('Sign In'), 'Login page should have sign in button');

// Test 2: Check that the login page has social login options
assert.ok(loginHtml.includes('Google'), 'Login page should have Google SSO option');
assert.ok(loginHtml.includes('Apple'), 'Login page should have Apple SSO option');

// Test 3: Check that the login page has support and help features
assert.ok(loginHtml.includes('Need Help?'), 'Login page should have help link');
assert.ok(loginHtml.includes('Quick Check-In'), 'Login page should have quick check-in link');
assert.ok(loginHtml.includes('Create one now'), 'Login page should have create account link');

// Test 4: Check that the login page has security indicators
assert.ok(loginHtml.includes('SSL Secured'), 'Login page should have SSL security indicator');
assert.ok(loginHtml.includes('Enable 2FA'), 'Login page should have 2FA link');

// Test 5: Check that the login page has crisis resources
assert.ok(loginHtml.includes('In crisis? Call 988'), 'Login page should have crisis resources');
assert.ok(loginHtml.includes('suicidepreventionlifeline.org'), 'Login page should link to crisis resources');

// Test 6: Check that the login page has privacy policy link
assert.ok(loginHtml.includes('privacy.html'), 'Login page should link to privacy policy');

// Test 7: Check that the login page has JavaScript functionality
assert.ok(loginHtml.includes('validateEmail'), 'Login page should have email validation');
assert.ok(loginHtml.includes('validatePassword'), 'Login page should have password validation');
assert.ok(loginHtml.includes('togglePassword'), 'Login page should have password toggle functionality');
assert.ok(loginHtml.includes('demo@fernly.com'), 'Login page should have demo credentials');

console.log('Login page functionality tests passed!');