import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'docker',
  title: 'Docker Basics',
  description: 'Dockerfile, images, containers, multi-stage build và Docker Compose',
  icon: '🐳',
  chapters: [
    {
      id: 'chapter1',
      title: 'Giới thiệu Docker',
      sections: [
        {
          id: 'what-is-docker',
          title: 'Docker là gì?',
          subtitle: 'Container vs. máy ảo',
          icon: '🐳',
          iconColor: 'bg-sky-100',
          blocks: [
            {
              type: 'text',
              html: 'Docker là nền tảng đóng gói ứng dụng cùng toàn bộ dependency vào một <strong>container</strong> — đơn vị nhỏ gọn, portable, chạy nhất quán trên mọi môi trường.',
            },
            {
              type: 'compare',
              left: {
                title: 'Không dùng Docker',
                blocks: [
                  {
                    type: 'step-list',
                    items: [
                      '"Chạy được trên máy tôi" — bug khó reproduce',
                      'Khác OS gây ra lỗi khó lường',
                      'Cài dependency thủ công mỗi máy',
                      'Config môi trường phân tán',
                    ],
                  },
                ],
              },
              right: {
                title: 'Dùng Docker',
                blocks: [
                  {
                    type: 'step-list',
                    items: [
                      'Container chạy giống hệt trên mọi máy',
                      'Dependency được bundle vào image',
                      'Build reproducible 100%',
                      'Một lệnh khởi động toàn bộ services',
                    ],
                  },
                ],
              },
            },
            {
              type: 'feature-grid',
              items: [
                { icon: '📦', title: 'Image', description: 'Snapshot read-only của app + dependency. Bản thiết kế để tạo container.' },
                { icon: '🚀', title: 'Container', description: 'Instance đang chạy của một image. Tiến trình độc lập, ephemeral.' },
                { icon: '🏗', title: 'Dockerfile', description: 'Tập lệnh để build image theo từng bước.' },
                { icon: '📚', title: 'Registry', description: 'Kho lưu images. Docker Hub, ECR, GCR, v.v.' },
                { icon: '🎭', title: 'Volume', description: 'Lưu trữ bền vững, tồn tại sau khi container dừng.' },
                { icon: '🌐', title: 'Network', description: 'Mạng ảo kết nối các containers với nhau.' },
              ],
            },
          ],
        },
        {
          id: 'install-docker',
          title: 'Cài đặt Docker',
          subtitle: 'Cài Docker Desktop trên máy local',
          icon: '⚙️',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Docker Desktop',
              html: 'Cài <strong>Docker Desktop</strong> — bao gồm Docker Engine, CLI, Compose và BuildKit. Hỗ trợ macOS, Windows và Linux.',
            },
            {
              type: 'table',
              caption: 'Cách cài theo nền tảng',
              headers: ['Nền tảng', 'Cách cài', 'Ghi chú'],
              rows: [
                ['macOS', 'docker.com/get-started → Tải .dmg', 'Hỗ trợ cả ARM và Intel'],
                ['Windows', 'docker.com/get-started → Tải .exe', 'Cần bật WSL2 trước'],
                ['Ubuntu/Debian', 'apt-get install docker.io', 'Hoặc dùng script cài chính thức'],
              ],
            },
            {
              type: 'text',
              html: 'Kiểm tra sau khi cài:',
            },
            {
              type: 'code',
              lang: 'bash',
              code: 'docker --version\n# Docker version 27.x.x\n\ndocker run hello-world\n# Hello from Docker!',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Viết Dockerfile',
      sections: [
        {
          id: 'dockerfile-basics',
          title: 'Dockerfile cơ bản',
          subtitle: 'Từng layer một — cách build image',
          icon: '📝',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'text',
              html: 'Dockerfile là file text chứa các lệnh tuần tự. Mỗi lệnh tạo ra một <strong>layer</strong> trong image. Các layer được cache — layer không thay đổi sẽ được tái sử dụng trong lần build tiếp theo.',
            },
            {
              type: 'code',
              lang: 'dockerfile',
              filename: 'Dockerfile',
              code: `# Base image — luôn dùng image chính thức
FROM node:20-alpine

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Copy package files trước (để tận dụng layer cache)
COPY package*.json ./

# Cài dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build app
RUN npm run build

# Khai báo port (chỉ mang tính tài liệu)
EXPOSE 3000

# Lệnh chạy khi container khởi động
CMD ["node", "dist/index.js"]`,
            },
            {
              type: 'table',
              caption: 'Các lệnh Dockerfile thường dùng',
              headers: ['Lệnh', 'Mục đích', 'Ví dụ'],
              rows: [
                ['FROM', 'Base image để build', 'FROM node:20-alpine'],
                ['WORKDIR', 'Đặt thư mục làm việc', 'WORKDIR /app'],
                ['COPY', 'Copy file từ host vào image', 'COPY . .'],
                ['RUN', 'Chạy lệnh lúc build', 'RUN npm install'],
                ['ENV', 'Đặt biến môi trường', 'ENV NODE_ENV=production'],
                ['EXPOSE', 'Khai báo port sử dụng', 'EXPOSE 3000'],
                ['CMD', 'Lệnh mặc định khi chạy', 'CMD ["node", "index.js"]'],
                ['ENTRYPOINT', 'Lệnh cố định (args được append)', 'ENTRYPOINT ["node"]'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Mẹo Layer Cache',
              html: 'Copy <code>package.json</code> và chạy <code>npm install</code> <strong>trước khi</strong> copy source code. Layer install sẽ được cache và chỉ bị invalidate khi dependencies thay đổi — không phải mỗi lần sửa code.',
            },
          ],
        },
        {
          id: 'multi-stage-build',
          title: 'Multi-Stage Build',
          subtitle: 'Giữ image production nhỏ gọn',
          icon: '🏗',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'text',
              html: 'Multi-stage build dùng một stage để build (với đầy đủ dev tools) và stage khác để chạy (chỉ có những gì cần thiết). Image cuối cùng nhỏ hơn rất nhiều.',
            },
            {
              type: 'code',
              lang: 'dockerfile',
              filename: 'Dockerfile',
              code: `# ── Stage 1: Build ────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Production ───────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Chỉ copy những gì cần từ build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Chạy với non-root user để bảo mật
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "dist/index.js"]`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'So sánh kích thước',
              html: 'App Node.js thông thường: <strong>single stage ~800MB</strong>, multi-stage <strong>~120MB</strong>. Image nhỏ hơn = deploy nhanh hơn, ít attack surface, chi phí registry thấp hơn.',
            },
          ],
        },
        {
          id: 'dockerignore',
          title: '.dockerignore',
          subtitle: 'Loại trừ file khỏi build context',
          icon: '🚫',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: 'File <code>.dockerignore</code> hoạt động như <code>.gitignore</code> — ngăn các file không cần thiết được gửi vào Docker build context. Luôn tạo file này để build nhanh hơn và image sạch hơn.',
            },
            {
              type: 'code',
              lang: 'text',
              filename: '.dockerignore',
              code: `node_modules
.git
.env
.env.*
dist
coverage
*.log
.DS_Store
README.md
docs/`,
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Chạy Containers',
      sections: [
        {
          id: 'build-run',
          title: 'Lệnh Build & Run',
          subtitle: 'Các lệnh Docker CLI cần thiết',
          icon: '▶️',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Build image từ Dockerfile trong thư mục hiện tại
docker build -t my-app:latest .

# Chạy container từ image
docker run -p 3000:3000 my-app:latest

# Chạy ở chế độ detached (nền)
docker run -d -p 3000:3000 --name my-container my-app:latest

# Truyền biến môi trường
docker run -d -p 3000:3000 \\
  -e DATABASE_URL=postgres://... \\
  -e NODE_ENV=production \\
  my-app:latest

# Xem containers đang chạy
docker ps

# Xem logs
docker logs my-container
docker logs -f my-container  # theo dõi logs realtime

# Dừng và xóa container
docker stop my-container
docker rm my-container`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Sau khi chạy <code>docker run -d -p 3000:3000 --name my-container my-app:latest</code>, xác nhận container đang hoạt động:<br><br><code>docker ps</code><br><br>Kết quả mong đợi:<pre>CONTAINER ID   IMAGE            STATUS         PORTS\nabc123...      my-app:latest    Up 5 seconds   0.0.0.0:3000-&gt;3000/tcp</pre>Truy cập <code>http://localhost:3000</code> trên trình duyệt, hoặc kiểm tra logs bằng <code>docker logs my-container</code>.',
            },
            {
              type: 'table',
              caption: 'Các flag hay dùng với docker run',
              headers: ['Flag', 'Ý nghĩa', 'Ví dụ'],
              rows: [
                ['-p host:container', 'Publish port', '-p 8080:3000'],
                ['-d', 'Detached (chạy nền)', '-d'],
                ['--name', 'Đặt tên container', '--name api'],
                ['-e KEY=VALUE', 'Đặt env variable', '-e NODE_ENV=prod'],
                ['-v host:container', 'Mount volume', '-v ./data:/app/data'],
                ['--rm', 'Tự xóa khi dừng', '--rm'],
                ['-it', 'Interactive TTY', '-it (để vào shell)'],
              ],
            },
          ],
        },
        {
          id: 'docker-compose',
          title: 'Docker Compose',
          subtitle: 'Điều phối nhiều containers khi dev local',
          icon: '🎭',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'text',
              html: 'Docker Compose định nghĩa và chạy ứng dụng nhiều container qua file YAML. Lý tưởng cho môi trường dev local với web server, database và cache cùng chạy.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: 'docker-compose.yml',
              code: `version: '3.9'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://postgres:password@db:5432/myapp
      - REDIS_URL=redis://cache:6379
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
      - cache
    command: npm run dev

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  cache:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:`,
            },
            {
              type: 'code',
              lang: 'bash',
              code: `# Khởi động tất cả services
docker compose up

# Chạy nền
docker compose up -d

# Xem logs tất cả services
docker compose logs -f

# Dừng tất cả services
docker compose down

# Dừng và xóa volumes (reset database)
docker compose down -v

# Rebuild images và khởi động
docker compose up --build`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Sau khi chạy <code>docker compose up -d</code>, kiểm tra tất cả services đang hoạt động:<br><br><code>docker compose ps</code><br><br>Kết quả mong đợi — tất cả services hiển thị trạng thái <strong>Up</strong>:<pre>NAME         STATUS\nmy-app-api   Up\nmy-app-db    Up\nmy-app-cache Up</pre>Xem logs tổng hợp bằng <code>docker compose logs -f</code>.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Hot Reload với Volumes',
              html: 'Mount <code>volumes: - .:/app</code> đồng bộ code local vào container realtime. Kết hợp với <code>npm run dev</code>, bạn có hot reload mà không cần rebuild image.',
            },
          ],
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Các lỗi Docker thường gặp và cách xử lý',
          icon: '🔧',
          iconColor: 'bg-rose-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Container thoát ngay lập tức</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Thiếu lệnh <code>CMD</code> trong Dockerfile hoặc lỗi entrypoint script — container không có gì để chạy và thoát với code 0 hoặc khác 0.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Kiểm tra Dockerfile có <code>CMD</code> hoặc <code>ENTRYPOINT</code> hợp lệ. Xem log thoát bằng <code>docker logs &lt;container&gt;</code> hoặc chạy thử ở chế độ interactive: <code>docker run -it my-app:latest /bin/sh</code>.',
            },
            {
              type: 'text',
              html: '<strong>Port đã được sử dụng</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Một tiến trình khác (hoặc container khác) đang chiếm host port bạn muốn publish.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Tìm tiến trình đang chiếm port bằng <code>lsof -i :PORT</code> (vd: <code>lsof -i :3000</code>) và dừng nó, hoặc đổi port mapping trong <code>docker run -p</code> hoặc <code>docker-compose.yml</code>.',
            },
            {
              type: 'text',
              html: '<strong>Permission denied khi mount volume</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Sai owner file — user tiến trình trong container không sở hữu thư mục được mount từ host, dẫn đến lỗi read/write.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Chạy container với user của host bằng <code>--user $(id -u):$(id -g)</code>, hoặc thêm <code>RUN chown -R appuser /app</code> vào Dockerfile để đặt ownership bên trong image.',
            },
            {
              type: 'text',
              html: '<strong>Build image thất bại: COPY không tìm thấy file</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'File bị loại bởi <code>.dockerignore</code>, không tồn tại ở đường dẫn đã chỉ định, hoặc đường dẫn tính từ sai thư mục.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Kiểm tra file tồn tại và không bị liệt kê trong <code>.dockerignore</code>. Đảm bảo đường dẫn COPY source là tương đối so với build context (thư mục truyền vào <code>docker build</code>).',
            },
            {
              type: 'text',
              html: '<strong>Không kết nối được giữa các containers</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Các containers đang ở trên những Docker network khác nhau — mặc định, các container chạy bằng <code>docker run</code> riêng lẻ bị cô lập và không thể kết nối với nhau bằng tên.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Dùng Docker Compose (tự tạo shared network) hoặc tạo network thủ công: <code>docker network create my-net</code> và truyền <code>--network my-net</code> vào mỗi lệnh <code>docker run</code>.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
