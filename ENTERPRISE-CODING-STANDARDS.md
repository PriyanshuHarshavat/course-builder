# 🏢 TrainArama Enterprise Coding Standards
## Comprehensive Rulebook for Code Review

### 📋 MANDATORY REVIEW CRITERIA

---

## 1. 📖 DOCUMENTATION STANDARDS

### 1.1 JSDoc Requirements (MANDATORY)
**RULE**: Every function, class, and method MUST have JSDoc documentation

**Required Elements:**
```javascript
/**
 * Brief description of what the function does
 * @param {Type} paramName - Description of parameter
 * @param {Type} [optionalParam] - Description of optional parameter
 * @returns {Type} Description of return value
 * @throws {Error} Description of when errors are thrown
 * @example
 * functionName(param1, param2)
 * // Expected output or behavior
 */
```

**VIOLATIONS:**
- ❌ Missing JSDoc on any function
- ❌ Incomplete parameter descriptions
- ❌ Missing @returns tag for functions that return values
- ❌ Missing @throws for functions that can throw errors

### 1.2 README Requirements
**RULE**: Every new feature/module MUST have documentation

**Required Sections:**
- Purpose and functionality
- Setup/installation instructions
- Usage examples
- API documentation
- Troubleshooting guide

### 1.3 Inline Comments
**RULE**: Complex logic MUST be explained with comments

**Required:**
- Complex algorithms explained step-by-step
- Business logic reasoning
- Non-obvious code patterns
- Workarounds and their reasons

---

## 2. 🔒 SECURITY STANDARDS

### 2.1 Secrets Management (CRITICAL)
**RULE**: NO hardcoded secrets, passwords, or API keys

**VIOLATIONS (Auto-Reject):**
- ❌ `password = "actual_password"`
- ❌ `apiKey = "ak_live_12345"`
- ❌ `secret = "hardcoded_secret"`
- ❌ Connection strings with credentials
- ❌ JWT tokens in code

**REQUIRED:**
- ✅ Use environment variables
- ✅ Use Azure Key Vault references
- ✅ Use configuration files (not committed)

### 2.2 Input Validation (MANDATORY)
**RULE**: All user inputs MUST be validated

**Required Patterns:**
```javascript
// Required for all user inputs
function processUserInput(input) {
  if (!input || typeof input !== 'string') {
    throw new Error('Invalid input');
  }
  
  // Sanitize input
  const sanitized = input.trim().slice(0, MAX_LENGTH);
  
  // Validate format if needed
  if (!VALID_PATTERN.test(sanitized)) {
    throw new Error('Invalid format');
  }
  
  return sanitized;
}
```

### 2.3 Authentication & Authorization
**RULE**: All API endpoints MUST have authentication checks

**Required:**
- User authentication verification
- Permission/role validation
- Franchise isolation enforcement

---

## 3. 🛡️ CHILD SAFETY & PRIVACY (CSP) STANDARDS (MANDATORY)
**CONTEXT**: This application is used by children (ages 8-14). These rules are paramount and violations will be treated as CRITICAL.

### 3.1 No PII in Logs (CRITICAL)
**RULE**: Absolutely NO Personally Identifiable Information (PII) may be written to logs or any non-secure destination.
**PII INCLUDES**:
- Usernames, full names, initials
- Email addresses, phone numbers, physical addresses
- User-generated content that could be identifying (e.g., a story about "my dog Sparky at 123 Main St")
- Geolocation data

**VIOLATIONS (Auto-Reject):**
- ❌ `logger.info('User login:', user.email);`
- ❌ `console.log('Processing data for user:', { name: 'John Doe' });`

**REQUIRED:**
- ✅ Log only non-identifiable information (e.g., `userId`, `franchiseId`, `traceId`).
- ✅ Anonymize or pseudonymize data before logging if context is needed.

### 3.2 Data Minimization (CRITICAL)
**RULE**: Functions and components MUST only request, process, and store the absolute minimum data required for their specific, stated purpose.

**VIOLATIONS (Auto-Reject):**
- ❌ Fetching the entire user object (`{id, name, email, address, ...}`) when only the `id` is needed.
- ❌ Storing sensitive data (e.g., birthdates) when age range is sufficient.

