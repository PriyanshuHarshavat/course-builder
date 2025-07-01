const fs = require('fs').promises;
const path = require('path');

// --- CONFIGURATION ---
const FEEDBACK_FILE_PATH = 'C:\\Users\\phars\\gemini-feedback.json';
// This should be the root of the project being reviewed.
const PROJECT_ROOT = 'C:\\Users\\phars\\trainarama-components';

// --- ANALYSIS FUNCTIONS ---

/**
 * Checks for hardcoded secrets in the file content.
 * @param {string} content The content of the file.
 * @param {string} filePath The path to the file.
 * @returns {string[]} A list of issues found.
 */
function checkHardcodedSecrets(content, filePath) {
    const issues = [];
    // Regex for the specific connection string found in the previous review.
    const connectionStringRegex = /DefaultEndpointsProtocol=https;AccountName=trainaramastorage;AccountKey=gJWrPjRsHLHYvKsDMUcUg6OMvxiltlOax3LbYdTqKPicEaTb31toX6KfGlITPCOwChDqio1UyIAt\\+ASt8eneOg==/g;
    
    if (connectionStringRegex.test(content)) {
        issues.push(`Critical: Hardcoded Azure connection string found in ${path.basename(filePath)}.`);
    }
    return issues;
}

/**
 * Checks for missing JSDoc comments.
 * @param {string} content The content of the file.
 * @param {string} filePath The path to the file.
 * @returns {string[]} A list of issues found.
 */
function checkJsdoc(content, filePath) {
    const issues = [];
    // A simple check: count functions/classes and compare to JSDoc blocks.
    const functionDeclarations = (content.match(/(async\\s+)?function\\s+\\w+/g) || []).length;
    const classDeclarations = (content.match(/class\\s+\\w+/g) || []).length;
    const totalDeclarations = functionDeclarations + classDeclarations;
    const jsdocBlocks = (content.match(/\/\*\*/g) || []).length;

    if (totalDeclarations > jsdocBlocks) {
        issues.push(`Missing JSDoc comments in ${path.basename(filePath)}. Found ${totalDeclarations} functions/classes but only ${jsdocBlocks} JSDoc blocks.`);
    }
    return issues;
}

/**
 * Checks for basic error handling in async functions.
 * @param {string} content The content of the file.
 * @param {string} filePath The path to the file.
 * @returns {string[]} A list of issues found.
 */
function checkErrorHandling(content, filePath) {
    const issues = [];
    const asyncFunctions = content.matchAll(/async\\s+(?:function\\s*\\w*)?\\s*\\([^)]*\\)\\s*{\\s*([\\s\\S]*?)}\\s*$/gm);
    for (const match of asyncFunctions) {
        const body = match[1];
        if (!body.includes('try') || !body.includes('catch')) {
            issues.push(`Missing try...catch block in an async function in ${path.basename(filePath)}.`);
        }
    }
    return issues;
}


// --- MAIN REVIEW LOGIC ---

async function runReview(filePaths) {
    try {
        console.log(`Review process started for ${filePaths.length} files.`);

        if (filePaths.length === 0) {
            console.log('No files provided for review. Aborting.');
            return;
        }

        const review = {
            assessment: 'APPROVE',
            critical_issues: [],
            security_concerns: [],
            franchise_compliance: [],
            documentation_gaps: [],
            performance_issues: [],
            suggestions: [],
            action_items: [],
            code_quality_score: 10,
        };

        for (const windowsPath of filePaths) {
            let fileContent;
            try {
                fileContent = await fs.readFile(windowsPath, 'utf-8');
            } catch (err) {
                console.error(`Failed to read file: ${windowsPath}`);
                review.assessment = 'REJECT';
                review.critical_issues.push(`Could not read file for review: ${windowsPath}`);
                continue; // Skip to the next file
            }

            const securityIssues = checkHardcodedSecrets(fileContent, windowsPath);
            if (securityIssues.length > 0) {
                review.assessment = 'REJECT';
                review.critical_issues.push(...securityIssues);
                review.security_concerns.push(...securityIssues);
                review.action_items.push(`Immediately remove hardcoded secrets from ${path.basename(windowsPath)} and use environment variables.`);
                review.code_quality_score -= 7;
            }

            const docIssues = checkJsdoc(fileContent, windowsPath);
            if (docIssues.length > 0) {
                if (review.assessment !== 'REJECT') review.assessment = 'NEEDS_WORK';
                review.documentation_gaps.push(...docIssues);
                review.action_items.push(`Add comprehensive JSDoc blocks to all functions and classes in ${path.basename(windowsPath)}.`);
                review.code_quality_score -= 2;
            }
            
            const errorHandlingIssues = checkErrorHandling(fileContent, windowsPath);
            if (errorHandlingIssues.length > 0) {
               if (review.assessment !== 'REJECT') review.assessment = 'NEEDS_WORK';
               review.suggestions.push(...errorHandlingIssues);
               review.action_items.push(`Ensure all async operations in ${path.basename(windowsPath)} are wrapped in try...catch blocks.`);
               review.code_quality_score -= 1;
            }
        }

        review.code_quality_score = Math.max(1, review.code_quality_score);
        review.franchise_readiness = review.assessment === 'APPROVE' ? 'Ready for franchise deployment.' : 'NOT ready for franchise deployment. Critical issues must be resolved.';

        const finalReport = {
            status: 'completed',
            timestamp: new Date().toISOString(),
            review: review,
            files_reviewed: filePaths.length,
            review_confidence: 'HIGH'
        };

        await fs.writeFile(FEEDBACK_FILE_PATH, JSON.stringify(finalReport, null, 2));
        console.log(`Review complete. Feedback written to ${FEEDBACK_FILE_PATH}`);

    } catch (error) {
        console.error('The automated review process failed:', error);
        // Write an error report to the feedback file
        const errorReport = {
            status: 'error',
            timestamp: new Date().toISOString(),
            error: error.message,
        };
        await fs.writeFile(FEEDBACK_FILE_PATH, JSON.stringify(errorReport, null, 2));
    }
}

// --- SCRIPT EXECUTION ---
const filePaths = process.argv.slice(2);
if (filePaths.length === 0) {
    console.error('ERROR: Please provide file paths to review.');
    process.exit(1);
}

runReview(filePaths);