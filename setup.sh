#!/usr/bin/env bash
# =============================================================================
#  Joel's Kitchen — Oracle Cloud Ubuntu Setup Script
#  Run this once on a fresh Ubuntu 22.04 VM as the 'ubuntu' user.
#
#  Usage:
#    chmod +x setup.sh
#    ./setup.sh
# =============================================================================
set -e  # Exit immediately on any error

REPO_URL="https://github.com/YOUR_USERNAME/FoodDelivery.git"
APP_DIR="/home/ubuntu/FoodDelivery"
NGINX_SITE="joels-kitchen"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║   Joel's Kitchen — Oracle Cloud Setup        ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── Step 1: Update System ────────────────────────────────────────────────────
echo "▶ [1/9] Updating system packages..."
sudo apt-get update -qq && sudo apt-get upgrade -y -qq
echo "✔ System updated."

# ── Step 2: Install Node.js 20 LTS ──────────────────────────────────────────
echo "▶ [2/9] Installing Node.js 20 LTS..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - -qq
sudo apt-get install -y nodejs -qq
echo "✔ Node.js $(node --version) installed."

# ── Step 3: Install PM2 ──────────────────────────────────────────────────────
echo "▶ [3/9] Installing PM2..."
sudo npm install -g pm2 --silent
echo "✔ PM2 $(pm2 --version) installed."

# ── Step 4: Install Nginx ────────────────────────────────────────────────────
echo "▶ [4/9] Installing Nginx..."
sudo apt-get install -y nginx -qq
echo "✔ Nginx installed."

# ── Step 5: Open firewall ports ──────────────────────────────────────────────
echo "▶ [5/9] Configuring firewall (ports 80 & 443)..."
sudo apt-get install -y iptables-persistent -qq || true
sudo iptables -I INPUT -p tcp --dport 80  -j ACCEPT 2>/dev/null || true
sudo iptables -I INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null || true
sudo netfilter-persistent save 2>/dev/null || true
echo "✔ Firewall configured."

# ── Step 6: Clone the repository ─────────────────────────────────────────────
echo "▶ [6/9] Cloning project repository..."
if [ -d "$APP_DIR" ]; then
  echo "  Directory already exists — pulling latest changes..."
  cd "$APP_DIR" && git pull origin main
else
  git clone "$REPO_URL" "$APP_DIR"
  cd "$APP_DIR"
fi
echo "✔ Repository ready at $APP_DIR"

# ── Step 7: Build the frontend ───────────────────────────────────────────────
echo "▶ [7/9] Building React frontend..."
cd "$APP_DIR/frontend"
npm install --silent

# Create production .env for frontend
# VITE_API_URL is intentionally EMPTY — the Express server serves both
# frontend and API from the same origin, so no absolute URL is needed.
cat > .env << 'EOF'
# Oracle Cloud production — leave VITE_API_URL empty.
# Express serves the built frontend and all /api/* routes from the same server.
# No cross-origin requests = no CORS needed.
VITE_API_URL=
EOF

npm run build
echo "✔ Frontend built → frontend/dist/"

# ── Step 8: Set up backend ───────────────────────────────────────────────────
echo "▶ [8/9] Setting up backend..."
cd "$APP_DIR/backend"
npm install --silent

# Create backend .env if it doesn't exist
if [ ! -f .env ]; then
  echo ""
  echo "  ┌──────────────────────────────────────────────────────────────┐"
  echo "  │  ACTION REQUIRED: Create your backend .env file              │"
  echo "  │                                                               │"
  echo "  │  Run this command to generate a secure JWT secret:           │"
  echo "  │  node -e \"console.log(require('crypto').randomBytes(64)      │"
  echo "  │           .toString('hex'))\"                                  │"
  echo "  │                                                               │"
  echo "  │  Then fill in backend/.env with the template below.          │"
  echo "  └──────────────────────────────────────────────────────────────┘"
  echo ""

  cat > .env << 'EOF'
NODE_ENV=production
PORT=4000

# Generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=REPLACE_WITH_LONG_RANDOM_SECRET

# Gmail SMTP (use App Password from myaccount.google.com/apppasswords)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=joelamoh65@gmail.com
SMTP_PASS=REPLACE_WITH_GMAIL_APP_PASSWORD
SMTP_FROM=Joel's Kitchen <joelamoh65@gmail.com>
OWNER_EMAIL=joelamoh65@gmail.com

# FRONTEND_URL is NOT needed — same server, no CORS required
EOF

  echo "  ⚠  A template .env has been created at backend/.env"
  echo "  ⚠  Edit it now: nano $APP_DIR/backend/.env"
fi

# Start backend with PM2
pm2 start ecosystem.config.js --env production
pm2 save

# Make PM2 start on reboot
PM2_STARTUP=$(pm2 startup | grep "sudo" | tail -1)
echo ""
echo "  Run this command to make PM2 auto-start on reboot:"
echo "  $PM2_STARTUP"
echo ""

# ── Step 9: Configure Nginx ──────────────────────────────────────────────────
echo "▶ [9/9] Configuring Nginx..."
sudo cp "$APP_DIR/nginx.conf" "/etc/nginx/sites-available/$NGINX_SITE"

# Remove default site to avoid conflicts
sudo rm -f /etc/nginx/sites-enabled/default

# Enable our site
sudo ln -sf "/etc/nginx/sites-available/$NGINX_SITE" "/etc/nginx/sites-enabled/$NGINX_SITE"

# Test and reload nginx
sudo nginx -t && sudo systemctl reload nginx
echo "✔ Nginx configured and running."

# ── Done ─────────────────────────────────────────────────────────────────────
PUBLIC_IP=$(curl -s ifconfig.me 2>/dev/null || echo "YOUR_PUBLIC_IP")

echo ""
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║  ✅  Setup Complete!                                             ║"
echo "╠══════════════════════════════════════════════════════════════════╣"
echo "║                                                                  ║"
echo "║  Your app should be live at:                                     ║"
echo "║  http://$PUBLIC_IP                                               ║"
echo "║                                                                  ║"
echo "║  Health check:                                                   ║"
echo "║  curl http://localhost:4000/api/health                           ║"
echo "║                                                                  ║"
echo "║  ⚠  If you haven't edited backend/.env yet, do it now:          ║"
echo "║  nano $APP_DIR/backend/.env                                      ║"
echo "║  Then: pm2 restart joels-kitchen                                 ║"
echo "║                                                                  ║"
echo "║  PM2 Commands:                                                   ║"
echo "║  pm2 status          — check if app is running                  ║"
echo "║  pm2 logs            — view live logs                           ║"
echo "║  pm2 restart joels-kitchen — restart after changes              ║"
echo "║                                                                  ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""
