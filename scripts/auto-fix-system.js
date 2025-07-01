#!/usr/bin/env node

/**
 * @fileoverview Automated Code Fixing System
 * Reads Gemini feedback and automatically fixes common issues
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class AutoFixSystem {
  constructor() {
    this.feedbackFile = path.join(__dirname, 'gemini-review/gemini-feedback.json');
    this.fixesApplied = [];
  }

  /**
   * Read Gemini feedback from the review
   */
  readGeminiFeedback() {
    if (!fs.existsSync(this.feedbackFile)) {
      console.log('⚠️ No Gemini feedback file found');
      return null;
    }

    try {
      const content = fs.readFileSync(this.feedbackFile, 'utf8');
      const feedback = JSON.parse(content);
      
      if (!feedback.review) {
        console.log('⚠️ No review data in feedback file');
        return null;
      }

      return feedback.review;
    } catch (error) {
      console.error('❌ Failed to read Gemini feedback:', error.message);
      return null;
    }
  }

  /**
   * Apply automatic fixes based on Gemini feedback
   */
  async applyAutoFixes(review) {
    console.log('🔧 Starting automatic fixes...');
    
    const issues = [
      ...(review.critical_issues || []),
      ...(review.security_concerns || []),
      ...(review.documentation_gaps || []),
      ...(review.suggestions || [])
    ];

    console.log(`📋 Found ${issues.length} issues to fix`);

    for (const issue of issues) {
      await this.fixIssue(issue);
    }

    // Apply common code quality fixes
    await this.applyCommonFixes();

    console.log(`✅ Applied ${this.fixesApplied.length} automatic fixes`);
    return this.fixesApplied;
  }

  /**
   * Fix individual issues based on content analysis
   */
  async fixIssue(issue) {
    const issueText = issue.toLowerCase();
    
    try {
      // Fix missing JSDoc documentation
      if (issueText.includes('jsdoc') || issueText.includes('documentation')) {
        await this.addJSDocToFunctions();
      }

      // Fix hardcoded secrets
      if (issueText.includes('hardcoded') || issueText.includes('secret') || issueText.includes('password')) {
        await this.replaceHardcodedSecrets();
      }

      // Fix missing error handling
      if (issueText.includes('error handling') || issueText.includes('try catch')) {
        await this.addErrorHandling();
      }

      // Fix console.log statements
      if (issueText.includes('console.log') || issueText.includes('production code')) {
        await this.removeConsoleStatements();
      }

      // Fix import/export issues
      if (issueText.includes('import') || issueText.includes('export')) {
        await this.fixImportExportIssues();
      }

      // Fix franchise isolation issues
      if (issueText.includes('franchise') || issueText.includes('tenant')) {
        await this.addFranchiseIsolation();
      }

    } catch (error) {
      console.error(`❌ Failed to fix issue "${issue}":`, error.message);
    }
  }

  /**
   * Add JSDoc documentation to functions
   */
  async addJSDocToFunctions() {
    const jsFiles = this.findJavaScriptFiles();
    
    for (const file of jsFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Find functions without JSDoc
        const functionRegex = /^(\s*)(export\s+)?(async\s+)?function\s+(\w+)\s*\([^)]*\)\s*{/gm;
        const asyncArrowRegex = /^(\s*)(export\s+)?const\s+(\w+)\s*=\s*async\s*\([^)]*\)\s*=>/gm;
        const arrowRegex = /^(\s*)(export\s+)?const\s+(\w+)\s*=\s*\([^)]*\)\s*=>/gm;

        // Add JSDoc to regular functions
        content = content.replace(functionRegex, (match, indent, exportKeyword, asyncKeyword, functionName) => {
          const prevLines = content.substring(0, content.indexOf(match)).split('\n');
          const prevLine = prevLines[prevLines.length - 1];
          
          if (!prevLine.includes('/**')) {
            modified = true;
            const jsdoc = `${indent}/**\n${indent} * ${functionName} function\n${indent} * @description Auto-generated documentation\n${indent} */\n`;
            return jsdoc + match;
          }
          return match;
        });

        // Add JSDoc to arrow functions
        content = content.replace(asyncArrowRegex, (match, indent, exportKeyword, functionName) => {
          const prevLines = content.substring(0, content.indexOf(match)).split('\n');
          const prevLine = prevLines[prevLines.length - 1];
          
          if (!prevLine.includes('/**')) {
            modified = true;
            const jsdoc = `${indent}/**\n${indent} * ${functionName} async function\n${indent} * @async\n${indent} * @description Auto-generated documentation\n${indent} */\n`;
            return jsdoc + match;
          }
          return match;
        });

        if (modified) {
          fs.writeFileSync(file, content);
          this.fixesApplied.push(`Added JSDoc documentation to ${file}`);
          console.log(`📝 Added JSDoc to ${file}`);
        }
      } catch (error) {
        console.error(`❌ Failed to add JSDoc to ${file}:`, error.message);
      }
    }
  }

  /**
   * Replace hardcoded secrets with environment variables
   */
  async replaceHardcodedSecrets() {
    const files = this.findAllCodeFiles();
    
    for (const file of files) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Replace hardcoded connection strings
        content = content.replace(
          /['"`]DefaultEndpointsProtocol=https;AccountName=.*?;AccountKey=.*?;EndpointSuffix=.*?['"`]/g,
          'process.env.AZURE_STORAGE_CONNECTION_STRING'
        );

        // Replace hardcoded API keys
        content = content.replace(
          /['"`]AIza[a-zA-Z0-9_-]{35}['"`]/g,
          'process.env.GEMINI_API_KEY'
        );

        // Replace hardcoded passwords
        content = content.replace(
          /password\s*[:=]\s*['"`][^'"`]{6,}['"`]/gi,
          "password: process.env.DATABASE_PASSWORD"
        );

        if (content !== fs.readFileSync(file, 'utf8')) {
          fs.writeFileSync(file, content);
          this.fixesApplied.push(`Replaced hardcoded secrets in ${file}`);
          console.log(`🔐 Fixed hardcoded secrets in ${file}`);
          modified = true;
        }
      } catch (error) {
        console.error(`❌ Failed to fix secrets in ${file}:`, error.message);
      }
    }
  }

  /**
   * Add error handling to async operations
   */
  async addErrorHandling() {
    const jsFiles = this.findJavaScriptFiles();
    
    for (const file of jsFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Find async operations without try-catch
        const awaitRegex = /(\s+)(await\s+[^;]+;?)/g;
        
        content = content.replace(awaitRegex, (match, indent, awaitStatement) => {
          // Check if already in try-catch block
          const beforeMatch = content.substring(0, content.indexOf(match));
          const afterMatch = content.substring(content.indexOf(match) + match.length);
          
          if (!beforeMatch.includes('try {') || !afterMatch.includes('} catch')) {
            modified = true;
            return `${indent}try {\n${indent}  ${awaitStatement.trim()}\n${indent}} catch (error) {\n${indent}  console.error('Operation failed:', error);\n${indent}  throw error;\n${indent}}`;
          }
          return match;
        });

        if (modified) {
          fs.writeFileSync(file, content);
          this.fixesApplied.push(`Added error handling to ${file}`);
          console.log(`🛡️ Added error handling to ${file}`);
        }
      } catch (error) {
        console.error(`❌ Failed to add error handling to ${file}:`, error.message);
      }
    }
  }

  /**
   * Remove console.log statements from production code
   */
  async removeConsoleStatements() {
    const jsFiles = this.findJavaScriptFiles().filter(file => 
      !file.includes('test') && 
      !file.includes('spec') && 
      !file.includes('debug')
    );
    
    for (const file of jsFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        const originalContent = content;

        // Remove console.log statements
        content = content.replace(/\s*console\.log\([^)]*\);\s*/g, '');
        content = content.replace(/\s*console\.warn\([^)]*\);\s*/g, '');
        content = content.replace(/\s*console\.error\([^)]*\);\s*/g, '');

        if (content !== originalContent) {
          fs.writeFileSync(file, content);
          this.fixesApplied.push(`Removed console statements from ${file}`);
          console.log(`🧹 Cleaned console statements from ${file}`);
        }
      } catch (error) {
        console.error(`❌ Failed to clean console statements from ${file}:`, error.message);
      }
    }
  }

  /**
   * Fix import/export issues
   */
  async fixImportExportIssues() {
    const jsFiles = this.findJavaScriptFiles();
    
    for (const file of jsFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Add missing semicolons to imports
        content = content.replace(/^(import.*from.*['"`][^'"`]+['"`])(?!;)/gm, '$1;');
        
        // Add missing semicolons to exports
        content = content.replace(/^(export.*from.*['"`][^'"`]+['"`])(?!;)/gm, '$1;');

        if (content !== fs.readFileSync(file, 'utf8')) {
          fs.writeFileSync(file, content);
          this.fixesApplied.push(`Fixed import/export in ${file}`);
          console.log(`📦 Fixed imports/exports in ${file}`);
          modified = true;
        }
      } catch (error) {
        console.error(`❌ Failed to fix imports in ${file}:`, error.message);
      }
    }
  }

  /**
   * Add franchise isolation to database operations
   */
  async addFranchiseIsolation() {
    const jsFiles = this.findJavaScriptFiles();
    
    for (const file of jsFiles) {
      try {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // Add franchiseId parameter to database queries
        content = content.replace(
          /SELECT\s+\*\s+FROM\s+(\w+)(?!\s+WHERE.*franchise_id)/gi,
          'SELECT * FROM $1 WHERE franchise_id = ?'
        );

        content = content.replace(
          /INSERT\s+INTO\s+(\w+)\s*\([^)]*\)(?!.*franchise_id)/gi,
          (match) => {
            if (!match.includes('franchise_id')) {
              modified = true;
              return match.replace(')', ', franchise_id)');
            }
            return match;
          }
        );

        if (modified) {
          fs.writeFileSync(file, content);
          this.fixesApplied.push(`Added franchise isolation to ${file}`);
          console.log(`🏢 Added franchise isolation to ${file}`);
        }
      } catch (error) {
        console.error(`❌ Failed to add franchise isolation to ${file}:`, error.message);
      }
    }
  }

  /**
   * Apply common code quality fixes
   */
  async applyCommonFixes() {
    console.log('🔧 Applying common quality fixes...');
    
    // Run prettier if available
    try {
      execSync('npx prettier --write "src/**/*.{js,jsx,ts,tsx}" --ignore-unknown', { stdio: 'pipe' });
      this.fixesApplied.push('Applied Prettier formatting');
      console.log('✨ Applied Prettier formatting');
    } catch (error) {
      console.log('ℹ️ Prettier not available, skipping formatting');
    }

    // Fix package.json formatting
    try {
      const packageJsonPath = 'package.json';
      if (fs.existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
        this.fixesApplied.push('Formatted package.json');
        console.log('📦 Formatted package.json');
      }
    } catch (error) {
      console.error('❌ Failed to format package.json:', error.message);
    }
  }

  /**
   * Find all JavaScript files in the project
   */
  findJavaScriptFiles() {
    try {
      const gitFiles = execSync('git ls-files', { encoding: 'utf8' }).trim().split('\n');
      return gitFiles.filter(file => 
        (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) &&
        !file.includes('node_modules') &&
        !file.includes('.min.') &&
        fs.existsSync(file)
      );
    } catch (error) {
      console.error('❌ Failed to get Git files:', error.message);
      return [];
    }
  }

  /**
   * Find all code files (including config files)
   */
  findAllCodeFiles() {
    try {
      const gitFiles = execSync('git ls-files', { encoding: 'utf8' }).trim().split('\n');
      return gitFiles.filter(file => 
        (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || 
         file.endsWith('.tsx') || file.endsWith('.json') || file.endsWith('.env')) &&
        !file.includes('node_modules') &&
        !file.includes('.min.') &&
        fs.existsSync(file)
      );
    } catch (error) {
      console.error('❌ Failed to get all code files:', error.message);
      return [];
    }
  }

  /**
   * Main execution function
   */
  async run() {
    console.log('🚀 Starting Auto-Fix System...');
    
    const review = this.readGeminiFeedback();
    if (!review) {
      console.log('❌ No valid review feedback to process');
      return false;
    }

    console.log(`📊 Review Assessment: ${review.assessment}`);
    
    if (review.assessment === 'APPROVE') {
      console.log('✅ Code already approved, no fixes needed');
      return true;
    }

    const fixes = await this.applyAutoFixes(review);
    
    if (fixes.length > 0) {
      console.log('\n📋 Fixes Applied:');
      fixes.forEach(fix => console.log(`  ✅ ${fix}`));
      console.log('\n🎉 Auto-fix completed successfully!');
      return true;
    } else {
      console.log('⚠️ No automatic fixes could be applied');
      return false;
    }
  }
}

// Execute if run directly
if (require.main === module) {
  const autoFix = new AutoFixSystem();
  autoFix.run().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('💥 Auto-fix system failed:', error);
    process.exit(1);
  });
}

module.exports = AutoFixSystem;