#!/usr/bin/env bash
# =============================================================================
#  Joel's Kitchen — Deploy / Update Script
#  Run this on the Oracle VM whenever you push new code to GitHub.
#
#  Usage:
#    ./deploy.sh
# =============================================================================
set -e

APP_DIR="/home/ubuntu/FoodDelivery"

echo ""
echo "▶ Pulling latest code from GitHub..."
cd "$APP_DIR"
git pull origin main

echo "▶ Rebuilding frontend..."
cd "$APP_DIR/frontend"
npm install --silent
npm run build

echo "▶ Updating backend dependencies..."
cd "$APP_DIR/backend"
npm install --silent

echo "▶ Restarting server..."
pm2 restart joels-kitchen

echo ""
echo "✅ Deploy complete! App is live."
pm2 status
