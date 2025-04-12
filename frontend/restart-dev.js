// Script to restart the development server
import { exec } from 'child_process';
import { platform } from 'os';

const isWindows = platform() === 'win32';

// First try to kill any existing Nuxt processes
const killCmd = isWindows 
  ? 'taskkill /f /im node.exe /fi "WINDOWTITLE eq nuxt*"'
  : "pkill -f 'nuxt dev'";

console.log('Attempting to stop any running Nuxt servers...');

exec(killCmd, (error) => {
  // Ignore errors as there might not be any processes to kill
  console.log('Starting new Nuxt server on port 3000...');
  
  // Start a new Nuxt server with fixed port
  const startCmd = 'npm run dev';
  const child = exec(startCmd);
  
  child.stdout.on('data', (data) => {
    console.log(data);
  });
  
  child.stderr.on('data', (data) => {
    console.error(data);
  });
  
  child.on('close', (code) => {
    console.log(`Dev server process exited with code ${code}`);
  });
}); 