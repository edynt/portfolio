import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'server-backup',
  title: 'Server Backup & Recovery',
  description: 'Chiến lược backup, tự động hóa với cron, lưu trên S3 và phục hồi sau thảm họa',
  icon: '💾',
  chapters: [
    {
      id: 'chapter1',
      title: 'Nguyên tắc Backup',
      sections: [
        {
          id: 'backup-strategy',
          title: 'Chiến lược Backup: Quy tắc 3-2-1',
          subtitle: 'Tiêu chuẩn ngành cho backup đáng tin cậy',
          icon: '📐',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                { icon: '3️⃣', title: '3 bản sao', description: 'Giữ 3 bản sao dữ liệu: 1 bản chính + 2 bản backup.' },
                { icon: '2️⃣', title: '2 loại lưu trữ khác nhau', description: 'Lưu trên 2 loại storage khác nhau (ổ cứng local + cloud).' },
                { icon: '1️⃣', title: '1 bản ngoài site', description: 'Ít nhất 1 bản phải ở ngoài site (region khác hoặc provider khác).' },
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Backup chưa test không phải backup',
              html: 'Thường xuyên thực hiện drill restore. Nhiều team chỉ phát hiện backup bị corrupt hoặc thiếu dữ liệu khi thảm họa xảy ra. <strong>Test restore mỗi tháng một lần.</strong>',
            },
            {
              type: 'table',
              caption: 'Những gì cần backup',
              headers: ['Loại dữ liệu', 'Tần suất', 'Giữ bao lâu', 'Phương pháp'],
              rows: [
                ['Database (Postgres/MySQL)', 'Mỗi 1-6 giờ', '30 ngày', 'pg_dump / mysqldump → S3'],
                ['File upload / media', 'Hàng ngày hoặc realtime', '90 ngày', 'rsync → S3 sync'],
                ['Config server (/etc/)', 'Hàng ngày', '90 ngày', 'tar + S3 upload'],
                ['Code ứng dụng', 'Mỗi lần git push', 'Mãi mãi', 'Git remote (GitHub)'],
                ['Chứng chỉ SSL', 'Hàng tuần', '1 năm', 'tar → S3'],
              ],
            },
          ],
        },
        {
          id: 'what-not-to-backup',
          title: 'Những gì KHÔNG cần backup',
          subtitle: 'Tiết kiệm storage và tránh lộ secrets',
          icon: '🚫',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'node_modules/ — cài lại từ package.json, đừng bao giờ đưa vào backup',
                'dist/ hoặc build/ — có thể tái tạo từ source code',
                'Docker images — pull từ ECR/Docker Hub',
                'File tạm, cache, logs cũ hơn thời gian retention',
                'File .env — lưu secrets trong secrets manager, không phải backup',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Script Backup Tự động',
      sections: [
        {
          id: 'postgres-backup',
          title: 'Backup PostgreSQL lên S3',
          subtitle: 'Tự động dump database hàng ngày',
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

# Tạo thư mục backup tạm
mkdir -p "$BACKUP_DIR"

# Dump và nén database
echo "[$(date)] Bắt đầu backup $DB_NAME..."
pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$BACKUP_DIR/$FILENAME"

# Upload lên S3
echo "[$(date)] Đang upload lên S3..."
aws s3 cp "$BACKUP_DIR/$FILENAME" "s3://$S3_BUCKET/postgres/$FILENAME" \\
  --storage-class STANDARD_IA

# Xóa backup cũ trên S3 (hơn retention period)
echo "[$(date)] Xóa backup cũ hơn $RETENTION_DAYS ngày..."
aws s3 ls "s3://$S3_BUCKET/postgres/" | \\
  awk '{print $4}' | \\
  while read -r key; do
    file_date=$(echo "$key" | grep -oP '\\d{4}-\\d{2}-\\d{2}')
    if [[ -n "$file_date" ]]; then
      age=$(( ( $(date +%s) - $(date -d "$file_date" +%s) ) / 86400 ))
      if [[ $age -gt $RETENTION_DAYS ]]; then
        aws s3 rm "s3://$S3_BUCKET/postgres/$key"
        echo "[$(date)] Đã xóa backup cũ: $key"
      fi
    fi
  done

# Dọn file tạm
rm -f "$BACKUP_DIR/$FILENAME"
echo "[$(date)] Backup hoàn tất: $FILENAME"`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Cấp quyền thực thi và test
chmod +x /home/deploy/backup-postgres.sh

# Test thủ công trước
/home/deploy/backup-postgres.sh

# Lên lịch với cron — chạy mỗi 6 giờ
crontab -e
# Thêm:
# 0 */6 * * * /home/deploy/backup-postgres.sh >> /var/log/backup.log 2>&1`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Chạy script thủ công trước: <code>bash /home/deploy/backup-postgres.sh</code> và kiểm tra output. Bạn phải thấy "Backup hoàn tất" cùng tên file. Không có lỗi nghĩa là script, kết nối DB và credentials S3 đều hoạt động.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Xác nhận cron job đã được đăng ký: <code>crontab -l</code>. Bạn sẽ thấy dòng backup được liệt kê. Kiểm tra S3 đã nhận file: <code>aws s3 ls s3://my-backups-bucket/postgres/ | tail -5</code>.',
            },
          ],
        },
        {
          id: 'files-backup',
          title: 'Backup Files & Config',
          subtitle: 'Backup uploads, config và secrets',
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

# Backup file upload của user
echo "Đang sync uploads lên S3..."
aws s3 sync /home/deploy/my-app/uploads \\
  "s3://$S3_BUCKET/uploads/" \\
  --delete \\
  --storage-class STANDARD_IA

# Backup file config server
echo "Đang backup server configs..."
CONFIGS_ARCHIVE="/tmp/server-configs-\${DATE}.tar.gz"
tar -czf "$CONFIGS_ARCHIVE" \\
  /etc/nginx/ \\
  /etc/systemd/system/my-app.service \\
  /etc/letsencrypt/ \\
  2>/dev/null || true

aws s3 cp "$CONFIGS_ARCHIVE" \\
  "s3://$S3_BUCKET/configs/server-configs-\${DATE}.tar.gz"

rm -f "$CONFIGS_ARCHIVE"
echo "Backup config hoàn tất"`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Kiểm tra S3 đã nhận file: <code>aws s3 ls s3://my-backups-bucket/postgres/backups/</code>. Xác nhận timestamp trên file mới nhất khớp với thời điểm bạn chạy backup.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Phục hồi sau Thảm họa',
      sections: [
        {
          id: 'restore-postgres',
          title: 'Restore PostgreSQL từ Backup',
          subtitle: 'Các bước phục hồi database',
          icon: '♻️',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# 1. Liệt kê các backup hiện có
aws s3 ls s3://my-backups-bucket/postgres/ | sort -r | head -10

# 2. Tải backup muốn restore
aws s3 cp \\
  s3://my-backups-bucket/postgres/postgres_myapp_2026-03-20_06-00-00.sql.gz \\
  /tmp/restore.sql.gz

# 3. Giải nén
gunzip /tmp/restore.sql.gz

# 4. Tạo database mới (nếu restore lên server mới)
sudo -u postgres createdb myapp_restored

# 5. Restore
sudo -u postgres psql myapp_restored < /tmp/restore.sql

# 6. Kiểm tra
sudo -u postgres psql myapp_restored -c "\\dt"               # Liệt kê tables
sudo -u postgres psql myapp_restored -c "SELECT COUNT(*) FROM users;"

# 7. Cập nhật connection string app sang database đã restore
# Rồi restart service
sudo systemctl restart my-app`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Kết nối vào database và kiểm tra dữ liệu trông đúng không: <code>psql -c \'SELECT count(*) FROM users;\'</code>. Số lượng rows phải khớp với lượng dữ liệu production mong đợi. Kiểm tra thêm một vài bản ghi để xác nhận tính toàn vẹn.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Restore lên staging trước',
              html: 'Không bao giờ restore trực tiếp lên production mà chưa kiểm tra. Restore lên môi trường staging trước, xác nhận dữ liệu ổn, rồi mới chuyển sang production.',
            },
          ],
        },
        {
          id: 'new-server-recovery',
          title: 'Phục hồi Server hoàn toàn',
          subtitle: 'Tái dựng từ đầu sau sự cố nghiêm trọng',
          icon: '🔄',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Tạo server mới từ cloud provider (cùng cấu hình)',
                'Làm theo tutorial Linux Server Setup: tạo user, firewall, Nginx, SSL',
                'Cài Node.js (hoặc runtime của bạn) và dependencies của app',
                'Tải backup config từ S3 và restore /etc/nginx/, systemd services',
                'Clone repository app từ GitHub',
                'Tải backup database mới nhất từ S3 và restore',
                'Restore file upload: aws s3 sync s3://bucket/uploads /app/uploads',
                'Cập nhật DNS trỏ về IP server mới',
                'Test kỹ trước khi thông báo phục hồi xong',
              ],
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Mục tiêu RTO và RPO',
              html: '<strong>RTO</strong> (Recovery Time Objective): mất bao lâu để khôi phục. <strong>RPO</strong> (Recovery Point Objective): có thể chịu mất bao nhiêu dữ liệu. Với backup DB mỗi 6 giờ, tối đa mất 6 giờ dữ liệu. Mục tiêu tốt cho team nhỏ: RTO &lt; 2 giờ, RPO &lt; 6 giờ.',
            },
          ],
        },
        {
          id: 'backup-verification',
          title: 'Tự động Xác minh Backup',
          subtitle: 'Script test restore hàng tuần',
          icon: '✅',
          iconColor: 'bg-teal-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              filename: '/home/deploy/verify-backup.sh',
              code: `#!/bin/bash
# Xác minh backup hàng tuần — chạy trên test database

set -euo pipefail

S3_BUCKET="my-backups-bucket"
TEST_DB="myapp_backup_test"
LOG="/var/log/backup-verify.log"

echo "[$(date)] Bắt đầu xác minh backup..." >> "$LOG"

# Lấy backup mới nhất
LATEST=$(aws s3 ls "s3://$S3_BUCKET/postgres/" | sort | tail -1 | awk '{print $4}')

if [ -z "$LATEST" ]; then
  echo "[$(date)] LỖI: Không tìm thấy backup nào trong S3!" >> "$LOG"
  exit 1
fi

# Download và restore sang test database
aws s3 cp "s3://$S3_BUCKET/postgres/$LATEST" /tmp/verify.sql.gz
gunzip -f /tmp/verify.sql.gz

sudo -u postgres dropdb --if-exists "$TEST_DB"
sudo -u postgres createdb "$TEST_DB"
sudo -u postgres psql "$TEST_DB" < /tmp/verify.sql

# Kiểm tra số lượng rows (thay tên table phù hợp với dự án)
USER_COUNT=$(sudo -u postgres psql "$TEST_DB" -t -c "SELECT COUNT(*) FROM users;" | tr -d ' ')

if [ "$USER_COUNT" -gt 0 ]; then
  echo "[$(date)] PASS: Backup hợp lệ. $USER_COUNT users trong database." >> "$LOG"
else
  echo "[$(date)] FAIL: Backup restore được nhưng bảng users rỗng!" >> "$LOG"
fi

# Dọn dẹp
sudo -u postgres dropdb "$TEST_DB"
rm -f /tmp/verify.sql

echo "[$(date)] Xác minh hoàn tất." >> "$LOG"`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `chmod +x /home/deploy/verify-backup.sh

# Chạy mỗi Chủ nhật lúc 2 giờ sáng
crontab -e
# Thêm:
# 0 2 * * 0 /home/deploy/verify-backup.sh`,
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
