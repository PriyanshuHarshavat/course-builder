

const fs = require('fs').promises;
const { exec } = require('child_process');
const crypto = require('crypto'); // New import for hashing

// --- CONFIGURATION ---
const PROMPT_FILE_TO_WATCH = 'C:\\Users\\phars\\gemini-review-prompt.txt';
const REVIEW_SCRIPT_PATH = 'C:\\Users\\phars\\code-guardian\\index.js';
const POLLING_INTERVAL_MS = 5000; // Check every 5 seconds

console.log(`Code Guardian Agent is now active.`);
console.log(`Monitoring for changes to: ${PROMPT_FILE_TO_WATCH} every ${POLLING_INTERVAL_MS / 1000} seconds.`);

let isReviewing = false;
let lastKnownHash = null; // Changed to store hash instead of content

async function calculateHash(content) {
    return crypto.createHash('sha256').update(content).digest('hex');
}

async function checkForChanges() {
    if (isReviewing) {
        // console.log('A review is already in progress. Skipping this check.');
        return;
    }

    try {
        const currentContent = await fs.readFile(PROMPT_FILE_TO_WATCH, 'utf-8');
        const currentHash = await calculateHash(currentContent); // Calculate hash of current content

        if (lastKnownHash === null) {
            // First run, just set the hash and don't trigger
            lastKnownHash = currentHash;
            console.log(`Initialized monitoring. Current file hash: ${lastKnownHash}`);
            return;
        }

        // Debugging: Log hashes for comparison
        console.log(`[DEBUG] Last Known Hash: ${lastKnownHash}`);
        console.log(`[DEBUG] Current Hash: ${currentHash}`);
        console.log(`[DEBUG] Hash comparison result: ${currentHash !== lastKnownHash}`);

        if (currentHash !== lastKnownHash) { // Compare hashes instead of content
            isReviewing = true;
            console.log(`\n[${new Date().toISOString()}] Change detected in ${PROMPT_FILE_TO_WATCH} (content hash changed).`);
            console.log('Triggering automated code review...');

            const command = `node "${REVIEW_SCRIPT_PATH}" "${PROMPT_FILE_TO_WATCH}"`;

            exec(command, (error, stdout, stderr) => {
                isReviewing = false; // Reset the flag once the process is complete
                lastKnownHash = currentHash; // Update hash only after successful review
                console.log('Review process finished.');
                
                if (error) {
                    console.error(`EXECUTION ERROR: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`STDERR: ${stderr}`);
                    return;
                }
                console.log(`STDOUT: ${stdout}`);
            });
        }
    } catch (error) {
        console.error(`Error checking file ${PROMPT_FILE_TO_WATCH}:`, error.message);
        // If file not found, or other access error, handle as needed.
    }
}

// Start polling
setInterval(checkForChanges, POLLING_INTERVAL_MS);

// Initial check immediately
checkForChanges();

process.on('SIGINT', () => {
    console.log('\nCode Guardian Agent is shutting down.');
    process.exit();
});
