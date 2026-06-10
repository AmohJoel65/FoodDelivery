// PM2 Process Manager Configuration
// Usage:
//   pm2 start ecosystem.config.js
//   pm2 restart joels-kitchen
//   pm2 logs joels-kitchen
//   pm2 monit

module.exports = {
  apps: [
    {
      name: 'joels-kitchen',
      script: 'server.js',
      cwd: '/home/ubuntu/FoodDelivery/backend',

      // Environment
      env_production: {
        NODE_ENV: 'production',
        PORT: 4000,
      },

      // Reliability
      instances: 1,          // single instance (free tier has 1 CPU core)
      autorestart: true,     // restart if it crashes
      watch: false,          // don't watch files in production
      max_memory_restart: '400M', // restart if RAM exceeds 400MB (free VM has 1GB)

      // Logging — logs are stored at ~/.pm2/logs/
      error_file: '/home/ubuntu/.pm2/logs/joels-kitchen-error.log',
      out_file: '/home/ubuntu/.pm2/logs/joels-kitchen-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,

      // Graceful shutdown
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    },
  ],
};