### 3.3 Secure User Content Storage (CRITICAL)
**RULE**: All user-generated content (UGC) MUST be stored with strict, non-breakable access controls tied to the user and their legal guardian/franchise.

**VIOLATIONS (Auto-Reject):**
- ❌ Storing UGC in publicly accessible storage containers.
- ❌ Failing to validate ownership and permissions before serving or modifying UGC.

### 3.4 Sanitize All Displayable Text (MANDATORY)
**RULE**: ALL text fields that can be displayed back to any user (including admins) MUST be sanitized to prevent Cross-Site Scripting (XSS).

**VIOLATIONS (Needs Work):**
- ❌ Using `dangerouslySetInnerHTML` in React without extreme justification and sanitization.
- ❌ Rendering user-provided data directly to the DOM without encoding or sanitization.

**REQUIRED:**
- ✅ Use DOM-purifying libraries (like `dompurify`) for any rich text.
- ✅ Use framework-native data-binding that provides automatic encoding (e.g., `{variable}` in React).

### 3.5 Third-Party Library Scrutiny (MANDATORY)
**RULE**: All third-party libraries and dependencies MUST be evaluated for child safety compliance.

**VIOLATIONS (Needs Work):**
- ❌ Including analytics or advertising SDKs not explicitly approved for child-directed apps.
- ❌ Using libraries with known vulnerabilities or those that perform unauthorized data collection.

---

## 4. 🏗️ CODE QUALITY STANDARDS

### 4.1 Error Handling (MANDATORY)
**RULE**: All async operations MUST have error handling

**Required Patterns:**
```javascript
// Async/await pattern
async function asyncOperation() {
  try {
    const result = await someAsyncCall();
    return result;
  } catch (error) {
    console.error('Operation failed:', error);
    throw new Error(`Operation failed: ${error.message}`);
  }
}

// Promise pattern
function promiseOperation() {
  return somePromise()
    .then(result => result)
    .catch(error => {
      console.error('Operation failed:', error);
      throw error;
    });
}
```

**VIOLATIONS:**
- ❌ Unhandled async operations
- ❌ Missing try-catch blocks
- ❌ Swallowing errors without logging

### 4.2 Function Complexity
**RULE**: Functions MUST be focused and manageable

**Limits:**
- Maximum 50 lines per function
- Maximum 10 parameters
- Maximum 5 levels of nesting
- Cyclomatic complexity ≤ 10

**VIOLATIONS:**
- ❌ Functions exceeding line limits
- ❌ Too many parameters (use object instead)
- ❌ Deep nesting (extract helper functions)

### 4.3 Naming Conventions
**RULE**: Names MUST be descriptive and consistent

**Required Patterns:**
```javascript
// Variables: camelCase, descriptive
const franchiseUserData = {};
const isUserAuthenticated = true;

// Functions: camelCase, verb-based
function getUserPermissions() {}
function validateFranchiseAccess() {}

// Constants: UPPER_SNAKE_CASE
const MAX_UPLOAD_SIZE = 10485760;
const DEFAULT_FRANCHISE_ID = 'system';

// Classes: PascalCase
class FranchiseManager {}
class UserAuthenticator {}
```

### 4.4 Code Organization
**RULE**: Code MUST be properly structured

**Required Structure:**
```javascript
// 1. Imports at top
import { required } from 'modules';

// 2. Constants
const CONFIGURATION = {};

// 3. Main class/functions
class MainComponent {
  // Constructor first
  constructor() {}
  
  // Public methods
  publicMethod() {}
  
  // Private methods (prefixed with _)
  _privateMethod() {}
}

// 4. Export at bottom
export default MainComponent;
```

---

## 5. 🏢 FRANCHISE-SPECIFIC REQUIREMENTS

### 5.1 Data Isolation (CRITICAL)
**RULE**: All data MUST be isolated by franchise

**Required Patterns:**
```javascript
// Database queries
const query = 'SELECT * FROM table WHERE franchise_id = ?';

// File storage
const filePath = `${franchiseId}/subfolder/file.ext`;

// Cache keys
const cacheKey = `${franchiseId}:user:${userId}`;
```

