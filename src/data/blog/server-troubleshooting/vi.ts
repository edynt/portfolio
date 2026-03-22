import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'server-troubleshooting',
  title: 'Server Troubleshooting',
  description: 'Chẩn đoán sự cố, fix CPU/RAM cao, đọc logs và khôi phục service bị sập',
  icon: '🔧',
  chapters: [
    {
      id: 'chapter1',
      title: 'Chẩn đoán server bị sập',
      sections: [
        {
          id: 'first-response',
          title: 'Checklist phản ứng đầu tiên',
          subtitle: 'Làm gì trong 5 phút đầu khi có sự cố',
          icon: '🚨',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: 'Khi server bị sập, hãy xử lý có hệ thống. Không hoảng loạn — đi qua từng bước kiểm tra theo thứ tự.',
            },
            {
              type: 'step-list',
              items: [
                'SSH được không? Nếu không, dùng console của cloud provider (AWS Systems Manager, v.v.)',
                'Kiểm tra process app còn chạy không: systemctl status my-app',
                'Kiểm tra dung lượng ổ cứng — ổ đầy sẽ kill hầu hết app một cách âm thầm',
                'Kiểm tra RAM — OOM killer có thể đã tắt process của bạn',
                'Kiểm tra CPU load — có process nào chạy điên không?',
                'Xem logs trước thời điểm crash để tìm thông báo lỗi',
                'Kiểm tra database có kết nối được không',
              ],
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Snapshot sức khỏe hệ thống nhanh
echo "=== Uptime & Load ===" && uptime
echo "=== Dung lượng ổ cứng ===" && df -h
echo "=== RAM ===" && free -h
echo "=== Top Processes ===" && ps aux --sort=-%mem | head -10
echo "=== App Status ===" && sudo systemctl status my-app --no-pager`,
            },
          ],
        },
        {
          id: 'reading-logs',
          title: 'Đọc Logs',
          subtitle: 'Tìm lỗi gây ra crash',
          icon: '📋',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Logs ứng dụng qua systemd journal
sudo journalctl -u my-app -n 100                    # 100 dòng cuối
sudo journalctl -u my-app --since "10 min ago"      # 10 phút gần nhất
sudo journalctl -u my-app -p err                    # Chỉ lỗi error

# Logs hệ thống
sudo journalctl -p err --since "1 hour ago"         # Tất cả lỗi hệ thống

# Logs Nginx
sudo tail -100 /var/log/nginx/error.log
sudo tail -100 /var/log/nginx/access.log

# Log auth (failed SSH, v.v.)
sudo tail -50 /var/log/auth.log

# Thông điệp kernel (OOM killer, lỗi phần cứng)
sudo dmesg | tail -50
sudo dmesg | grep -i "oom\|killed\|error" | tail -20`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Tìm OOM kills',
              html: 'Nếu process biến mất không để lại dấu vết, kiểm tra: <code>sudo dmesg | grep -i "out of memory\\|killed"</code>. OOM (Out Of Memory) kills xảy ra âm thầm và là nguyên nhân phổ biến nhất gây crash ngẫu nhiên.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Lỗi phổ biến & Cách fix',
      sections: [
        {
          id: 'disk-full',
          title: 'Ổ cứng đầy',
          subtitle: 'Tìm và dọn dẹp các file lớn',
          icon: '💾',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'Ổ cứng đầy = server chết',
              html: 'Ổ cứng 100% sẽ dừng app, ngăn SSH mới (không còn chỗ cho TTY), và có thể làm hỏng database. Đây là nguyên nhân số 1 giết server âm thầm.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Kiểm tra tổng quan dung lượng ổ cứng
df -h

# Tìm thư mục lớn nhất
du -sh /* 2>/dev/null | sort -rh | head -20
du -sh /var/* 2>/dev/null | sort -rh | head -10

# Tìm file lớn nhất trên toàn hệ thống
sudo find / -type f -size +100M 2>/dev/null | xargs ls -lh | sort -k5 -rh | head -20

# Dọn dẹp các thủ phạm thường gặp:

# 1. Logs cũ của systemd journal (thường rất lớn)
sudo journalctl --disk-usage
sudo journalctl --vacuum-size=500M     # Chỉ giữ 500MB logs
sudo journalctl --vacuum-time=7d       # Chỉ giữ 7 ngày logs

# 2. Artifacts Docker (nếu dùng Docker)
docker system prune -af

# 3. Cache package cũ
sudo apt clean
sudo apt autoremove -y

# 4. File log lớn trong /var/log
sudo find /var/log -name "*.log" -size +50M
sudo truncate -s 0 /var/log/large-file.log  # Xóa nội dung mà không xóa file`,
            },
          ],
        },
        {
          id: 'high-memory',
          title: 'RAM cao / OOM Kills',
          subtitle: 'Phát hiện memory leak và ngăn OOM crash',
          icon: '🧠',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Kiểm tra sử dụng RAM
free -h
cat /proc/meminfo | grep -E "MemTotal|MemFree|MemAvailable|Cached|Buffers"

# Top tiêu thụ RAM nhiều nhất
ps aux --sort=-%mem | head -15

# Kiểm tra OOM killer có kích hoạt không
sudo dmesg | grep -i "out of memory\|killed process"

# Giám sát RAM realtime
watch -n 2 free -h`,
            },
            {
              type: 'text',
              html: 'Nếu app Node.js bị memory leak, tăng giới hạn V8 heap như biện pháp tạm thời trong khi tìm nguyên nhân:',
            },
            {
              type: 'code',
              lang: 'ini',
              filename: '/etc/systemd/system/my-app.service',
              code: `[Service]
# Tăng Node.js heap lên 2GB
ExecStart=/usr/bin/node --max-old-space-size=2048 dist/index.js

# Đặt giới hạn RAM (systemd sẽ restart nếu vượt quá)
MemoryMax=3G
MemorySwapMax=0`,
            },
          ],
        },
        {
          id: 'high-cpu',
          title: 'CPU cao',
          subtitle: 'Tìm và kill process chạy điên',
          icon: '⚡',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Xem process tương tác
htop

# Hoặc dùng ps — sắp xếp theo CPU
ps aux --sort=-%cpu | head -15

# Kiểm tra load average (1m, 5m, 15m)
# Load > số CPU cores = quá tải
uptime
nproc  # số CPU cores

# Tìm PID gây CPU cao
top -b -n 1 | head -20

# Xem thêm thông tin về process
lsof -p PID        # Các file đang mở
strace -p PID      # System calls (nâng cao)

# Kill process chạy điên — thử graceful trước
kill -15 PID
# Nếu không dừng được:
kill -9 PID`,
            },
          ],
        },
        {
          id: 'port-in-use',
          title: 'Port đang bị chiếm',
          subtitle: 'App không khởi động được: "address already in use"',
          icon: '🔌',
          iconColor: 'bg-teal-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Tìm process đang dùng port 3000
sudo ss -tlnp | grep 3000
sudo lsof -i :3000

# Ví dụ output:
# COMMAND  PID   USER  FD  TYPE DEVICE SIZE/OFF NODE NAME
# node    1234  deploy  22u IPv4 ...        TCP *:3000 (LISTEN)

# Kill process đang giữ port
kill -15 1234

# Hoặc tìm service và restart sạch
sudo systemctl restart my-app`,
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Giám sát & Cảnh báo',
      sections: [
        {
          id: 'health-check-script',
          title: 'Script Health Check',
          subtitle: 'Tự động restart nếu app bị sập',
          icon: '💊',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: 'Tạo script health check đơn giản tự restart app nếu không phản hồi. Chạy mỗi phút qua cron.',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: '/home/deploy/health-check.sh',
              code: `#!/bin/bash

APP_URL="http://localhost:3000/health"
SERVICE_NAME="my-app"
LOG_FILE="/var/log/health-check.log"

# Kiểm tra app phản hồi trong 5 giây
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$APP_URL")

if [ "$HTTP_CODE" != "200" ]; then
  echo "[$(date)] Health check THẤT BẠI (HTTP $HTTP_CODE) — đang restart $SERVICE_NAME" >> "$LOG_FILE"
  sudo systemctl restart "$SERVICE_NAME"
  sleep 5
  # Kiểm tra lại
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 "$APP_URL")
  echo "[$(date)] Sau khi restart: HTTP $HTTP_CODE" >> "$LOG_FILE"
else
  echo "[$(date)] OK (HTTP $HTTP_CODE)" >> "$LOG_FILE"
fi`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Cấp quyền thực thi
chmod +x /home/deploy/health-check.sh

# Thêm vào crontab (chạy mỗi phút)
crontab -e
# Thêm dòng này:
# * * * * * /home/deploy/health-check.sh`,
            },
          ],
        },
        {
          id: 'monitoring-tools',
          title: 'Công cụ Giám sát',
          subtitle: 'Biết trước khi user báo cho bạn',
          icon: '📊',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                { icon: '📡', title: 'UptimeRobot', description: 'Giám sát uptime từ bên ngoài miễn phí. Cảnh báo qua email/Slack khi site sập.' },
                { icon: '📈', title: 'Netdata', description: 'Giám sát realtime nhẹ, cài trực tiếp trên server. Không cần cấu hình.' },
                { icon: '🔔', title: 'Grafana + Prometheus', description: 'Metrics production-grade với dashboard và alerting rules.' },
                { icon: '📩', title: 'Logwatch', description: 'Tóm tắt hoạt động server và anomalies từ system logs gửi qua email hàng ngày.' },
                { icon: '🛡', title: 'fail2ban', description: 'Tự động ban IP có quá nhiều lần đăng nhập SSH/HTTP thất bại. Ngăn brute force.' },
                { icon: '💬', title: 'Alertmanager', description: 'Điều hướng cảnh báo đến Slack, PagerDuty, email theo mức độ nghiêm trọng.' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
