const path = require('path');
const fs = require('fs-extra');

// Resolve directories
const frontendDir = path.resolve(__dirname, '../..', 'frontend', 'dist');
// mv ../frontend/dist/ ../backend/dist/public",

const backendDir = path.resolve(__dirname, '../..', 'backend', 'dist', 'src', 'public');

// Ensure the destination directory exists
fs.ensureDirSync(backendDir);

// Copy frontend build output to backend public directory.
fs.copySync(frontendDir, backendDir, { overwrite: true });
// Remove the frontend build directory
// Will bypass permission
fs.removeSync(frontendDir);
