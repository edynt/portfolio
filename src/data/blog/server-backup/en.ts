import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'server-backup',
  title: 'Server Backup & Recovery',
  description: 'Backup strategies, automated cron backups, S3 storage, and disaster recovery',
  icon: '💾',
  chapters: [
    {
      id: 'chapter1',
      title: 'Backup Fundamentals',
      sections: [
        {
          id: 'backup-strategy',
          title: 'Backup Strategy: The 3-2-1 Rule',
          subtitle: 'The industry standard for reliable backups',
          icon: '📐',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                { icon: '3️⃣', title: '3 Copies', description: 'Keep 3 copies of your data: 1 primary + 2 backups.' },
                { icon: '2️⃣', title: '2 Different Media', description: 'Store on 2 different types of storage (local disk + cloud).' },
                { icon: '1️⃣', title: '1 Offsite', description: 'At least 1 copy must be offsite (different region or provider).' },
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'A backup you haven\'t tested is not a backup',
              html: 'Run a restore drill regularly. Many teams discover their backups are corrupted or incomplete only when disaster strikes. <strong>Test restores every month.</strong>',
            },
            {
              type: 'table',
              caption: 'What to back up',
              headers: ['Data Type', 'Frequency', 'Retention', 'Method'],
              rows: [
                ['Database (Postgres/MySQL)', 'Every 1-6 hours', '30 days', 'pg_dump / mysqldump → S3'],
                ['Uploaded files / media', 'Daily or real-time', '90 days', 'rsync → S3 sync'],
                ['Server config (/etc/)', 'Daily', '90 days', 'tar + S3 upload'],
                ['Application code', 'Git push', 'Forever', 'Git remote (GitHub)'],
                ['SSL certificates', 'Weekly', '1 year', 'tar → S3'],
              ],
            },
          ],
        },
        {
          id: 'what-not-to-backup',
          title: 'What NOT to Back Up',
          subtitle: 'Save storage and avoid leaking secrets',
          icon: '🚫',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'node_modules/ — reinstall from package.json, never store in backups',
                'dist/ or build/ — reproducible from source code',
                'Docker images — pull from ECR/Docker Hub',
                'Temp files, caches, logs older than your retention period',
                '.env files — store secrets in a secrets manager, not backups',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Automated Backup Scripts',
      sections: [
        {
          id: 'postgres-backup',
          title: 'PostgreSQL Backup to S3',
          subtitle: 'Automated daily database dumps',
          icon: '🐘',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              filename: '/home/deploy/backup-postgres.sh',
              code: `#!/bin/bash
set -euo pipefail

# Config
DB_NAME="myapp"
DB_USER="postgres"
S3_BUCKET="my-backups-bucket"
BACKUP_DIR="/tmp/backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
FILENAME="postgres_\${DB_NAME}_\${DATE}.sql.gz"
RETENTION_DAYS=30

# Create temp backup directory
mkdir -p "$BACKUP_DIR"

# Dump and compress database
echo "[$(date)] Starting backup of $DB_NAME..."
pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$BACKUP_DIR/$FILENAME"

# Upload to S3
echo "[$(date)] Uploading to S3..."
aws s3 cp "$BACKUP_DIR/$FILENAME" "s3://$S3_BUCKET/postgres/$FILENAME" \\
  --storage-class STANDARD_IA

# Delete old backups from S3 (older than retention period)
echo "[$(date)] Removing backups older than $RETENTION_DAYS days..."
aws s3 ls "s3://$S3_BUCKET/postgres/" | \\
  awk '{print $4}' | \\
  while read -r key; do
    file_date=$(echo "$key" | grep -oP '\\d{4}-\\d{2}-\\d{2}')
    if [[ -n "$file_date" ]]; then
      age=$(( ( $(date +%s) - $(date -d "$file_date" +%s) ) / 86400 ))
      if [[ $age -gt $RETENTION_DAYS ]]; then
        aws s3 rm "s3://$S3_BUCKET/postgres/$key"
        echo "[$(date)] Deleted old backup: $key"
      fi
    fi
  done

# Clean up local temp file
rm -f "$BACKUP_DIR/$FILENAME"
echo "[$(date)] Backup complete: $FILENAME"`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Make executable and test
chmod +x /home/deploy/backup-postgres.sh

# Test it manually first
/home/deploy/backup-postgres.sh

# Schedule with cron — run every 6 hours
crontab -e
# Add:
# 0 */6 * * * /home/deploy/backup-postgres.sh >> /var/log/backup.log 2>&1`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Run the script manually first: <code>bash /home/deploy/backup-postgres.sh</code> and check the output. You should see "Backup complete" with the filename. No errors means the script, DB connection, and S3 credentials are all working.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Check the cron job is registered: <code>crontab -l</code>. You should see the backup line listed. Also confirm S3 received the file: <code>aws s3 ls s3://my-backups-bucket/postgres/ | tail -5</code>.',
            },
          ],
        },
        {
          id: 'files-backup',
          title: 'Files & Config Backup',
          subtitle: 'Back up uploads, configs, and secrets',
          icon: '📁',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              filename: '/home/deploy/backup-files.sh',
              code: `#!/bin/bash
set -euo pipefail

S3_BUCKET="my-backups-bucket"
DATE=$(date +%Y-%m-%d_%H-%M-%S)

# Back up uploaded user files
echo "Syncing uploads to S3..."
aws s3 sync /home/deploy/my-app/uploads \\
  "s3://$S3_BUCKET/uploads/" \\
  --delete \\
  --storage-class STANDARD_IA

# Back up server config files
echo "Backing up server configs..."
CONFIGS_ARCHIVE="/tmp/server-configs-\${DATE}.tar.gz"
tar -czf "$CONFIGS_ARCHIVE" \\
  /etc/nginx/ \\
  /etc/systemd/system/my-app.service \\
  /etc/letsencrypt/ \\
  2>/dev/null || true

aws s3 cp "$CONFIGS_ARCHIVE" \\
  "s3://$S3_BUCKET/configs/server-configs-\${DATE}.tar.gz"

rm -f "$CONFIGS_ARCHIVE"
echo "Config backup complete"`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Check S3 received the files: <code>aws s3 ls s3://my-backups-bucket/postgres/backups/</code>. Confirm the timestamp on the latest file matches when you ran the backup.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Disaster Recovery',
      sections: [
        {
          id: 'restore-postgres',
          title: 'Restore PostgreSQL from Backup',
          subtitle: 'Step-by-step database restoration',
          icon: '♻️',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# 1. List available backups
aws s3 ls s3://my-backups-bucket/postgres/ | sort -r | head -10

# 2. Download the backup you want
aws s3 cp \\
  s3://my-backups-bucket/postgres/postgres_myapp_2026-03-20_06-00-00.sql.gz \\
  /tmp/restore.sql.gz

# 3. Decompress
gunzip /tmp/restore.sql.gz

# 4. Create fresh database (if restoring to new server)
sudo -u postgres createdb myapp_restored

# 5. Restore
sudo -u postgres psql myapp_restored < /tmp/restore.sql

# 6. Verify
sudo -u postgres psql myapp_restored -c "\\dt"      # List tables
sudo -u postgres psql myapp_restored -c "SELECT COUNT(*) FROM users;"

# 7. Update app connection string to point to restored db
# Then restart the service
sudo systemctl restart my-app`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Connect to the database and verify data looks correct: <code>psql -c \'SELECT count(*) FROM users;\'</code>. The row count should match your expected production data volume. Also spot-check a few records to confirm content integrity.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Restore to staging first',
              html: 'Never restore directly to production without verifying the backup. Restore to a staging environment first, verify data integrity, then swap if everything looks correct.',
            },
          ],
        },
        {
          id: 'new-server-recovery',
          title: 'Full Server Recovery',
          subtitle: 'Rebuild from scratch after catastrophic failure',
          icon: '🔄',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Provision new server from your cloud provider (same specs)',
                'Follow Linux Server Setup tutorial: create user, firewall, Nginx, SSL',
                'Install Node.js (or your runtime) and your app dependencies',
                'Download latest config backup from S3 and restore /etc/nginx/, systemd services',
                'Clone your app repository from GitHub',
                'Download latest database backup from S3 and restore',
                'Restore uploaded files: aws s3 sync s3://bucket/uploads /app/uploads',
                'Update DNS to point to new server IP',
                'Test thoroughly before announcing recovery',
              ],
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Target RTO and RPO',
              html: '<strong>RTO</strong> (Recovery Time Objective): how fast you can be back up. <strong>RPO</strong> (Recovery Point Objective): how much data you can afford to lose. With 6-hourly DB backups, your max data loss is 6 hours. Good targets for small teams: RTO &lt; 2 hours, RPO &lt; 6 hours.',
            },
          ],
        },
        {
          id: 'backup-verification',
          title: 'Verify Backups Automatically',
          subtitle: 'Script to test restore every week',
          icon: '✅',
          iconColor: 'bg-teal-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              filename: '/home/deploy/verify-backup.sh',
              code: `#!/bin/bash
# Weekly backup verification — run on a test database

set -euo pipefail

S3_BUCKET="my-backups-bucket"
TEST_DB="myapp_backup_test"
LOG="/var/log/backup-verify.log"

echo "[$(date)] Starting backup verification..." >> "$LOG"

# Get latest backup
LATEST=$(aws s3 ls "s3://$S3_BUCKET/postgres/" | sort | tail -1 | awk '{print $4}')

if [ -z "$LATEST" ]; then
  echo "[$(date)] ERROR: No backups found in S3!" >> "$LOG"
  exit 1
fi

# Download and restore to test database
aws s3 cp "s3://$S3_BUCKET/postgres/$LATEST" /tmp/verify.sql.gz
gunzip -f /tmp/verify.sql.gz

sudo -u postgres dropdb --if-exists "$TEST_DB"
sudo -u postgres createdb "$TEST_DB"
sudo -u postgres psql "$TEST_DB" < /tmp/verify.sql

# Verify row counts (adjust table name to yours)
USER_COUNT=$(sudo -u postgres psql "$TEST_DB" -t -c "SELECT COUNT(*) FROM users;" | tr -d ' ')

if [ "$USER_COUNT" -gt 0 ]; then
  echo "[$(date)] PASS: Backup verified. $USER_COUNT users in database." >> "$LOG"
else
  echo "[$(date)] FAIL: Backup restored but users table is empty!" >> "$LOG"
fi

# Cleanup
sudo -u postgres dropdb "$TEST_DB"
rm -f /tmp/verify.sql

echo "[$(date)] Verification complete." >> "$LOG"`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `chmod +x /home/deploy/verify-backup.sh

# Run every Sunday at 2am
crontab -e
# Add:
# 0 2 * * 0 /home/deploy/verify-backup.sh`,
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
