import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'linux-server-setup',
  title: 'Linux Server Setup',
  description: 'Cài đặt Ubuntu server: SSH, firewall, Nginx, SSL và bảo mật cơ bản',
  icon: '🖥',
  chapters: [
    {
      id: 'chapter1',
      title: 'Đăng nhập đầu tiên & Bảo mật',
      sections: [
        {
          id: 'initial-access',
          title: 'Truy cập server lần đầu',
          subtitle: 'Kết nối, tạo sudo user, tắt đăng nhập root',
          icon: '🔑',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'warn',
              title: 'Không bao giờ chạy bằng root',
              html: 'Đăng nhập bằng <code>root</code> rất nguy hiểm. Tạo user không phải root với quyền sudo ngay sau khi đăng nhập lần đầu.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Kết nối đến server mới
ssh root@YOUR_SERVER_IP

# Tạo user mới
adduser deploy

# Cấp quyền sudo
usermod -aG sudo deploy

# Copy SSH keys sang user mới
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Thử đăng nhập bằng user mới (trong terminal mới)
ssh deploy@YOUR_SERVER_IP

# Kiểm tra sudo hoạt động
sudo whoami
# root`,
            },
            {
              type: 'text',
              html: 'Bây giờ tắt đăng nhập SSH bằng root:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `sudo nano /etc/ssh/sshd_config

# Thay đổi các giá trị này:
# PermitRootLogin no
# PasswordAuthentication no
# PubkeyAuthentication yes

sudo systemctl restart sshd`,
            },
          ],
        },
        {
          id: 'system-update',
          title: 'Cập nhật hệ thống',
          subtitle: 'Luôn update trước khi cài bất cứ thứ gì',
          icon: '🔄',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Cập nhật package index và nâng cấp tất cả packages
sudo apt update && sudo apt upgrade -y

# Cài các tools cần thiết
sudo apt install -y \\
  curl wget git unzip \\
  build-essential \\
  software-properties-common \\
  htop ncdu \\
  fail2ban

# Đặt múi giờ
sudo timedatectl set-timezone Asia/Ho_Chi_Minh
timedatectl status`,
            },
          ],
        },
        {
          id: 'firewall-setup',
          title: 'Cấu hình UFW Firewall',
          subtitle: 'Chặn tất cả port trừ những port cần thiết',
          icon: '🔥',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>UFW</strong> (Uncomplicated Firewall) là firewall manager chuẩn trên Ubuntu. Mặc định: từ chối tất cả inbound, cho phép tất cả outbound.',
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Cho phép SSH trước (quan trọng — làm trước khi bật firewall!)
sudo ufw allow OpenSSH

# Cho phép HTTP và HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Nếu chạy backend API trên port tùy chỉnh
sudo ufw allow 3000/tcp

# Bật firewall
sudo ufw enable

# Kiểm tra trạng thái
sudo ufw status verbose`,
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cho phép SSH trước khi bật!',
              html: 'Nếu bật UFW mà chưa cho phép port 22 (SSH), bạn sẽ bị khóa khỏi server vĩnh viễn. Chạy <code>sudo ufw allow OpenSSH</code> trước.',
            },
            {
              type: 'table',
              caption: 'Các lệnh UFW thường dùng',
              headers: ['Lệnh', 'Ý nghĩa'],
              rows: [
                ['ufw allow 22/tcp', 'Mở port 22 (SSH)'],
                ['ufw deny 3306/tcp', 'Chặn MySQL từ bên ngoài'],
                ['ufw allow from 10.0.0.0/24', 'Cho phép toàn bộ subnet'],
                ['ufw delete allow 3000/tcp', 'Xóa một rule'],
                ['ufw status numbered', 'Liệt kê rules có số thứ tự'],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Cài Nginx & SSL',
      sections: [
        {
          id: 'nginx-install',
          title: 'Cài đặt & Cấu hình Nginx',
          subtitle: 'Reverse proxy cho ứng dụng của bạn',
          icon: '🌐',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Cài Nginx
sudo apt install -y nginx

# Khởi động và bật tự khởi động
sudo systemctl start nginx
sudo systemctl enable nginx

# Kiểm tra trạng thái
sudo systemctl status nginx`,
            },
            {
              type: 'text',
              html: 'Tạo server block (virtual host) để proxy request đến app:',
            },
            {
              type: 'code',
              lang: 'nginx',
              filename: '/etc/nginx/sites-available/my-app',
              code: `server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Proxy request đến Node.js app
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

    # Serve static files trực tiếp (tùy chọn)
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
              code: `# Bật site
sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/

# Kiểm tra syntax config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx`,
            },
          ],
        },
        {
          id: 'ssl-certbot',
          title: 'SSL với Certbot',
          subtitle: 'Chứng chỉ HTTPS miễn phí từ Let\'s Encrypt',
          icon: '🔒',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Cài Certbot và plugin Nginx
sudo apt install -y certbot python3-certbot-nginx

# Lấy certificate (tự động cấu hình Nginx)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Test tự động gia hạn
sudo certbot renew --dry-run

# Kiểm tra timer gia hạn
sudo systemctl status certbot.timer`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Tự động gia hạn',
              html: 'Certbot cài systemd timer tự động gia hạn certificate trước khi hết hạn. Cert Let\'s Encrypt hết hạn sau 90 ngày — nhưng việc gia hạn hoàn toàn tự động.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Quản lý Process',
      sections: [
        {
          id: 'systemd-service',
          title: 'Chạy App như systemd Service',
          subtitle: 'Tự khởi động và tự restart ứng dụng',
          icon: '⚙️',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'text',
              html: 'Tạo <strong>systemd unit file</strong> để quản lý app như một system service. App sẽ tự khởi động khi server bật và tự restart khi bị crash.',
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
              code: `# Reload systemd và bật service
sudo systemctl daemon-reload
sudo systemctl enable my-app
sudo systemctl start my-app

# Kiểm tra trạng thái và logs
sudo systemctl status my-app
sudo journalctl -u my-app -f`,
            },
            {
              type: 'table',
              caption: 'Các lệnh systemctl thường dùng',
              headers: ['Lệnh', 'Tác dụng'],
              rows: [
                ['systemctl start my-app', 'Khởi động service'],
                ['systemctl stop my-app', 'Dừng service'],
                ['systemctl restart my-app', 'Khởi động lại service'],
                ['systemctl status my-app', 'Xem trạng thái + logs gần đây'],
                ['journalctl -u my-app -f', 'Xem logs realtime'],
                ['journalctl -u my-app --since "1 hour ago"', 'Logs từ 1 giờ trước'],
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
