import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'devops-edge-cases',
  title: 'DevOps Edge Case Interview Q&A',
  description:
    'Real-world edge case scenarios for DevOps interviews — zero downtime, failure recovery, and production debugging',
  icon: '🎯',
  chapters: [
    {
      id: 'chapter1',
      title: 'Nginx & Reverse Proxy',
      sections: [
        {
          id: 'nginx-zero-downtime',
          title: 'Q: How to update Nginx config without downtime?',
          subtitle: 'Zero-downtime configuration reload',
          icon: '🔄',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Why this matters',
              html: 'In production, restarting Nginx (<code>systemctl restart nginx</code>) drops all active connections. Users get <strong>502 Bad Gateway</strong> during restart. You must use <strong>reload</strong> instead.',
            },
            {
              type: 'text',
              html: '<strong>Answer:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>Step 1:</strong> Edit the config file: <code>sudo nano /etc/nginx/sites-available/your-app</code>',
                '<strong>Step 2:</strong> Test config syntax: <code>sudo nginx -t</code> — MUST pass before proceeding',
                '<strong>Step 3:</strong> Reload (NOT restart): <code>sudo systemctl reload nginx</code>',
              ],
            },
            {
              type: 'compare',
              left: {
                title: '✅ reload (zero downtime)',
                blocks: [
                  {
                    type: 'code',
                    lang: 'bash',
                    code: `# Graceful reload — existing connections
# finish normally, new connections use
# the updated config
sudo nginx -t && sudo systemctl reload nginx`,
                  },
                  {
                    type: 'text',
                    html: 'Nginx spawns new worker processes with new config. Old workers finish existing requests, then exit. <strong>No dropped connections.</strong>',
                  },
                ],
              },
              right: {
                title: '❌ restart (causes downtime)',
                blocks: [
                  {
                    type: 'code',
                    lang: 'bash',
                    code: `# Hard restart — kills all connections
# immediately, users get 502 errors
sudo systemctl restart nginx`,
                  },
                  {
                    type: 'text',
                    html: 'Nginx stops completely, then starts fresh. All active connections are <strong>terminated immediately</strong>. Users see errors for 1-3 seconds.',
                  },
                ],
              },
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Common mistake',
              html: 'Never skip <code>nginx -t</code>. If the new config has syntax errors and you reload, Nginx ignores the reload and keeps running the old config. But if you <strong>restart</strong> with a bad config, Nginx <strong>fails to start</strong> — your entire site goes down.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Pro tip: One-liner',
              html: 'Always chain: <code>sudo nginx -t && sudo systemctl reload nginx</code>. The <code>&&</code> ensures reload only runs if test passes.',
            },
          ],
        },
        {
          id: 'nginx-upstream-down',
          title: 'Q: What happens when the upstream backend goes down?',
          subtitle: 'Nginx error handling and failover',
          icon: '💀',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> Nginx proxies to a Node.js app on port 3000. The app crashes. What do users see?',
            },
            {
              type: 'text',
              html: '<strong>Answer:</strong> Users get <strong>502 Bad Gateway</strong>. Nginx is still running fine — it just can\'t reach the backend.',
            },
            {
              type: 'text',
              html: '<strong>How to handle this:</strong>',
            },
            {
              type: 'code',
              lang: 'nginx',
              filename: 'nginx.conf — custom error page',
              code: `upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001 backup;  # failover server
}

server {
    listen 80;

    # Custom error pages instead of ugly 502
    error_page 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/html;
        internal;
    }

    location / {
        proxy_pass http://backend;
        proxy_connect_timeout 5s;     # fail fast
        proxy_next_upstream error timeout;  # try backup
    }
}`,
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '🔄',
                  title: 'Use systemd',
                  description: 'Configure Restart=always in systemd service so the app auto-restarts after crash',
                },
                {
                  icon: '🏥',
                  title: 'Health checks',
                  description: 'Add a /health endpoint. Use proxy_next_upstream to skip unhealthy backends',
                },
                {
                  icon: '📊',
                  title: 'Monitoring',
                  description: 'Set up alerts (UptimeRobot, Grafana) to notify immediately when 502 occurs',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Deployment & Rollback',
      sections: [
        {
          id: 'zero-downtime-deploy',
          title: 'Q: How to deploy without downtime?',
          subtitle: 'Blue-green, rolling update, and canary strategies',
          icon: '🚀',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> You need to deploy a new version of the backend. How do you ensure zero user-facing downtime?',
            },
            {
              type: 'table',
              caption: 'Deployment Strategies Comparison',
              headers: ['Strategy', 'How it works', 'Pros', 'Cons'],
              rows: [
                [
                  '<strong>Rolling Update</strong>',
                  'Replace instances one by one',
                  'Simple, works with ECS/K8s',
                  'Both old+new versions run simultaneously',
                ],
                [
                  '<strong>Blue-Green</strong>',
                  'Run new version in parallel, switch traffic at once',
                  'Instant rollback (switch back)',
                  'Needs 2x infrastructure temporarily',
                ],
                [
                  '<strong>Canary</strong>',
                  'Route 5-10% traffic to new version first',
                  'Safe — catch bugs with minimal impact',
                  'Complex routing setup',
                ],
              ],
            },
            {
              type: 'text',
              html: '<strong>Simplest approach for a single EC2 server:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'deploy.sh — zero downtime with PM2',
              code: `#!/bin/bash
set -e

cd /home/ubuntu/app

# Pull latest code
git pull origin main

# Install dependencies
npm ci --production

# Reload with zero downtime (PM2 restarts workers one by one)
pm2 reload app --update-env

# Verify deployment
sleep 3
curl -sf http://localhost:3000/health || {
    echo "Health check failed! Rolling back..."
    git checkout HEAD~1
    npm ci --production
    pm2 reload app --update-env
    exit 1
}

echo "Deploy successful!"`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Key insight',
              html: '<code>pm2 reload</code> (zero downtime) vs <code>pm2 restart</code> (has downtime). Same concept as <code>nginx reload</code> vs <code>nginx restart</code>. <strong>Always prefer reload in production.</strong>',
            },
          ],
        },
        {
          id: 'rollback-strategy',
          title: 'Q: Deployment broke production — how to rollback?',
          subtitle: 'Fast recovery under pressure',
          icon: '⏪',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'Interview scenario',
              html: 'You just deployed and users report errors. CPU spikes to 100%. What do you do <strong>in the first 60 seconds?</strong>',
            },
            {
              type: 'text',
              html: '<strong>Answer — Priority order:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>0-15s:</strong> Confirm the issue: <code>curl -I https://your-site.com</code> — check status code',
                '<strong>15-30s:</strong> Check logs: <code>pm2 logs --lines 50</code> or <code>journalctl -u app -n 50</code>',
                '<strong>30-45s:</strong> Rollback immediately: <code>git checkout HEAD~1 && npm ci && pm2 reload app</code>',
                '<strong>45-60s:</strong> Verify recovery: <code>curl -sf http://localhost:3000/health</code>',
                '<strong>After stable:</strong> Investigate root cause from logs. Fix and redeploy properly.',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Rule #1',
              html: '<strong>Restore service first, debug later.</strong> Don\'t spend 20 minutes reading logs while users can\'t access your site. Rollback → stabilize → then investigate.',
            },
            {
              type: 'text',
              html: '<strong>For ECS/Docker deployments:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'ECS rollback',
              code: `# ECS: update service to use previous task definition revision
aws ecs update-service \\
  --cluster ecr-cluster \\
  --service ecr-backend-service \\
  --task-definition ecr-backend-task:PREVIOUS_REVISION \\
  --force-new-deployment

# Docker: run previous image tag
docker stop app-current
docker run -d --name app-rollback -p 3000:3000 your-image:previous-tag`,
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Database & Migration',
      sections: [
        {
          id: 'db-migration-no-downtime',
          title: 'Q: How to run database migrations without downtime?',
          subtitle: 'Schema changes on a live database',
          icon: '🗄️',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'The danger',
              html: 'Running <code>ALTER TABLE users ADD COLUMN phone VARCHAR(20)</code> on a table with 10M rows can <strong>lock the table for minutes</strong>. All queries queue up. Your app freezes.',
            },
            {
              type: 'text',
              html: '<strong>Answer — Expand-Contract pattern:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>Phase 1 — Expand:</strong> Add new column as NULLABLE (no lock): <code>ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL</code>',
                '<strong>Phase 2 — Migrate:</strong> Deploy code that writes to BOTH old and new columns',
                '<strong>Phase 3 — Backfill:</strong> Update existing rows in batches: <code>UPDATE users SET phone = ... WHERE phone IS NULL LIMIT 1000</code>',
                '<strong>Phase 4 — Contract:</strong> Deploy code that only reads from new column. Then optionally drop old column.',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Never do in production',
              html: '<ul><li><code>ALTER TABLE ... NOT NULL</code> on large tables (locks table)</li><li><code>DROP COLUMN</code> without checking app code first</li><li><code>RENAME COLUMN</code> while old code still references it</li><li>Run migration and deploy at the same time</li></ul>',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Safe order',
              html: '<strong>Always:</strong> migrate DB first → deploy new code second. <strong>Never:</strong> deploy code that needs the new column before the migration runs.',
            },
          ],
        },
        {
          id: 'db-connection-pool',
          title: 'Q: App suddenly can\'t connect to database — what happened?',
          subtitle: 'Connection pool exhaustion',
          icon: '🔌',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> App worked fine for weeks. Suddenly all requests return "connection timeout" errors. Database server CPU is low. What\'s wrong?',
            },
            {
              type: 'text',
              html: '<strong>Answer:</strong> Most likely <strong>connection pool exhaustion</strong>. All connections are in use (or leaked) and new requests can\'t get a connection.',
            },
            {
              type: 'text',
              html: '<strong>Diagnose:</strong>',
            },
            {
              type: 'code',
              lang: 'sql',
              filename: 'Check active connections',
              code: `-- PostgreSQL: check current connections
SELECT count(*) FROM pg_stat_activity;

-- Check max allowed
SHOW max_connections;  -- default: 100

-- See what's holding connections
SELECT pid, state, query, query_start
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start;`,
            },
            {
              type: 'text',
              html: '<strong>Common causes & fixes:</strong>',
            },
            {
              type: 'table',
              caption: 'Connection Issues',
              headers: ['Cause', 'Symptom', 'Fix'],
              rows: [
                [
                  'Pool size too small',
                  'Errors during traffic spikes',
                  'Increase pool size: <code>max: 20</code> (not too high — RDS has limits)',
                ],
                [
                  'Connection leak',
                  'Connections grow over time, never released',
                  'Always release connections: use <code>pool.query()</code> not <code>pool.connect()</code> without release',
                ],
                [
                  'Long-running queries',
                  'Connections held for minutes',
                  'Add <code>statement_timeout = 30s</code> in PostgreSQL config',
                ],
                [
                  'Too many app instances',
                  '5 instances × 20 pool = 100 connections = max hit',
                  'Use PgBouncer as connection pooler between app and DB',
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter4',
      title: 'Server & Infrastructure',
      sections: [
        {
          id: 'disk-full',
          title: 'Q: Server disk is 100% full — how to recover?',
          subtitle: 'Emergency disk space recovery',
          icon: '💽',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> SSH still works but commands fail with "No space left on device". How do you free space safely?',
            },
            {
              type: 'text',
              html: '<strong>Answer — Priority order:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Emergency disk recovery',
              code: `# 1. Check what's using space
df -h                          # overview
du -sh /var/log/* | sort -rh | head  # usually logs are the culprit

# 2. Quick wins — clear safely
sudo journalctl --vacuum-size=100M   # systemd logs
sudo truncate -s 0 /var/log/syslog   # clear syslog (keeps file handle)
sudo apt clean                       # package cache

# 3. Find large files
find / -type f -size +100M -exec ls -lh {} \\; 2>/dev/null

# 4. Docker cleanup (if applicable)
docker system prune -af --volumes     # removes unused images, containers, volumes

# 5. Old deployments
ls -la /home/ubuntu/app/node_modules  # often 500MB+
# Keep only current version`,
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Never do',
              html: '<ul><li><code>rm -rf /var/log/*</code> — some apps crash if log files disappear. Use <code>truncate -s 0</code> instead (keeps file handle)</li><li>Delete files in <code>/tmp</code> without checking what\'s using them</li><li>Delete anything in <code>/usr</code> or <code>/lib</code></li></ul>',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Prevention',
              html: 'Set up log rotation: <code>/etc/logrotate.d/</code> configs. Add disk space alerts at 80% threshold. Use <code>docker system prune</code> in cron weekly.',
            },
          ],
        },
        {
          id: 'ssl-renewal-fail',
          title: 'Q: SSL certificate expired — site shows "Not Secure"',
          subtitle: 'Emergency SSL recovery and prevention',
          icon: '🔐',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> Users report "Your connection is not private" error. The SSL cert expired overnight. How to fix immediately?',
            },
            {
              type: 'text',
              html: '<strong>Answer:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Fix expired SSL certificate',
              code: `# 1. Check certificate status
sudo certbot certificates

# 2. Force renewal
sudo certbot renew --force-renewal

# 3. If renewal fails, check why
# Common: port 80 blocked by UFW or Nginx
sudo ufw status                     # must allow 80
sudo ss -tlnp | grep ':80'         # must be Nginx

# 4. Reload Nginx to use new cert
sudo nginx -t && sudo systemctl reload nginx

# 5. Verify
curl -vI https://your-domain.com 2>&1 | grep "expire date"`,
            },
            {
              type: 'text',
              html: '<strong>Why auto-renewal failed:</strong>',
            },
            {
              type: 'table',
              caption: 'SSL Renewal Failure Causes',
              headers: ['Cause', 'Fix'],
              rows: [
                ['Port 80 blocked', 'Ensure <code>sudo ufw allow 80</code> and Nginx listens on port 80'],
                ['Certbot timer not running', '<code>sudo systemctl enable certbot.timer && sudo systemctl start certbot.timer</code>'],
                ['DNS changed', 'Domain must still point to this server\'s IP'],
                ['Rate limited', "Let's Encrypt limits 5 certs/domain/week. Wait or use staging"],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Prevention',
              html: 'Test auto-renewal: <code>sudo certbot renew --dry-run</code>. Set up monitoring that checks SSL expiry dates weekly. Most certs renew at 30 days before expiry.',
            },
          ],
        },
        {
          id: 'memory-leak',
          title: 'Q: Node.js app memory keeps growing — how to diagnose?',
          subtitle: 'Production memory leak investigation',
          icon: '🧠',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> PM2 shows your app using 500MB RAM and growing. It started at 80MB. After a few days it gets OOM killed. What do you do?',
            },
            {
              type: 'text',
              html: '<strong>Answer — Immediate mitigation + investigation:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Immediate actions',
              code: `# 1. Set PM2 auto-restart threshold (buys time)
pm2 start app.js --max-memory-restart 300M

# 2. Monitor memory over time
pm2 monit   # real-time
watch -n 5 'pm2 jlist | jq ".[0].monit"'   # every 5 seconds

# 3. Check for obvious causes
# - Global arrays/maps that never get cleared
# - Event listeners added in loops without removeListener
# - Unclosed database connections
# - Large objects cached in memory without TTL`,
            },
            {
              type: 'text',
              html: '<strong>Common memory leak patterns in Node.js:</strong>',
            },
            {
              type: 'table',
              caption: 'Memory Leak Patterns',
              headers: ['Pattern', 'Example', 'Fix'],
              rows: [
                [
                  'Global cache without limit',
                  '<code>const cache = {}; cache[key] = data;</code>',
                  'Use LRU cache with max size: <code>new Map()</code> with eviction or <code>lru-cache</code> package',
                ],
                [
                  'Event listener leak',
                  'Adding listeners in request handler without cleanup',
                  'Always <code>removeListener</code> or use <code>once()</code> instead of <code>on()</code>',
                ],
                [
                  'Closure holding refs',
                  'Closures capturing large objects that outlive their usefulness',
                  'Set references to <code>null</code> when done. Avoid closures over large datasets.',
                ],
                [
                  'Unhandled streams',
                  'Readable streams not consumed or destroyed',
                  'Always call <code>stream.destroy()</code> on error. Use pipeline() instead of pipe()',
                ],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Quick diagnostic',
              html: 'Add <code>process.memoryUsage()</code> to your /health endpoint. Track <code>heapUsed</code> over time. If it only grows and never drops after GC, you have a leak.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter5',
      title: 'Docker & Container Edge Cases',
      sections: [
        {
          id: 'container-crash-loop',
          title: 'Q: Container keeps restarting (CrashLoopBackOff) — how to debug?',
          subtitle: 'When you can\'t even get into the container',
          icon: '🔁',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> Your Docker container starts and immediately exits. You can\'t <code>docker exec</code> into it because it\'s not running. How to debug?',
            },
            {
              type: 'text',
              html: '<strong>Answer:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Debug crashing container',
              code: `# 1. Check exit code and logs
docker logs container-name --tail 50
docker inspect container-name --format='{{.State.ExitCode}}'
# Exit code 137 = OOM killed, 1 = app error, 139 = segfault

# 2. Override entrypoint to get a shell
docker run -it --entrypoint /bin/sh your-image:tag

# 3. If no shell available (distroless image)
docker run -it --entrypoint /bin/sh alpine  # check if it's an image issue
docker cp container-name:/app/logs ./local-logs  # copy logs from dead container

# 4. Check resource limits
docker stats  # is the container hitting memory limit?`,
            },
            {
              type: 'table',
              caption: 'Common Exit Codes',
              headers: ['Exit Code', 'Meaning', 'Common Cause'],
              rows: [
                ['0', 'Success (but exited)', 'No CMD or CMD finishes immediately'],
                ['1', 'Application error', 'Unhandled exception, missing env vars, missing files'],
                ['137', 'OOM Killed (SIGKILL)', 'Container memory limit too low'],
                ['139', 'Segmentation fault', 'Corrupted binary or native module issue'],
                ['126', 'Permission denied', 'Entrypoint/CMD not executable'],
                ['127', 'Command not found', 'Wrong CMD path or binary not installed'],
              ],
            },
          ],
        },
        {
          id: 'docker-image-size',
          title: 'Q: Docker image is 2GB — how to optimize?',
          subtitle: 'Multi-stage builds and layer optimization',
          icon: '📦',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> Your Node.js Docker image is 2GB. ECR push takes 10 minutes. Deployment is slow. How to reduce size?',
            },
            {
              type: 'compare',
              left: {
                title: '❌ Bad: 2GB image',
                blocks: [
                  {
                    type: 'code',
                    lang: 'dockerfile',
                    code: `FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "dist/main.js"]

# Problem: includes dev dependencies,
# build tools, full OS, source code`,
                  },
                ],
              },
              right: {
                title: '✅ Good: ~150MB image',
                blocks: [
                  {
                    type: 'code',
                    lang: 'dockerfile',
                    code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
CMD ["node", "dist/main.js"]`,
                  },
                ],
              },
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '🏔️',
                  title: 'Use Alpine base',
                  description: 'node:20-alpine is ~50MB vs node:20 at ~1GB. Minimal OS with just what you need.',
                },
                {
                  icon: '🏗️',
                  title: 'Multi-stage build',
                  description: 'Build in stage 1, copy only output to stage 2. Dev dependencies stay in builder.',
                },
                {
                  icon: '📋',
                  title: '.dockerignore',
                  description: 'Exclude node_modules, .git, tests, docs from build context. Speeds up COPY.',
                },
                {
                  icon: '🧹',
                  title: 'npm ci --omit=dev',
                  description: 'In final stage, only install production dependencies. Saves 50-70% of node_modules.',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter6',
      title: 'Security & Network',
      sections: [
        {
          id: 'ddos-handling',
          title: 'Q: Server getting hit with unusual traffic — what to do?',
          subtitle: 'Rate limiting and basic DDoS mitigation',
          icon: '🛡️',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Scenario:</strong> Your server CPU spikes to 100%, access logs show thousands of requests per second from various IPs. What do you do?',
            },
            {
              type: 'text',
              html: '<strong>Answer — Immediate actions:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Identify and block abusive traffic',
              code: `# 1. Identify top IPs hitting the server
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -20

# 2. Block specific IPs with UFW
sudo ufw deny from 1.2.3.4

# 3. Add rate limiting in Nginx
# In http block:
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

# In server/location block:
limit_req zone=api burst=20 nodelay;
limit_req_status 429;`,
            },
            {
              type: 'text',
              html: '<strong>Long-term solutions:</strong>',
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '☁️',
                  title: 'Cloudflare',
                  description: 'Put Cloudflare in front of your server. Free tier includes DDoS protection and CDN.',
                },
                {
                  icon: '🚦',
                  title: 'Rate limiting',
                  description: 'Nginx limit_req_zone for L7 protection. Rate limit API endpoints at 10-50 req/s per IP.',
                },
                {
                  icon: '🔥',
                  title: 'AWS WAF / Security Groups',
                  description: 'WAF rules to block patterns. Security groups to restrict access by IP range.',
                },
              ],
            },
          ],
        },
        {
          id: 'env-vars-leaked',
          title: 'Q: Someone committed .env to git — how to recover?',
          subtitle: 'Secret exposure incident response',
          icon: '🚨',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'This is a critical security incident',
              html: 'Even if you delete the file in a new commit, the secrets are <strong>still in git history</strong>. Anyone who cloned the repo has them.',
            },
            {
              type: 'text',
              html: '<strong>Answer — Incident response order:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>Step 1 (0-5 min):</strong> Rotate ALL exposed secrets immediately — database passwords, API keys, AWS credentials. Don\'t wait.',
                '<strong>Step 2:</strong> Update deployed environments with new secrets',
                '<strong>Step 3:</strong> Remove from git history: <code>git filter-repo --path .env --invert-paths</code> or use BFG Repo-Cleaner',
                '<strong>Step 4:</strong> Force push: <code>git push --force-with-lease</code> — all team members must re-clone',
                '<strong>Step 5:</strong> Audit logs to check if secrets were accessed by unauthorized parties',
                '<strong>Step 6:</strong> Add <code>.env</code> to <code>.gitignore</code> and set up pre-commit hooks to prevent recurrence',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Key insight for interviews',
              html: '<strong>Rotating secrets is MORE important than cleaning git history.</strong> The moment secrets are in a public repo, assume they\'re compromised. GitHub scans repos and bots scrape secrets within minutes.',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Prevention — pre-commit hook',
              code: `# .git/hooks/pre-commit
#!/bin/bash
if git diff --cached --name-only | grep -qE '\.env$|\.env\..+$'; then
    echo "ERROR: Attempting to commit .env file!"
    echo "Remove it: git reset HEAD .env"
    exit 1
fi`,
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
