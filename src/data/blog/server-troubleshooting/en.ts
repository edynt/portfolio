import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'server-troubleshooting',
  title: 'Server Troubleshooting',
  description: 'Diagnose crashes, fix high CPU/memory, investigate logs, and restore downed services',
  icon: '🔧',
  chapters: [
    {
      id: 'chapter1',
      title: 'Diagnosing a Downed Server',
      sections: [
        {
          id: 'first-response',
          title: 'First Response Checklist',
          subtitle: 'What to do in the first 5 minutes of an outage',
          icon: '🚨',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: 'When a server goes down, follow a systematic approach. Don\'t panic — work through these checks in order.',
            },
            {
              type: 'step-list',
              items: [
                'Can you SSH in? If not, use your cloud provider\'s console (AWS Systems Manager, etc.)',
                'Check if the app process is running: systemctl status my-app',
                'Check disk space — a full disk silently kills most apps',
                'Check memory — OOM killer may have terminated your process',
                'Check CPU load — runaway process?',
                'Check logs for error messages before the crash',
                'Check if the database is reachable',
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Quick system health snapshot
echo "=== Uptime & Load ===" && uptime
echo "=== Disk Usage ===" && df -h
echo "=== Memory ===" && free -h
echo "=== Top Processes ===" && ps aux --sort=-%mem | head -10
echo "=== App Status ===" && sudo systemctl status my-app --no-pager`,
            },
          ],
        },
        {
          id: 'reading-logs',
          title: 'Reading Logs',
          subtitle: 'Find the error that caused the crash',
          icon: '📋',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Application logs via systemd journal
sudo journalctl -u my-app -n 100          # Last 100 lines
sudo journalctl -u my-app --since "10 min ago"  # Last 10 minutes
sudo journalctl -u my-app -p err          # Error level only

# System logs
sudo journalctl -p err --since "1 hour ago"  # All system errors

# Nginx logs
sudo tail -100 /var/log/nginx/error.log
sudo tail -100 /var/log/nginx/access.log

# Auth log (failed SSH attempts, etc.)
sudo tail -50 /var/log/auth.log

# Kernel messages (OOM killer, hardware errors)
sudo dmesg | tail -50
sudo dmesg | grep -i "oom\|killed\|error" | tail -20`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Look for OOM kills',
              html: 'If your process disappeared without a trace, check: <code>sudo dmesg | grep -i "oom\|killed"</code>. OOM (Out Of Memory) kills happen silently and are a very common cause of random crashes.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Common Issues & Fixes',
      sections: [
        {
          id: 'disk-full',
          title: 'Disk Full',
          subtitle: 'Find and clean up large files',
          icon: '💾',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'Full disk = dead server',
              html: 'A 100% full disk will stop your app, prevent new SSH connections (no space for TTY), and can corrupt databases. This is the #1 silent killer of servers.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Check overall disk usage
df -h

# Find the biggest directories
du -sh /* 2>/dev/null | sort -rh | head -20
du -sh /var/* 2>/dev/null | sort -rh | head -10

# Find largest files system-wide
sudo find / -type f -size +100M 2>/dev/null | xargs ls -lh | sort -k5 -rh | head -20

# Clean up common culprits:

# 1. Old systemd journal logs (often huge)
sudo journalctl --disk-usage
sudo journalctl --vacuum-size=500M     # Keep only 500MB of logs
sudo journalctl --vacuum-time=7d       # Keep only 7 days of logs

# 2. Docker artifacts (if using Docker)
docker system prune -af

# 3. Old package cache
sudo apt clean
sudo apt autoremove -y

# 4. Large log files in /var/log
sudo find /var/log -name "*.log" -size +50M
sudo truncate -s 0 /var/log/large-file.log  # Zero out without deleting`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>df -h</code> again to confirm space was freed. The filesystem usage percentage should be noticeably lower. Restart your app if it was killed by the full disk.',
            },
          ],
        },
        {
          id: 'high-memory',
          title: 'High Memory / OOM Kills',
          subtitle: 'Identify memory leaks and prevent OOM crashes',
          icon: '🧠',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Check memory usage
free -h
cat /proc/meminfo | grep -E "MemTotal|MemFree|MemAvailable|Cached|Buffers"

# Top memory consumers
ps aux --sort=-%mem | head -15

# Check if OOM killer fired recently
sudo dmesg | grep -i "out of memory\|killed process"

# Real-time memory monitoring
watch -n 2 free -h`,
            },
            {
              type: 'text',
              html: 'If your Node.js app is leaking memory, increase the V8 heap limit as a temporary fix while you find the leak:',
            },
            {
              type: 'code',
              lang: 'ini',
              filename: '/etc/systemd/system/my-app.service',
              code: `[Service]
# Increase Node.js heap to 2GB
ExecStart=/usr/bin/node --max-old-space-size=2048 dist/index.js

# Set memory limit (systemd will restart if exceeded)
MemoryMax=3G
MemorySwapMax=0`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>free -h</code> to confirm memory has been restored to normal levels. The "available" column should show significantly more free memory after restarting the leaking process.',
            },
          ],
        },
        {
          id: 'high-cpu',
          title: 'High CPU Load',
          subtitle: 'Find and kill runaway processes',
          icon: '⚡',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Interactive process viewer
htop

# Or with ps — sort by CPU
ps aux --sort=-%cpu | head -15

# Check load average (1m, 5m, 15m)
# Load > number of CPU cores means overloaded
uptime
nproc  # number of CPU cores

# Find the exact PID causing high CPU
top -b -n 1 | head -20

# Get more info about a process
lsof -p PID        # Files it has open
strace -p PID      # System calls (advanced)

# Kill a runaway process gracefully first
kill -15 PID
# If it won't stop:
kill -9 PID`,
            },
          ],
        },
        {
          id: 'port-in-use',
          title: 'Port Already in Use',
          subtitle: 'App fails to start: "address already in use"',
          icon: '🔌',
          iconColor: 'bg-teal-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Find what's using port 3000
sudo ss -tlnp | grep 3000
sudo lsof -i :3000

# Output example:
# COMMAND  PID   USER  FD  TYPE DEVICE SIZE/OFF NODE NAME
# node    1234  deploy  22u IPv4 ...        TCP *:3000 (LISTEN)

# Kill the process holding the port
kill -15 1234

# Or find the service and restart it cleanly
sudo systemctl restart my-app`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run <code>ss -tlnp</code> to confirm the port is now free (or held by the correct process). Your app should start successfully and the port should appear bound to the intended service.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Monitoring & Alerts',
      sections: [
        {
          id: 'health-check-script',
          title: 'Health Check Script',
          subtitle: 'Auto-restart if app goes down',
          icon: '💊',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: 'Create a simple health check script that restarts your app if it stops responding. Run it every minute via cron.',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: '/home/deploy/health-check.sh',
              code: `#!/bin/bash

APP_URL="http://localhost:3000/health"
SERVICE_NAME="my-app"
LOG_FILE="/var/log/health-check.log"

# Check if app responds within 5 seconds
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$APP_URL")

if [ "$HTTP_CODE" != "200" ]; then
  echo "[$(date)] Health check FAILED (HTTP $HTTP_CODE) — restarting $SERVICE_NAME" >> "$LOG_FILE"
  sudo systemctl restart "$SERVICE_NAME"
  sleep 5
  # Check again
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$APP_URL")
  echo "[$(date)] After restart: HTTP $HTTP_CODE" >> "$LOG_FILE"
else
  echo "[$(date)] OK (HTTP $HTTP_CODE)" >> "$LOG_FILE"
fi`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Make executable
chmod +x /home/deploy/health-check.sh

# Add to crontab (run every minute)
crontab -e
# Add this line:
# * * * * * /home/deploy/health-check.sh`,
            },
          ],
        },
        {
          id: 'monitoring-tools',
          title: 'Monitoring Tools',
          subtitle: 'Know before your users tell you',
          icon: '📊',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                { icon: '📡', title: 'UptimeRobot', description: 'Free external uptime monitoring. Alerts via email/Slack when your site goes down.' },
                { icon: '📈', title: 'Netdata', description: 'Lightweight real-time monitoring installed directly on server. Zero config.' },
                { icon: '🔔', title: 'Grafana + Prometheus', description: 'Production-grade metrics with dashboards and alerting rules.' },
                { icon: '📩', title: 'Logwatch', description: 'Daily email digest of server activity and anomalies from system logs.' },
                { icon: '🛡', title: 'fail2ban', description: 'Auto-bans IPs with too many failed SSH/HTTP attempts. Prevents brute force.' },
                { icon: '💬', title: 'Alertmanager', description: 'Route alerts to Slack, PagerDuty, email based on severity rules.' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
