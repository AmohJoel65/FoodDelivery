const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log file paths
const errorLogPath = path.join(logsDir, 'error.log');
const combinedLogPath = path.join(logsDir, 'combined.log');

// Log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Colors for console output
const colors = {
  error: '\x1b[31m', // Red
  warn: '\x1b[33m', // Yellow
  info: '\x1b[36m', // Cyan
  http: '\x1b[35m', // Magenta
  debug: '\x1b[90m', // Gray
  reset: '\x1b[0m'
};

// Format timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

// Format log message
const formatMessage = (level, message, meta = {}) => {
  const timestamp = getTimestamp();
  const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}${metaStr}`;
};

// Write to log file
const writeToFile = (filePath, message) => {
  try {
    fs.appendFileSync(filePath, message + '\n');
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
};

// Logger functions
const logger = {
  error: (message, meta = {}) => {
    const formattedMessage = formatMessage('error', message, meta);
    console.log(`${colors.error}${formattedMessage}${colors.reset}`);
    writeToFile(errorLogPath, formattedMessage);
    writeToFile(combinedLogPath, formattedMessage);
  },
  warn: (message, meta = {}) => {
    const formattedMessage = formatMessage('warn', message, meta);
    console.log(`${colors.warn}${formattedMessage}${colors.reset}`);
    writeToFile(combinedLogPath, formattedMessage);
  },
  info: (message, meta = {}) => {
    const formattedMessage = formatMessage('info', message, meta);
    console.log(`${colors.info}${formattedMessage}${colors.reset}`);
    writeToFile(combinedLogPath, formattedMessage);
  },
  http: (message, meta = {}) => {
    const formattedMessage = formatMessage('http', message, meta);
    console.log(`${colors.http}${formattedMessage}${colors.reset}`);
    writeToFile(combinedLogPath, formattedMessage);
  },
  debug: (message, meta = {}) => {
    const formattedMessage = formatMessage('debug', message, meta);
    console.log(`${colors.debug}${formattedMessage}${colors.reset}`);
    writeToFile(combinedLogPath, formattedMessage);
  }
};

module.exports = logger;
