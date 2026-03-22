import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'devops-edge-cases',
  title: 'DevOps Edge Case Interview Q&A',
  description:
    'Các tình huống edge case thực tế cho phỏng vấn DevOps — zero downtime, recovery, và debug production',
  icon: '🎯',
  chapters: [
    {
      id: 'chapter1',
      title: 'Nginx & Reverse Proxy',
      sections: [
        {
          id: 'nginx-zero-downtime',
          title: 'Q: Làm sao update config Nginx mà không downtime?',
          subtitle: 'Zero-downtime configuration reload',
          icon: '🔄',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Tại sao quan trọng',
              html: 'Trong production, restart Nginx (<code>systemctl restart nginx</code>) sẽ ngắt tất cả kết nối đang hoạt động. User sẽ thấy <strong>502 Bad Gateway</strong> trong lúc restart. Bạn phải dùng <strong>reload</strong> thay vì restart.',
            },
            {
              type: 'text',
              html: '<strong>Trả lời:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>Bước 1:</strong> Sửa config: <code>sudo nano /etc/nginx/sites-available/your-app</code>',
                '<strong>Bước 2:</strong> Test cú pháp: <code>sudo nginx -t</code> — PHẢI pass trước khi tiếp tục',
                '<strong>Bước 3:</strong> Reload (KHÔNG restart): <code>sudo systemctl reload nginx</code>',
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
                    code: `# Reload graceful — các kết nối hiện tại
# hoàn thành bình thường, kết nối mới dùng
# config mới
sudo nginx -t && sudo systemctl reload nginx`,
                  },
                  {
                    type: 'text',
                    html: 'Nginx tạo worker processes mới với config mới. Workers cũ hoàn thành requests hiện tại rồi thoát. <strong>Không mất kết nối nào.</strong>',
                  },
                ],
              },
              right: {
                title: '❌ restart (gây downtime)',
                blocks: [
                  {
                    type: 'code',
                    lang: 'bash',
                    code: `# Restart cứng — ngắt tất cả kết nối
# ngay lập tức, user thấy lỗi 502
sudo systemctl restart nginx`,
                  },
                  {
                    type: 'text',
                    html: 'Nginx dừng hoàn toàn, rồi khởi động lại. Tất cả kết nối đang hoạt động bị <strong>ngắt ngay lập tức</strong>. User thấy lỗi trong 1-3 giây.',
                  },
                ],
              },
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Lỗi thường gặp',
              html: 'Đừng bao giờ bỏ qua <code>nginx -t</code>. Nếu config mới bị lỗi cú pháp và bạn reload, Nginx bỏ qua reload và tiếp tục chạy config cũ. Nhưng nếu bạn <strong>restart</strong> với config lỗi, Nginx <strong>không khởi động được</strong> — toàn bộ site sập.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Pro tip: One-liner',
              html: 'Luôn nối lệnh: <code>sudo nginx -t && sudo systemctl reload nginx</code>. Dấu <code>&&</code> đảm bảo reload chỉ chạy nếu test pass.',
            },
          ],
        },
        {
          id: 'nginx-upstream-down',
          title: 'Q: Backend bị sập thì Nginx xử lý sao?',
          subtitle: 'Error handling và failover',
          icon: '💀',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> Nginx proxy tới Node.js app trên port 3000. App bị crash. User thấy gì?',
            },
            {
              type: 'text',
              html: '<strong>Trả lời:</strong> User thấy <strong>502 Bad Gateway</strong>. Nginx vẫn chạy bình thường — chỉ là không kết nối được tới backend.',
            },
            {
              type: 'text',
              html: '<strong>Cách xử lý:</strong>',
            },
            {
              type: 'code',
              lang: 'nginx',
              filename: 'nginx.conf — trang lỗi tuỳ chỉnh',
              code: `upstream backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001 backup;  # server dự phòng
}

server {
    listen 80;

    # Trang lỗi tuỳ chỉnh thay vì 502 xấu
    error_page 502 503 504 /50x.html;
    location = /50x.html {
        root /var/www/html;
        internal;
    }

    location / {
        proxy_pass http://backend;
        proxy_connect_timeout 5s;     # fail nhanh
        proxy_next_upstream error timeout;  # thử backup
    }
}`,
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '🔄',
                  title: 'Dùng systemd',
                  description: 'Cấu hình Restart=always trong systemd service để app tự restart sau khi crash',
                },
                {
                  icon: '🏥',
                  title: 'Health checks',
                  description: 'Thêm endpoint /health. Dùng proxy_next_upstream để skip backend không healthy',
                },
                {
                  icon: '📊',
                  title: 'Monitoring',
                  description: 'Thiết lập cảnh báo (UptimeRobot, Grafana) để thông báo ngay khi có 502',
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
          title: 'Q: Làm sao deploy mà không downtime?',
          subtitle: 'Blue-green, rolling update, và canary',
          icon: '🚀',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> Bạn cần deploy phiên bản backend mới. Làm sao đảm bảo user không bị gián đoạn?',
            },
            {
              type: 'table',
              caption: 'So sánh chiến lược deployment',
              headers: ['Chiến lược', 'Cách hoạt động', 'Ưu điểm', 'Nhược điểm'],
              rows: [
                [
                  '<strong>Rolling Update</strong>',
                  'Thay thế instance từng cái một',
                  'Đơn giản, hoạt động với ECS/K8s',
                  'Cả 2 phiên bản cũ+mới chạy cùng lúc',
                ],
                [
                  '<strong>Blue-Green</strong>',
                  'Chạy phiên bản mới song song, chuyển traffic một lần',
                  'Rollback tức thì (chuyển lại)',
                  'Cần 2x hạ tầng tạm thời',
                ],
                [
                  '<strong>Canary</strong>',
                  'Chuyển 5-10% traffic tới phiên bản mới trước',
                  'An toàn — phát hiện bug với ảnh hưởng tối thiểu',
                  'Setup routing phức tạp',
                ],
              ],
            },
            {
              type: 'text',
              html: '<strong>Cách đơn giản nhất cho 1 EC2 server:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'deploy.sh — zero downtime với PM2',
              code: `#!/bin/bash
set -e

cd /home/ubuntu/app

# Pull code mới
git pull origin main

# Cài dependencies
npm ci --production

# Reload zero downtime (PM2 restart workers từng cái)
pm2 reload app --update-env

# Kiểm tra deployment
sleep 3
curl -sf http://localhost:3000/health || {
    echo "Health check failed! Đang rollback..."
    git checkout HEAD~1
    npm ci --production
    pm2 reload app --update-env
    exit 1
}

echo "Deploy thành công!"`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Key insight',
              html: '<code>pm2 reload</code> (zero downtime) vs <code>pm2 restart</code> (có downtime). Giống concept <code>nginx reload</code> vs <code>nginx restart</code>. <strong>Luôn dùng reload trong production.</strong>',
            },
          ],
        },
        {
          id: 'rollback-strategy',
          title: 'Q: Deploy xong production bị lỗi — rollback sao?',
          subtitle: 'Recovery nhanh dưới áp lực',
          icon: '⏪',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'Tình huống phỏng vấn',
              html: 'Bạn vừa deploy xong và user báo lỗi. CPU tăng vọt 100%. Bạn làm gì <strong>trong 60 giây đầu tiên?</strong>',
            },
            {
              type: 'text',
              html: '<strong>Trả lời — Thứ tự ưu tiên:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>0-15s:</strong> Xác nhận lỗi: <code>curl -I https://your-site.com</code> — kiểm tra status code',
                '<strong>15-30s:</strong> Xem logs: <code>pm2 logs --lines 50</code> hoặc <code>journalctl -u app -n 50</code>',
                '<strong>30-45s:</strong> Rollback ngay: <code>git checkout HEAD~1 && npm ci && pm2 reload app</code>',
                '<strong>45-60s:</strong> Kiểm tra recovery: <code>curl -sf http://localhost:3000/health</code>',
                '<strong>Sau khi ổn định:</strong> Điều tra nguyên nhân từ logs. Fix rồi deploy lại đúng cách.',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Quy tắc #1',
              html: '<strong>Khôi phục dịch vụ trước, debug sau.</strong> Đừng ngồi đọc logs 20 phút trong khi user không truy cập được site. Rollback → ổn định → rồi mới điều tra.',
            },
            {
              type: 'text',
              html: '<strong>Cho ECS/Docker deployments:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'ECS rollback',
              code: `# ECS: update service dùng task definition revision trước
aws ecs update-service \\
  --cluster ecr-cluster \\
  --service ecr-backend-service \\
  --task-definition ecr-backend-task:PREVIOUS_REVISION \\
  --force-new-deployment

# Docker: chạy image tag trước
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
          title: 'Q: Chạy database migration mà không downtime?',
          subtitle: 'Thay đổi schema trên database đang chạy',
          icon: '🗄️',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguy hiểm',
              html: 'Chạy <code>ALTER TABLE users ADD COLUMN phone VARCHAR(20)</code> trên bảng 10M rows có thể <strong>lock table vài phút</strong>. Tất cả queries xếp hàng. App đơ.',
            },
            {
              type: 'text',
              html: '<strong>Trả lời — Pattern Expand-Contract:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>Phase 1 — Expand:</strong> Thêm cột mới NULLABLE (không lock): <code>ALTER TABLE users ADD COLUMN phone VARCHAR(20) NULL</code>',
                '<strong>Phase 2 — Migrate:</strong> Deploy code viết vào CẢ cột cũ và mới',
                '<strong>Phase 3 — Backfill:</strong> Cập nhật rows cũ theo batch: <code>UPDATE users SET phone = ... WHERE phone IS NULL LIMIT 1000</code>',
                '<strong>Phase 4 — Contract:</strong> Deploy code chỉ đọc từ cột mới. Rồi tuỳ chọn drop cột cũ.',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Không bao giờ làm trong production',
              html: '<ul><li><code>ALTER TABLE ... NOT NULL</code> trên bảng lớn (lock table)</li><li><code>DROP COLUMN</code> mà chưa kiểm tra app code</li><li><code>RENAME COLUMN</code> khi code cũ vẫn reference nó</li><li>Chạy migration và deploy cùng lúc</li></ul>',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Thứ tự an toàn',
              html: '<strong>Luôn:</strong> migrate DB trước → deploy code mới sau. <strong>Không bao giờ:</strong> deploy code cần cột mới trước khi migration chạy.',
            },
          ],
        },
        {
          id: 'db-connection-pool',
          title: 'Q: App đột nhiên không kết nối được database?',
          subtitle: 'Connection pool exhaustion',
          icon: '🔌',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> App chạy tốt mấy tuần. Đột nhiên tất cả request báo "connection timeout". CPU database thấp. Chuyện gì?',
            },
            {
              type: 'text',
              html: '<strong>Trả lời:</strong> Rất có thể <strong>connection pool exhaustion</strong>. Tất cả connections đang được dùng (hoặc bị leak) và request mới không lấy được connection.',
            },
            {
              type: 'text',
              html: '<strong>Chẩn đoán:</strong>',
            },
            {
              type: 'code',
              lang: 'sql',
              filename: 'Kiểm tra active connections',
              code: `-- PostgreSQL: kiểm tra số connections hiện tại
SELECT count(*) FROM pg_stat_activity;

-- Kiểm tra max cho phép
SHOW max_connections;  -- mặc định: 100

-- Xem cái gì đang giữ connection
SELECT pid, state, query, query_start
FROM pg_stat_activity
WHERE state != 'idle'
ORDER BY query_start;`,
            },
            {
              type: 'text',
              html: '<strong>Nguyên nhân và cách fix:</strong>',
            },
            {
              type: 'table',
              caption: 'Vấn đề Connection',
              headers: ['Nguyên nhân', 'Triệu chứng', 'Fix'],
              rows: [
                [
                  'Pool size quá nhỏ',
                  'Lỗi khi traffic tăng đột biến',
                  'Tăng pool size: <code>max: 20</code> (đừng quá cao — RDS có giới hạn)',
                ],
                [
                  'Connection leak',
                  'Connections tăng dần, không bao giờ được release',
                  'Luôn release connection: dùng <code>pool.query()</code> thay vì <code>pool.connect()</code> mà không release',
                ],
                [
                  'Query chạy lâu',
                  'Connection bị giữ hàng phút',
                  'Thêm <code>statement_timeout = 30s</code> trong config PostgreSQL',
                ],
                [
                  'Quá nhiều app instances',
                  '5 instances × 20 pool = 100 connections = chạm max',
                  'Dùng PgBouncer làm connection pooler giữa app và DB',
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
          title: 'Q: Ổ cứng server đầy 100% — phục hồi sao?',
          subtitle: 'Giải phóng disk space khẩn cấp',
          icon: '💽',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> SSH vẫn vào được nhưng lệnh báo "No space left on device". Làm sao giải phóng space an toàn?',
            },
            {
              type: 'text',
              html: '<strong>Trả lời — Thứ tự ưu tiên:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Phục hồi disk khẩn cấp',
              code: `# 1. Kiểm tra cái gì chiếm space
df -h                          # tổng quan
du -sh /var/log/* | sort -rh | head  # thường là logs

# 2. Giải phóng nhanh — xoá an toàn
sudo journalctl --vacuum-size=100M   # systemd logs
sudo truncate -s 0 /var/log/syslog   # clear syslog (giữ file handle)
sudo apt clean                       # package cache

# 3. Tìm file lớn
find / -type f -size +100M -exec ls -lh {} \\; 2>/dev/null

# 4. Dọn Docker (nếu có)
docker system prune -af --volumes     # xoá images, containers, volumes không dùng

# 5. Deployment cũ
ls -la /home/ubuntu/app/node_modules  # thường 500MB+
# Chỉ giữ phiên bản hiện tại`,
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Không bao giờ làm',
              html: '<ul><li><code>rm -rf /var/log/*</code> — app có thể crash nếu file log biến mất. Dùng <code>truncate -s 0</code> thay vì xoá (giữ file handle)</li><li>Xoá file trong <code>/tmp</code> mà chưa kiểm tra cái gì đang dùng</li><li>Xoá bất cứ gì trong <code>/usr</code> hoặc <code>/lib</code></li></ul>',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Phòng ngừa',
              html: 'Thiết lập log rotation: config trong <code>/etc/logrotate.d/</code>. Thêm cảnh báo khi disk đạt 80%. Dùng <code>docker system prune</code> trong cron hàng tuần.',
            },
          ],
        },
        {
          id: 'ssl-renewal-fail',
          title: 'Q: SSL cert hết hạn — site báo "Not Secure"',
          subtitle: 'Phục hồi SSL khẩn cấp và phòng ngừa',
          icon: '🔐',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> User báo lỗi "Your connection is not private". SSL cert hết hạn đêm qua. Sửa ngay sao?',
            },
            {
              type: 'text',
              html: '<strong>Trả lời:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Sửa SSL certificate hết hạn',
              code: `# 1. Kiểm tra trạng thái certificate
sudo certbot certificates

# 2. Gia hạn cưỡng bức
sudo certbot renew --force-renewal

# 3. Nếu gia hạn thất bại, kiểm tra
# Thường gặp: port 80 bị chặn bởi UFW hoặc Nginx
sudo ufw status                     # phải allow 80
sudo ss -tlnp | grep ':80'         # phải là Nginx

# 4. Reload Nginx để dùng cert mới
sudo nginx -t && sudo systemctl reload nginx

# 5. Kiểm tra
curl -vI https://your-domain.com 2>&1 | grep "expire date"`,
            },
            {
              type: 'text',
              html: '<strong>Tại sao auto-renewal thất bại:</strong>',
            },
            {
              type: 'table',
              caption: 'Nguyên nhân SSL renewal thất bại',
              headers: ['Nguyên nhân', 'Cách fix'],
              rows: [
                ['Port 80 bị chặn', 'Đảm bảo <code>sudo ufw allow 80</code> và Nginx listen trên port 80'],
                ['Certbot timer không chạy', '<code>sudo systemctl enable certbot.timer && sudo systemctl start certbot.timer</code>'],
                ['DNS đã thay đổi', 'Domain phải vẫn trỏ tới IP server này'],
                ['Bị rate limit', "Let's Encrypt giới hạn 5 certs/domain/tuần. Chờ hoặc dùng staging"],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Phòng ngừa',
              html: 'Test auto-renewal: <code>sudo certbot renew --dry-run</code>. Thiết lập monitoring kiểm tra SSL expiry hàng tuần. Hầu hết cert gia hạn trước 30 ngày.',
            },
          ],
        },
        {
          id: 'memory-leak',
          title: 'Q: Node.js app bộ nhớ tăng liên tục — chẩn đoán sao?',
          subtitle: 'Điều tra memory leak trong production',
          icon: '🧠',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> PM2 hiển thị app dùng 500MB RAM và tăng dần. Ban đầu chỉ 80MB. Sau vài ngày bị OOM killed. Bạn làm gì?',
            },
            {
              type: 'text',
              html: '<strong>Trả lời — Xử lý tức thì + điều tra:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Hành động tức thì',
              code: `# 1. Set PM2 auto-restart threshold (mua thời gian)
pm2 start app.js --max-memory-restart 300M

# 2. Theo dõi memory
pm2 monit   # real-time
watch -n 5 'pm2 jlist | jq ".[0].monit"'   # mỗi 5 giây

# 3. Kiểm tra nguyên nhân phổ biến
# - Global arrays/maps không bao giờ được clear
# - Event listeners thêm trong loop mà không removeListener
# - Database connections không đóng
# - Object lớn cache trong memory không có TTL`,
            },
            {
              type: 'text',
              html: '<strong>Các pattern memory leak phổ biến trong Node.js:</strong>',
            },
            {
              type: 'table',
              caption: 'Memory Leak Patterns',
              headers: ['Pattern', 'Ví dụ', 'Fix'],
              rows: [
                [
                  'Global cache không giới hạn',
                  '<code>const cache = {}; cache[key] = data;</code>',
                  'Dùng LRU cache có max size: <code>new Map()</code> với eviction hoặc package <code>lru-cache</code>',
                ],
                [
                  'Event listener leak',
                  'Thêm listeners trong request handler mà không cleanup',
                  'Luôn <code>removeListener</code> hoặc dùng <code>once()</code> thay vì <code>on()</code>',
                ],
                [
                  'Closure giữ references',
                  'Closures capture object lớn mà đã hết cần thiết',
                  'Set references về <code>null</code> khi xong. Tránh closure trên dataset lớn.',
                ],
                [
                  'Streams không xử lý',
                  'Readable streams không được consume hoặc destroy',
                  'Luôn gọi <code>stream.destroy()</code> khi lỗi. Dùng pipeline() thay vì pipe()',
                ],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Chẩn đoán nhanh',
              html: 'Thêm <code>process.memoryUsage()</code> vào endpoint /health. Theo dõi <code>heapUsed</code> theo thời gian. Nếu chỉ tăng và không giảm sau GC, bạn có leak.',
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
          title: 'Q: Container restart liên tục (CrashLoopBackOff) — debug sao?',
          subtitle: 'Khi không thể exec vào container',
          icon: '🔁',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> Docker container khởi động rồi thoát ngay. Không thể <code>docker exec</code> vì container không chạy. Debug sao?',
            },
            {
              type: 'text',
              html: '<strong>Trả lời:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Debug container bị crash',
              code: `# 1. Kiểm tra exit code và logs
docker logs container-name --tail 50
docker inspect container-name --format='{{.State.ExitCode}}'
# Exit code 137 = OOM killed, 1 = app error, 139 = segfault

# 2. Override entrypoint để lấy shell
docker run -it --entrypoint /bin/sh your-image:tag

# 3. Nếu không có shell (distroless image)
docker run -it --entrypoint /bin/sh alpine  # kiểm tra nếu là lỗi image
docker cp container-name:/app/logs ./local-logs  # copy logs từ container chết

# 4. Kiểm tra resource limits
docker stats  # container có đang chạm memory limit?`,
            },
            {
              type: 'table',
              caption: 'Exit Codes phổ biến',
              headers: ['Exit Code', 'Ý nghĩa', 'Nguyên nhân thường gặp'],
              rows: [
                ['0', 'Thành công (nhưng đã thoát)', 'Không có CMD hoặc CMD kết thúc ngay'],
                ['1', 'Lỗi ứng dụng', 'Exception chưa xử lý, thiếu env vars, thiếu files'],
                ['137', 'OOM Killed (SIGKILL)', 'Container memory limit quá thấp'],
                ['139', 'Segmentation fault', 'Binary lỗi hoặc native module issue'],
                ['126', 'Permission denied', 'Entrypoint/CMD không có quyền chạy'],
                ['127', 'Command not found', 'Sai đường dẫn CMD hoặc binary chưa cài'],
              ],
            },
          ],
        },
        {
          id: 'docker-image-size',
          title: 'Q: Docker image 2GB — tối ưu sao?',
          subtitle: 'Multi-stage builds và tối ưu layers',
          icon: '📦',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> Docker image Node.js nặng 2GB. Push ECR mất 10 phút. Deployment chậm. Làm sao giảm size?',
            },
            {
              type: 'compare',
              left: {
                title: '❌ Tệ: image 2GB',
                blocks: [
                  {
                    type: 'code',
                    lang: 'dockerfile',
                    code: `FROM node:20
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "dist/main.js"]

# Vấn đề: bao gồm dev dependencies,
# build tools, full OS, source code`,
                  },
                ],
              },
              right: {
                title: '✅ Tốt: image ~150MB',
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
                  title: 'Dùng Alpine base',
                  description: 'node:20-alpine ~50MB vs node:20 ~1GB. OS tối thiểu với đúng thứ cần.',
                },
                {
                  icon: '🏗️',
                  title: 'Multi-stage build',
                  description: 'Build ở stage 1, copy chỉ output sang stage 2. Dev dependencies ở lại builder.',
                },
                {
                  icon: '📋',
                  title: '.dockerignore',
                  description: 'Loại trừ node_modules, .git, tests, docs khỏi build context. Tăng tốc COPY.',
                },
                {
                  icon: '🧹',
                  title: 'npm ci --omit=dev',
                  description: 'Ở stage cuối, chỉ cài production dependencies. Tiết kiệm 50-70% node_modules.',
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
          title: 'Q: Server bị traffic bất thường — làm gì?',
          subtitle: 'Rate limiting và chống DDoS cơ bản',
          icon: '🛡️',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Tình huống:</strong> CPU server tăng vọt 100%, access logs hiển thị hàng nghìn request/giây từ nhiều IP. Bạn làm gì?',
            },
            {
              type: 'text',
              html: '<strong>Trả lời — Hành động tức thì:</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Xác định và chặn traffic bất thường',
              code: `# 1. Xác định top IPs truy cập server
awk '{print $1}' /var/log/nginx/access.log | sort | uniq -c | sort -rn | head -20

# 2. Chặn IP cụ thể bằng UFW
sudo ufw deny from 1.2.3.4

# 3. Thêm rate limiting trong Nginx
# Trong http block:
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

# Trong server/location block:
limit_req zone=api burst=20 nodelay;
limit_req_status 429;`,
            },
            {
              type: 'text',
              html: '<strong>Giải pháp dài hạn:</strong>',
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '☁️',
                  title: 'Cloudflare',
                  description: 'Đặt Cloudflare trước server. Free tier bao gồm DDoS protection và CDN.',
                },
                {
                  icon: '🚦',
                  title: 'Rate limiting',
                  description: 'Nginx limit_req_zone cho L7 protection. Rate limit API endpoints ở 10-50 req/s mỗi IP.',
                },
                {
                  icon: '🔥',
                  title: 'AWS WAF / Security Groups',
                  description: 'WAF rules để chặn patterns. Security groups để giới hạn truy cập theo IP range.',
                },
              ],
            },
          ],
        },
        {
          id: 'env-vars-leaked',
          title: 'Q: Ai đó commit .env lên git — phục hồi sao?',
          subtitle: 'Incident response khi lộ secret',
          icon: '🚨',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'Đây là sự cố bảo mật nghiêm trọng',
              html: 'Ngay cả khi xoá file trong commit mới, secrets vẫn <strong>nằm trong git history</strong>. Bất kỳ ai clone repo đều có chúng.',
            },
            {
              type: 'text',
              html: '<strong>Trả lời — Thứ tự incident response:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>Bước 1 (0-5 phút):</strong> Rotate TẤT CẢ secrets bị lộ ngay — database passwords, API keys, AWS credentials. Không chờ đợi.',
                '<strong>Bước 2:</strong> Cập nhật môi trường deploy với secrets mới',
                '<strong>Bước 3:</strong> Xoá khỏi git history: <code>git filter-repo --path .env --invert-paths</code> hoặc dùng BFG Repo-Cleaner',
                '<strong>Bước 4:</strong> Force push: <code>git push --force-with-lease</code> — tất cả team phải re-clone',
                '<strong>Bước 5:</strong> Kiểm tra logs xem secrets có bị truy cập bởi bên không được phép không',
                '<strong>Bước 6:</strong> Thêm <code>.env</code> vào <code>.gitignore</code> và thiết lập pre-commit hooks để phòng ngừa',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Key insight cho phỏng vấn',
              html: '<strong>Rotate secrets QUAN TRỌNG HƠN dọn git history.</strong> Ngay khi secrets nằm trong public repo, coi như đã bị compromised. GitHub scan repos và bots scrape secrets trong vài phút.',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'Phòng ngừa — pre-commit hook',
              code: `# .git/hooks/pre-commit
#!/bin/bash
if git diff --cached --name-only | grep -qE '\.env$|\.env\..+$'; then
    echo "LỖI: Đang commit file .env!"
    echo "Gỡ bỏ: git reset HEAD .env"
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
