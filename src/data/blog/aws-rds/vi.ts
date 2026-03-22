import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'aws-rds',
  title: 'AWS RDS Free Tier Setup',
  description:
    'Thiết lập PostgreSQL trên AWS RDS Free Tier cho development — từ tạo đến kết nối',
  icon: '🗄️',
  chapters: [
    {
      id: 'chapter1',
      title: 'Tổng quan & Chuẩn bị',
      sections: [
        {
          id: 'overview',
          title: 'Tổng quan',
          subtitle: 'RDS Free Tier là gì và bạn được gì',
          icon: '📋',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'AWS RDS Free Tier',
              html: 'Amazon RDS (Relational Database Service) Free Tier cho bạn <strong>750 giờ/tháng</strong> database được quản lý trong <strong>12 tháng</strong> sau khi tạo tài khoản. Hoàn hảo cho development và học tập.',
            },
            {
              type: 'text',
              html: '<strong>Free Tier bao gồm:</strong>',
            },
            {
              type: 'table',
              caption: 'Giới hạn RDS Free Tier',
              headers: ['Tài nguyên', 'Giới hạn Free Tier'],
              rows: [
                ['Instance', '<code>db.t3.micro</code> hoặc <code>db.t4g.micro</code>'],
                ['Giờ sử dụng', '750 giờ/tháng (đủ cho 1 instance chạy 24/7)'],
                ['Lưu trữ', '20 GB General Purpose SSD (gp2)'],
                ['Backup', '20 GB lưu trữ backup tự động'],
                ['Thời hạn', '12 tháng kể từ khi tạo tài khoản'],
              ],
            },
            {
              type: 'text',
              html: '<strong>Database được hỗ trợ (Free Tier):</strong>',
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '🐘',
                  title: 'PostgreSQL',
                  description: 'Khuyên dùng — mạnh mẽ, chuẩn SQL, hệ sinh thái tốt',
                },
                {
                  icon: '🐬',
                  title: 'MySQL',
                  description: 'Phổ biến nhất — cộng đồng lớn, tooling trưởng thành',
                },
                {
                  icon: '🦭',
                  title: 'MariaDB',
                  description: 'Fork từ MySQL — do cộng đồng phát triển, tương thích hoàn toàn',
                },
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Cảnh báo chi phí',
              html: '<ul><li>Multi-AZ deployment <strong>KHÔNG miễn phí</strong> — luôn chọn Single-AZ</li><li>Storage auto-scaling có thể vượt 20 GB — <strong>tắt nó đi</strong></li><li>Sau 12 tháng, db.t3.micro tốn ~$13-15/tháng</li><li><strong>Xoá tài nguyên khi không dùng để tránh phí</strong></li></ul>',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Yêu cầu',
              html: '<ul><li>AWS Account (đã đăng ký thẻ tín dụng)</li><li>Region: <code>ap-southeast-1</code> (Singapore) — hoặc region bạn muốn</li><li>Thời gian: ~15-20 phút</li></ul>',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Tạo RDS Instance',
      sections: [
        {
          id: 'step1-create',
          title: 'Bước 1: Tạo RDS Database',
          subtitle: 'Khởi tạo PostgreSQL instance trên Free Tier',
          icon: '🗄️',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Đăng nhập AWS Console: https://console.aws.amazon.com',
                'Tìm kiếm "RDS" → chọn <strong>Amazon RDS</strong>',
                'Kiểm tra region ở góc phải trên = <strong>đúng region bạn chọn</strong>',
                'Click <strong>Create database</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Phương thức tạo database:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Chọn <strong>Standard create</strong> (kiểm soát nhiều hơn)',
                'Engine type: <strong>PostgreSQL</strong>',
                'Engine version: chọn bản mới nhất (ví dụ: PostgreSQL 16.x)',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'QUAN TRỌNG: Chọn Free Tier Template',
              html: 'Ở phần <strong>Templates</strong>, chọn <strong>Free tier</strong>. Điều này tự động set Single-AZ, db.t3.micro, và tắt các tính năng tốn tiền.',
            },
            {
              type: 'text',
              html: '<strong>Cài đặt:</strong>',
            },
            {
              type: 'table',
              caption: 'Cấu hình Instance',
              headers: ['Cài đặt', 'Giá trị'],
              rows: [
                ['DB instance identifier', '<code>dev-postgres</code> (hoặc tên bạn muốn)'],
                ['Master username', '<code>postgres</code> (mặc định)'],
                ['Credentials management', '<strong>Self managed</strong>'],
                ['Master password', 'Tạo mật khẩu mạnh và <strong>lưu lại ngay</strong>'],
              ],
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Lưu mật khẩu!',
              html: 'AWS sẽ KHÔNG hiển thị lại master password sau khi tạo. Lưu nó vào password manager hoặc nơi an toàn.',
            },
          ],
        },
        {
          id: 'step2-config',
          title: 'Bước 2: Cấu hình Instance',
          subtitle: 'Giữ trong giới hạn Free Tier',
          icon: '⚙️',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Cấu hình instance (tự động set bởi Free Tier template):</strong>',
            },
            {
              type: 'table',
              caption: 'Cài đặt Instance',
              headers: ['Cài đặt', 'Giá trị', 'Tại sao'],
              rows: [
                ['DB instance class', '<code>db.t3.micro</code>', 'Free Tier — 1 vCPU, 1 GB RAM'],
                ['Storage type', 'General Purpose SSD (gp2)', 'Free Tier bao gồm gp2'],
                ['Allocated storage', '<code>20</code> GB', 'Tối đa miễn phí'],
                ['Storage autoscaling', '<strong>Bỏ tick</strong> Enable', 'Tránh vượt 20 GB'],
                ['Multi-AZ', '<strong>Do not create</strong> standby', 'Multi-AZ KHÔNG miễn phí'],
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Tắt Storage Autoscaling',
              html: 'Storage autoscaling được bật mặc định. <strong>Bỏ tick "Enable storage autoscaling"</strong> để giữ trong giới hạn 20 GB miễn phí. Nếu storage vượt 20 GB, bạn sẽ bị tính phí.',
            },
          ],
        },
        {
          id: 'step3-connectivity',
          title: 'Bước 3: Cài đặt kết nối',
          subtitle: 'Truy cập mạng cho development',
          icon: '🌐',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Cấu hình kết nối:</strong>',
            },
            {
              type: 'table',
              caption: 'Cài đặt kết nối',
              headers: ['Cài đặt', 'Giá trị'],
              rows: [
                ['Compute resource', '<strong>Don\'t connect to an EC2 compute resource</strong>'],
                ['Network type', 'IPv4'],
                ['VPC', 'Default VPC'],
                ['DB subnet group', 'default'],
                ['Public access', '<strong>Yes</strong> (cho development — cho phép kết nối từ máy local)'],
                ['VPC security group', '<strong>Create new</strong>'],
                ['New VPC security group name', '<code>rds-dev-sg</code>'],
                ['Availability Zone', 'No preference'],
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Public Access = Yes',
              html: 'Chỉ dành cho <strong>development</strong>, set Public access = <strong>Yes</strong> để kết nối từ máy local. Production thì luôn set <strong>No</strong> và dùng VPC peering hoặc SSH tunneling.',
            },
            {
              type: 'text',
              html: '<strong>Xác thực database:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Chọn <strong>Password authentication</strong> (đơn giản nhất cho development)',
              ],
            },
          ],
        },
        {
          id: 'step4-additional',
          title: 'Bước 4: Cấu hình bổ sung',
          subtitle: 'Tên database, backup, và bảo trì',
          icon: '📝',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Mở rộng phần <strong>Additional configuration</strong>',
                'Initial database name: <code>devdb</code> (nếu để trống, không tạo database mặc định)',
                'DB parameter group: default',
                'Option group: default',
              ],
            },
            {
              type: 'text',
              html: '<strong>Cài đặt backup (tối ưu chi phí):</strong>',
            },
            {
              type: 'table',
              caption: 'Cấu hình Backup',
              headers: ['Cài đặt', 'Giá trị', 'Tại sao'],
              rows: [
                ['Automated backups', 'Enable (giữ mặc định)', 'Miễn phí tới 20 GB backup'],
                ['Backup retention', '<code>7</code> ngày', 'Mặc định, miễn phí trong 20 GB'],
                ['Backup window', 'No preference', 'AWS chọn thời gian ít traffic'],
              ],
            },
            {
              type: 'text',
              html: '<strong>Các cài đặt khác:</strong>',
            },
            {
              type: 'table',
              caption: 'Cài đặt bổ sung',
              headers: ['Cài đặt', 'Giá trị'],
              rows: [
                ['Encryption', 'Enable (mặc định, không tốn thêm)'],
                ['Performance Insights', '<strong>Bỏ tick</strong> (không Free Tier)'],
                ['Enhanced monitoring', '<strong>Disable</strong> (không Free Tier)'],
                ['Maintenance window', 'No preference'],
                ['Deletion protection', '<strong>Bỏ tick</strong> (cho dev — dễ xoá)'],
              ],
            },
            {
              type: 'step-list',
              items: [
                'Xem phần <strong>Estimated monthly costs</strong> — phải hiển thị <strong>Free tier</strong>',
                'Click <strong>Create database</strong>',
                'Đợi 5-10 phút để instance chuyển sang <strong>Available</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'RDS → Databases → <code>dev-postgres</code> hiển thị trạng thái <strong>Available</strong>. Ghi nhớ <strong>Endpoint</strong> URL — bạn sẽ cần nó để kết nối.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Bảo mật & Kết nối',
      sections: [
        {
          id: 'step5-security',
          title: 'Bước 5: Cấu hình Security Group',
          subtitle: 'Cho phép IP của bạn truy cập database',
          icon: '🔒',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: 'Security group mặc định chỉ cho phép truy cập từ trong VPC. Bạn cần thêm IP của mình để kết nối từ máy local.',
            },
            {
              type: 'step-list',
              items: [
                'Vào RDS → Databases → <code>dev-postgres</code>',
                'Ở tab <strong>Connectivity & security</strong>, click link security group (ví dụ: <code>rds-dev-sg</code>)',
                'Mở ra <strong>EC2 → Security Groups</strong>',
                'Chọn security group → tab <strong>Inbound rules</strong> → <strong>Edit inbound rules</strong>',
                'Add rule: Type: <strong>PostgreSQL</strong> | Port: <code>5432</code> | Source: <strong>My IP</strong>',
                'Click <strong>Save rules</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'IP động?',
              html: 'Nếu ISP thay đổi IP thường xuyên, bạn có thể dùng <strong>Anywhere-IPv4</strong> (0.0.0.0/0) khi development. Nhưng <strong>tuyệt đối không làm vậy trong production</strong> — nó expose database ra toàn bộ internet.',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Kết nối EC2 → RDS',
              html: 'Nếu kết nối từ EC2 instance trong cùng VPC, thêm rule: Type: <strong>PostgreSQL</strong> | Port: <code>5432</code> | Source: <strong>Security group của EC2 instance</strong>.',
            },
          ],
        },
        {
          id: 'step6-connect',
          title: 'Bước 6: Kết nối Database',
          subtitle: 'Từ terminal, GUI tools, và ứng dụng',
          icon: '🔌',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Lấy thông tin kết nối:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Vào RDS → Databases → <code>dev-postgres</code>',
                'Copy <strong>Endpoint</strong> (ví dụ: <code>dev-postgres.xxxxxxxxxxxx.ap-southeast-1.rds.amazonaws.com</code>)',
                'Port: <code>5432</code> (mặc định PostgreSQL)',
                'Database: <code>devdb</code> (tên database ban đầu)',
                'Username: <code>postgres</code>',
                'Password: mật khẩu bạn đặt ở Bước 1',
              ],
            },
            {
              type: 'text',
              html: '<strong>Cách 1: Kết nối bằng psql (terminal):</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'psql connection',
              code: `# Cài psql nếu chưa có
# macOS: brew install postgresql
# Ubuntu: sudo apt install postgresql-client

# Kết nối tới RDS
psql -h dev-postgres.xxxxxxxxxxxx.ap-southeast-1.rds.amazonaws.com \\
     -p 5432 \\
     -U postgres \\
     -d devdb

# Bạn sẽ được yêu cầu nhập mật khẩu`,
            },
            {
              type: 'text',
              html: '<strong>Cách 2: Connection string (cho ứng dụng):</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: '.env',
              code: `# Định dạng connection string PostgreSQL
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@dev-postgres.xxxxxxxxxxxx.ap-southeast-1.rds.amazonaws.com:5432/devdb

# Với SSL (khuyên dùng)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@dev-postgres.xxxxxxxxxxxx.ap-southeast-1.rds.amazonaws.com:5432/devdb?sslmode=require`,
            },
            {
              type: 'text',
              html: '<strong>Cách 3: GUI tools (DBeaver, pgAdmin, TablePlus):</strong>',
            },
            {
              type: 'table',
              caption: 'Cài đặt kết nối cho GUI Tools',
              headers: ['Trường', 'Giá trị'],
              rows: [
                ['Host', '<code>dev-postgres.xxxxxxxxxxxx.ap-southeast-1.rds.amazonaws.com</code>'],
                ['Port', '<code>5432</code>'],
                ['Database', '<code>devdb</code>'],
                ['Username', '<code>postgres</code>'],
                ['Password', 'Mật khẩu master của bạn'],
                ['SSL', 'Require (khuyên dùng)'],
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra kết nối',
              html: 'Chạy <code>SELECT version();</code> — sẽ trả về phiên bản PostgreSQL. Nếu thấy kết quả, RDS đã được setup đúng!',
            },
          ],
        },
        {
          id: 'step7-app',
          title: 'Bước 7: Kết nối từ ứng dụng',
          subtitle: 'Ví dụ NestJS / Express với TypeORM',
          icon: '💻',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Node.js với pg (native driver):</strong>',
            },
            {
              type: 'code',
              lang: 'typescript',
              filename: 'db.ts',
              code: `import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST,     // RDS endpoint
  port: 5432,
  database: process.env.DB_NAME, // devdb
  user: process.env.DB_USER,     // postgres
  password: process.env.DB_PASS,
  ssl: { rejectUnauthorized: false },
});

// Test kết nối
const res = await pool.query('SELECT NOW()');
console.log('Connected:', res.rows[0].now);`,
            },
            {
              type: 'text',
              html: '<strong>Prisma ORM:</strong>',
            },
            {
              type: 'code',
              lang: 'prisma',
              filename: 'schema.prisma',
              code: `datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// DATABASE_URL=postgresql://postgres:PASSWORD@your-endpoint:5432/devdb?sslmode=require`,
            },
            {
              type: 'text',
              html: '<strong>TypeORM (NestJS):</strong>',
            },
            {
              type: 'code',
              lang: 'typescript',
              filename: 'app.module.ts',
              code: `TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
  autoLoadEntities: true,
  synchronize: true, // chỉ dùng cho dev — tuyệt đối không dùng production!
})`,
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Lưu ý SSL',
              html: '<code>rejectUnauthorized: false</code> chấp nhận được cho development. Cho production, tải <strong>AWS RDS CA certificate</strong> và set <code>ca</code> trong SSL options.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter4',
      title: 'Best Practices & Dọn dẹp',
      sections: [
        {
          id: 'best-practices',
          title: 'Best Practices cho Development',
          subtitle: 'Giữ miễn phí và an toàn',
          icon: '✨',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '💰',
                  title: 'Theo dõi chi phí',
                  description:
                    'Set up AWS Budgets cảnh báo ở mức $1. Vào AWS Budgets → Create budget → Monthly → $1 threshold → email notification.',
                },
                {
                  icon: '⏸️',
                  title: 'Dừng khi rảnh',
                  description:
                    'Dừng RDS instance khi không dùng. RDS → chọn instance → Actions → Stop temporarily. Nó tự khởi động lại sau 7 ngày.',
                },
                {
                  icon: '🔒',
                  title: 'Giới hạn IP',
                  description:
                    'Luôn dùng "My IP" trong security group. Đừng bao giờ mở 0.0.0.0/0 cho database port trong production.',
                },
                {
                  icon: '📊',
                  title: 'Kiểm tra Free Tier',
                  description:
                    'Vào AWS Billing → Free Tier dashboard để theo dõi usage vs limits. Kiểm tra hàng tuần.',
                },
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Stop vs Delete',
              html: '<strong>Stop temporarily:</strong> Instance tạm dừng, không tính phí compute, nhưng vẫn tính phí storage (miễn phí tới 20 GB). Tự khởi động lại sau 7 ngày.<br/><strong>Delete:</strong> Xoá vĩnh viễn instance và dữ liệu. Không tính phí gì cả. Chọn "No" cho final snapshot nếu không cần dữ liệu.',
            },
            {
              type: 'table',
              caption: 'Checklist Free Tier',
              headers: ['Cài đặt', 'Miễn phí', 'Tính phí'],
              rows: [
                ['Instance class', '<code>db.t3.micro</code> / <code>db.t4g.micro</code>', 'db.t3.small trở lên'],
                ['Storage', '≤ 20 GB gp2', '> 20 GB hoặc gp3/io1'],
                ['Multi-AZ', 'Single-AZ', 'Multi-AZ deployment'],
                ['Backup storage', '≤ 20 GB', '> 20 GB'],
                ['Data transfer', '1 GB/tháng outbound', '> 1 GB outbound'],
                ['Performance Insights', 'Disabled', 'Enabled'],
                ['Enhanced monitoring', 'Disabled', 'Enabled'],
              ],
            },
          ],
        },
        {
          id: 'cleanup',
          title: 'Dọn dẹp: Xoá RDS Instance',
          subtitle: 'Tránh phí phát sinh bất ngờ',
          icon: '🗑️',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'Quan trọng: Xoá khi xong',
              html: 'Nếu không cần database nữa, <strong>xoá nó</strong> để tránh phí sau khi Free Tier hết hạn. Instance đã stop vẫn tính phí storage và tự restart sau 7 ngày.',
            },
            {
              type: 'step-list',
              items: [
                'Vào <strong>RDS → Databases</strong>',
                'Chọn <code>dev-postgres</code>',
                'Click <strong>Actions → Delete</strong>',
                '<strong>Bỏ tick</strong> "Create final snapshot" (trừ khi cần backup)',
                '<strong>Tick</strong> "I acknowledge that upon instance deletion, automated backups will no longer be available"',
                'Gõ <code>delete me</code> để xác nhận',
                'Click <strong>Delete</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Dọn dẹp thêm:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Xoá security group: <strong>EC2 → Security Groups</strong> → tìm <code>rds-dev-sg</code> → Delete',
                'Kiểm tra manual snapshots: <strong>RDS → Snapshots</strong> → xoá nếu không cần',
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra dọn dẹp',
              html: '<ul><li>RDS → Databases: không có instance nào</li><li>RDS → Snapshots: không có manual snapshot</li><li>EC2 → Security Groups: <code>rds-dev-sg</code> đã xoá</li><li>AWS Billing dashboard: không có phí bất ngờ</li></ul>',
            },
          ],
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Các lỗi thường gặp và cách xử lý',
          icon: '🔧',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Không kết nối được: timeout</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Security group không cho phép IP của bạn, hoặc Public access đang set No.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: '<ol><li>Kiểm tra security group inbound rules — thêm IP cho port 5432</li><li>Kiểm tra RDS instance → Publicly accessible = Yes</li><li>Nếu IP đổi, cập nhật security group rule</li></ol>',
            },
            {
              type: 'text',
              html: '<strong>FATAL: password authentication failed</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Sai mật khẩu hoặc username.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Reset password: RDS → chọn instance → <strong>Modify</strong> → đặt master password mới → <strong>Apply immediately</strong>. Đợi 1-2 phút.',
            },
            {
              type: 'text',
              html: '<strong>FATAL: database "devdb" does not exist</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Bạn để trống "Initial database name" khi tạo.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Kết nối vào database <code>postgres</code> mặc định trước, rồi chạy: <code>CREATE DATABASE devdb;</code>',
            },
            {
              type: 'text',
              html: '<strong>Phí phát sinh bất ngờ</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Storage autoscaling vượt 20 GB, hoặc Multi-AZ bị bật nhầm, hoặc Free Tier đã hết hạn.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: '<ol><li>Kiểm tra AWS Billing → Bills xem chi tiết</li><li>Kiểm tra RDS instance settings cho Multi-AZ hoặc storage > 20 GB</li><li>Kiểm tra Free Tier dashboard xem ngày hết hạn</li><li>Xoá instance nếu không cần nữa</li></ol>',
            },
            {
              type: 'text',
              html: '<strong>Instance stuck ở "Starting" hoặc "Modifying"</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Các thao tác RDS có thể mất 5-15 phút. Một số thay đổi cần reboot.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Đợi 15 phút. Nếu vẫn stuck, kiểm tra <strong>Events</strong> trong RDS console xem lỗi. Có thể thử <strong>Actions → Reboot</strong>.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
