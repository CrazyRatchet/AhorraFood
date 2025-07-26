#!/usr/bin/env node

/**
 * Start Expo development server from correct directory
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting AhorraFood Development Server...\n');

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found in current directory');
    console.error('Current directory:', process.cwd());
    console.error('Please run this script from the AhorraFood project root');
    process.exit(1);
}

// Read package.json to verify it's the right project
try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.name !== 'ahorrafood') {
        console.error('❌ This doesn\'t appear to be the AhorraFood project');
        console.error('Found project:', packageJson.name);
        process.exit(1);
    }
    
    console.log('✅ Found AhorraFood project');
    console.log('📦 Version:', packageJson.version);
} catch (error) {
    console.error('❌ Error reading package.json:', error.message);
    process.exit(1);
}

// Start Expo
console.log('\n🔄 Starting Expo development server...\n');

const expo = spawn('npx', ['expo', 'start'], {
    stdio: 'inherit',
    shell: true
});

expo.on('error', (error) => {
    console.error('❌ Error starting Expo:', error.message);
});

expo.on('close', (code) => {
    console.log(`\n📋 Expo process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
    console.log('\n🛑 Stopping development server...');
    expo.kill();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n🛑 Stopping development server...');
    expo.kill();
    process.exit(0);
});
