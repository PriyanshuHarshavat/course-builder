const fs = require('fs').promises;

async function testRead() {
    const wslPath = '\\wsl.localhost\Ubuntu-22.04\home\pharshavat\course-builder\scripts\gemini-review\gemini-review-prompt.txt';
    try {
        const content = await fs.readFile(wslPath, 'utf-8');
        console.log('Successfully read WSL file. First 100 chars:\n', content.substring(0, 100));
    } catch (error) {
        console.error('Failed to read WSL file:', error.message);
    }
}

testRead();