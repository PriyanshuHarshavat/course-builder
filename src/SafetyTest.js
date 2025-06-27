// Quick test file to verify safety system functionality
import { SafetyFilter } from './SafetyManager';

// Test the safety filter with various inputs
const testSafetySystem = () => {
  const safetyFilter = new SafetyFilter({ ageGroup: '10-11' });
  
  const testCases = [
    {
      input: "Tell me about artificial intelligence and machine learning",
      expected: "allowed",
      description: "Educational content should be allowed"
    },
    {
      input: "I want to learn how to code in Python",
      expected: "allowed", 
      description: "Programming education should be allowed"
    },
    {
      input: "What's your personal phone number and address?",
      expected: "blocked",
      description: "Personal information requests should be blocked"
    },
    {
      input: "Let's create violent and harmful content",
      expected: "blocked",
      description: "Violent content should be blocked"
    },
    {
      input: "How do neural networks work in AI?",
      expected: "allowed",
      description: "Technical educational content should be allowed"
    }
  ];
  
  console.log("🔬 Testing Safety System...\n");
  
  testCases.forEach((testCase, index) => {
    const result = safetyFilter.checkContent(testCase.input, 'test');
    const status = result.allowed ? "✅ ALLOWED" : "❌ BLOCKED";
    const expected = testCase.expected === "allowed" ? "✅ ALLOWED" : "❌ BLOCKED";
    const passed = (result.allowed && testCase.expected === "allowed") || 
                   (!result.allowed && testCase.expected === "blocked");
    
    console.log(`Test ${index + 1}: ${passed ? "✅ PASS" : "❌ FAIL"}`);
    console.log(`Input: "${testCase.input}"`);
    console.log(`Expected: ${expected} | Got: ${status}`);
    console.log(`Description: ${testCase.description}`);
    if (result.issues.length > 0) {
      console.log(`Issues: ${result.issues.join(', ')}`);
    }
    console.log('---');
  });
  
  const stats = safetyFilter.getStats();
  console.log(`\n📊 Safety Stats:`);
  console.log(`Total checks: ${stats.total}`);
  console.log(`Blocked: ${stats.blocked}`);
  console.log(`Approved: ${stats.approved}`);
  console.log(`Block rate: ${stats.blockRate}%`);
  
  return safetyFilter;
};

// Export for potential use in development
export { testSafetySystem };
export default testSafetySystem;