import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'linux-server-setup',
  title: 'EC2 Server Setup',
  description: 'Set up an EC2 Ubuntu server: SSH, firewall, Nginx, SSL, and hardening',
  icon: '🖥',
  chapters: [
    {
      id: 'chapter1',
      title: 'First Login & Hardening',
      sections: [
        {
          id: 'initial-access',
          title: 'Initial Server Access',
          subtitle: 'Connect, create a sudo user, disable root login',
          icon: '🔑',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'warn',
              title: 'Never run as root',
              html: 'Logging in as <code>root</code> is dangerous. Create a non-root user with sudo privileges immediately after first login.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Connect to your new server
ssh root@YOUR_SERVER_IP

# Create a new user
adduser deploy

# Grant sudo privileges
usermod -aG sudo deploy

# Copy SSH keys to new user
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Test login as new user (in a new terminal)
ssh deploy@YOUR_SERVER_IP

# Verify sudo works
sudo whoami
# root`,
            },
            {
              type: 'text',
              html: 'Now disable root SSH login:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `sudo nano /etc/ssh/sshd_config

# Change these values:
# PermitRootLogin no
# PasswordAuthentication no
# PubkeyAuthentication yes

sudo systemctl restart sshd`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Test SSH in a <strong>NEW terminal</strong> before closing your current session. Run <code>ssh deploy@YOUR_SERVER_IP</code> in a second window — confirm you can log in before closing the first session. If locked out, use your VPS console.',
            },
          ],
        },
        {
          id: 'system-update',
          title: 'Update the System',
          subtitle: 'Always update before installing anything',
          icon: '🔄',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Update package index and upgrade all packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y \\
  curl wget git unzip \\
  build-essential \\
  software-properties-common \\
  htop ncdu \\
  fail2ban

# Set timezone
sudo timedatectl set-timezone Asia/Ho_Chi_Minh
timedatectl status`,
            },
          ],
        },
        {
          id: 'firewall-setup',
          title: 'Configure UFW Firewall',
          subtitle: 'Block all ports except what you need',
          icon: '🔥',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>UFW</strong> (Uncomplicated Firewall) is the standard firewall manager on Ubuntu. Default policy: deny all incoming, allow all outgoing.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Allow SSH first (critical — do this before enabling!)
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# If running a backend API on custom port
sudo ufw allow 3000/tcp

# Enable the firewall
sudo ufw enable

# Check status
sudo ufw status verbose`,
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Allow SSH before enabling!',
              html: 'If you enable UFW without allowing port 22 (SSH) first, you will be locked out of your server permanently. Run <code>sudo ufw allow OpenSSH</code> first.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>sudo ufw status verbose</code> to confirm all expected rules are active. You should see ports 22, 80, and 443 listed as ALLOW.',
            },
            {
              type: 'table',
              caption: 'Common UFW commands',
              headers: ['Command', 'What it does'],
              rows: [
                ['ufw allow 22/tcp', 'Open port 22 (SSH)'],
                ['ufw deny 3306/tcp', 'Block MySQL from outside'],
                ['ufw allow from 10.0.0.0/24', 'Allow entire subnet'],
                ['ufw delete allow 3000/tcp', 'Remove a rule'],
                ['ufw status numbered', 'List rules with numbers'],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Install Nginx & SSL',
      sections: [
        {
          id: 'nginx-install',
          title: 'Install & Configure Nginx',
          subtitle: 'Reverse proxy for your application',
          icon: '🌐',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Install Nginx
sudo apt install -y nginx

# Start and enable on boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Check status
sudo systemctl status nginx`,
            },
            {
              type: 'text',
              html: 'Create a server block (virtual host) to proxy requests to your app:',
            },
            {
              type: 'code',
              lang: 'nginx',
              filename: '/etc/nginx/sites-available/my-app',
              code: `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Proxy requests to your Node.js app
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static files directly (optional)
    location /static/ {
        alias /var/www/my-app/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Enable the site
sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

# Test config syntax
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>sudo nginx -t</code> before reloading. You should see <code>syntax is ok</code> and <code>test is successful</code>. Only reload if both lines are green.',
            },
          ],
        },
        {
          id: 'ssl-certbot',
          title: 'SSL with Certbot',
          subtitle: 'Free HTTPS certificate from Let\'s Encrypt',
          icon: '🔒',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Install Certbot and Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate (auto-configures Nginx)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test auto-renewal
sudo certbot renew --dry-run

# Check renewal timer
sudo systemctl status certbot.timer`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Visit <code>https://your-domain.com</code> in a browser and check the certificate. Click the padlock icon — the cert should be issued by Let\'s Encrypt and valid for your domain.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Auto-renewal',
              html: 'Certbot installs a systemd timer that automatically renews certificates before they expire. Let\'s Encrypt certs expire every 90 days — but renewal is fully automatic.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Process Management',
      sections: [
        {
          id: 'systemd-service',
          title: 'Run App as a systemd Service',
          subtitle: 'Auto-start and auto-restart your application',
          icon: '⚙️',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'text',
              html: 'Create a <strong>systemd unit file</strong> to manage your app as a system service. It will start automatically on boot and restart on crashes.',
            },
            {
              type: 'code',
              lang: 'ini',
              filename: '/etc/systemd/system/my-app.service',
              code: `[Unit]
Description=My Node.js Application
After=network.target

[Service]
Type=simple
User=deploy
WorkingDirectory=/home/deploy/my-app
ExecStart=/usr/bin/node dist/index.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=my-app
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Reload systemd and enable service
sudo systemctl daemon-reload
sudo systemctl enable my-app
sudo systemctl start my-app

# Check status and logs
sudo systemctl status my-app
sudo journalctl -u my-app -f`,
            },
            {
              type: 'table',
              caption: 'Common systemctl commands',
              headers: ['Command', 'Action'],
              rows: [
                ['systemctl start my-app', 'Start the service'],
                ['systemctl stop my-app', 'Stop the service'],
                ['systemctl restart my-app', 'Restart the service'],
                ['systemctl status my-app', 'Show status + recent logs'],
                ['journalctl -u my-app -f', 'Stream logs in real-time'],
                ['journalctl -u my-app --since "1 hour ago"', 'Logs from last hour'],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter4',
      title: 'Troubleshooting',
      sections: [
        {
          id: 'troubleshooting',
          title: 'Common Problems & Fixes',
          subtitle: 'Solutions to the most frequent server setup issues',
          icon: '🔧',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Locked out of SSH</strong> — Cannot connect after changing SSH config.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'You changed the SSH port or modified <code>sshd_config</code> without testing in a new terminal first. The new config may have a syntax error or block your key.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Use your VPS provider\'s web console (e.g., DigitalOcean Console, AWS SSM). Log in through the console, run <code>sudo nano /etc/ssh/sshd_config</code> to fix the config, then <code>sudo systemctl restart sshd</code>.',
            },
            {
              type: 'text',
              html: '<strong>Nginx shows 502 Bad Gateway</strong> — Nginx is running but returns 502 for all requests.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Your backend application is not running, or the <code>proxy_pass</code> port in your Nginx config does not match the port your app is listening on.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Run <code>sudo systemctl status my-app</code> to check if the backend is active. Verify the port in your Nginx config matches: <code>grep proxy_pass /etc/nginx/sites-enabled/my-app</code>. Restart the app if needed: <code>sudo systemctl start my-app</code>.',
            },
            {
              type: 'text',
              html: '<strong>SSL certificate renewal fails</strong> — Certbot renew returns errors.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Port 80 is blocked by UFW, or Nginx is not correctly configured to serve the <code>.well-known/acme-challenge</code> path that Let\'s Encrypt uses for domain verification.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Ensure UFW allows port 80: <code>sudo ufw allow 80/tcp</code>. Verify the certbot Nginx plugin is installed: <code>sudo apt install python3-certbot-nginx</code>. Then retry: <code>sudo certbot renew --dry-run</code>.',
            },
            {
              type: 'text',
              html: '<strong>UFW blocking legitimate traffic</strong> — A service is unreachable despite being configured.',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The UFW rule for the required port was never added, or it was added with the wrong port number.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Check current rules: <code>sudo ufw status</code>. If the port is missing, add it: <code>sudo ufw allow PORT/tcp</code>. Example: <code>sudo ufw allow 8080/tcp</code>.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