**VIOLATIONS (Auto-Reject):**
- ❌ Cross-franchise data access
- ❌ Missing franchise_id in queries
- ❌ Shared storage without isolation

### 5.2 Scalability Requirements
**RULE**: Code MUST support multiple franchises

**Required:**
- Configurable branding per franchise
- Separate data containers
- Isolated user management
- Per-franchise analytics

### 5.3 Multi-tenant Architecture
**RULE**: All services MUST be multi-tenant aware

**Required Checks:**
- Database schema supports franchise_id
- File storage uses franchise isolation
- Caching includes franchise context
- APIs validate franchise access

---

## 6. ⚡ PERFORMANCE STANDARDS

### 6.1 Database Efficiency
**RULE**: Queries MUST be optimized

**Required:**
- Use appropriate indexes
- Limit result sets
- Avoid N+1 queries
- Use connection pooling

### 6.2 File Handling
**RULE**: File operations MUST be efficient

**Required:**
- Stream large files
- Validate file types/sizes
- Use appropriate storage tiers
- Implement cleanup procedures

---

## 7. 🧪 TESTING REQUIREMENTS

### 7.1 Unit Tests (RECOMMENDED)
**RULE**: Critical functions SHOULD have tests

**Required for:**
- Authentication functions
- Data validation
- Business logic
- API endpoints

### 7.2 Integration Tests (RECOMMENDED)
**RULE**: Multi-service interactions SHOULD be tested

**Focus Areas:**
- Database interactions
- External API calls
- File upload/download
- Franchise isolation

---

## 8. 📱 REACT/FRONTEND SPECIFIC

### 8.1 Component Structure
**RULE**: Components MUST follow standards

**Required:**
```javascript
// Component file structure
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PropTypes } from 'prop-types';

const StyledComponent = styled.div`
  // Styles here
`;

const ComponentName = ({ prop1, prop2 }) => {
  // Hooks at top
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {}, []);
  
  // Event handlers
  const handleEvent = () => {};
  
  // Render
  return <StyledComponent />;
};

ComponentName.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number
};

export default ComponentName;
```

### 8.2 State Management
**RULE**: State MUST be managed appropriately

**Required:**
- Use appropriate state scope (local vs global)
- Minimize re-renders
- Clean up subscriptions
- Handle loading/error states

---

## 9. 🚨 REVIEW ASSESSMENT GUIDELINES

### AUTO-REJECT Criteria:
- Hardcoded secrets/passwords
- Cross-franchise data access
- Missing authentication on APIs
- Unhandled async operations
- No error handling for critical paths
- **Any violation of Child Safety & Privacy (CSP) Standards**

### NEEDS_WORK Criteria:
- Missing JSDoc documentation
- Poor naming conventions
- Functions too complex/long
- Missing input validation
- No tests for critical functions

### APPROVE Criteria:
- ✅ All documentation present
- ✅ Security standards met
- ✅ Franchise isolation implemented
- ✅ Error handling comprehensive
- ✅ Code follows style guidelines
- ✅ Performance considerations addressed
- ✅ **All CSP Standards met**

---

## 10. 📝 REVIEW RESPONSE FORMAT

**Use this exact structure for all reviews:**

```json
{
  "status": "completed",
  "timestamp": "ISO_DATE_STRING",
  "review": {
    "assessment": "APPROVE|NEEDS_WORK|REJECT",
    "critical_issues": [
      "Specific violations of MANDATORY rules"
    ],
    "security_concerns": [
      "Any security-related issues found"
    ],
    "franchise_compliance": [
      "Multi-tenant and franchise isolation issues"
    ],
    "documentation_gaps": [
      "Missing or inadequate documentation"
    ],
    "performance_issues": [
      "Potential performance problems"
    ],
    "suggestions": [
      "Specific improvement recommendations"
    ],
    "franchise_readiness": "Detailed assessment of franchise deployment readiness",
    "action_items": [
      "Specific, actionable steps to resolve issues"
    ],
    "code_quality_score": "1-10 rating with explanation"
  }
}
```

This document serves as the constitutional law for all code reviews. Every violation MUST be identified and addressed according to these standards.
