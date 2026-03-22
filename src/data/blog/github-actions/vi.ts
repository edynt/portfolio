import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'github-actions',
  title: 'GitHub Actions CI/CD',
  description: 'Viết workflows, tự động hóa tests và deploy lên AWS bằng GitHub Actions',
  icon: '⚙️',
  chapters: [
    {
      id: 'chapter1',
      title: 'Giới thiệu',
      sections: [
        {
          id: 'what-is-gha',
          title: 'GitHub Actions là gì?',
          subtitle: 'Tự động hóa mọi thứ từ repository',
          icon: '⚙️',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'text',
              html: 'GitHub Actions là nền tảng CI/CD được tích hợp sẵn trong GitHub. Cho phép tự động hóa workflows khi có sự kiện xảy ra trong repository — như push code, mở PR, hay tạo release.',
            },
            {
              type: 'feature-grid',
              items: [
                { icon: '📁', title: 'Workflow', description: 'File YAML trong .github/workflows/ định nghĩa pipeline tự động hóa.' },
                { icon: '🎯', title: 'Event', description: 'Trigger: push, pull_request, schedule, workflow_dispatch, v.v.' },
                { icon: '💼', title: 'Job', description: 'Tập hợp các steps chạy trên cùng một máy runner.' },
                { icon: '🔧', title: 'Step', description: 'Từng lệnh hoặc action trong một job.' },
                { icon: '🏃', title: 'Runner', description: 'VM chạy các jobs. GitHub-hosted (ubuntu, windows, mac) hoặc self-hosted.' },
                { icon: '📦', title: 'Action', description: 'Đơn vị code có thể tái sử dụng. Lấy từ Marketplace hoặc tự viết.' },
              ],
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Free Tier',
              html: 'GitHub Actions miễn phí cho public repositories. Với private repos: <strong>2.000 phút/tháng miễn phí</strong> gói Free. Runner Ubuntu nhanh nhất và tiết kiệm chi phí nhất.',
            },
          ],
        },
        {
          id: 'first-workflow',
          title: 'Workflow đầu tiên',
          subtitle: 'Hello World với GitHub Actions',
          icon: '👋',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'text',
              html: 'Workflows nằm trong thư mục <code>.github/workflows/</code>. Bất kỳ file <code>.yml</code> nào ở đây sẽ được GitHub tự động nhận diện.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: '.github/workflows/hello.yml',
              code: `name: Hello World

# Trigger: chạy mỗi khi push lên main
on:
  push:
    branches: [main]

jobs:
  greet:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Say hello
        run: echo "Xin chào từ GitHub Actions!"

      - name: Hiển thị thông tin môi trường
        run: |
          echo "Branch: \${{ github.ref_name }}"
          echo "Commit: \${{ github.sha }}"
          echo "Actor: \${{ github.actor }}"`,
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Pipeline Build & Test',
      sections: [
        {
          id: 'nodejs-ci',
          title: 'Workflow CI cho Node.js',
          subtitle: 'Install, lint, test mỗi khi có PR',
          icon: '🧪',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'code',
              lang: 'yaml',
              filename: '.github/workflows/ci.yml',
              code: `name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run lint
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build`,
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Matrix Builds',
              html: 'Strategy <code>matrix</code> chạy job song song cho từng combination. Test trên Node 18 và 20 cùng lúc giúp phát hiện lỗi theo version trước khi lên production.',
            },
          ],
        },
        {
          id: 'secrets-env',
          title: 'Secrets & Biến môi trường',
          subtitle: 'Truyền credentials an toàn vào workflows',
          icon: '🔐',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Vào GitHub repository → Settings → Secrets and variables → Actions',
                'Click "New repository secret"',
                'Thêm secrets như AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, v.v.',
              ],
            },
            {
              type: 'code',
              lang: 'yaml',
              code: `jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Tham chiếu secrets với \${{ secrets.TEN_SECRET }}
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-1

      # Dùng env variables trong lệnh run
      - name: Deploy
        env:
          API_KEY: \${{ secrets.API_KEY }}
          ENVIRONMENT: production
        run: |
          echo "Deploying to $ENVIRONMENT"
          ./deploy.sh`,
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Không bao giờ hardcode secrets',
              html: 'Không đặt API keys, mật khẩu hay tokens trực tiếp trong file YAML workflow. Chúng sẽ nằm mãi trong git history. Luôn dùng <code>secrets</code> hoặc <code>vars</code>.',
            },
            {
              type: 'table',
              caption: 'Secrets vs Environment Variables vs vars',
              headers: ['Loại', 'Dùng cho', 'Hiển thị trong logs'],
              rows: [
                ['secrets.*', 'Giá trị nhạy cảm (API keys, mật khẩu)', 'Không — bị mask tự động'],
                ['vars.*', 'Config không nhạy cảm (region, tên app)', 'Có'],
                ['env:', 'Biến trong phạm vi workflow', 'Có'],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Deploy lên AWS',
      sections: [
        {
          id: 'deploy-backend-ecs',
          title: 'Deploy Backend lên ECS',
          subtitle: 'Build Docker image, push ECR, cập nhật ECS service',
          icon: '🚀',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: 'Workflow này chạy khi push lên <code>main</code>: build Docker image, push lên ECR, sau đó force deploy ECS để service lấy image mới.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: '.github/workflows/deploy-backend.yml',
              code: `name: Deploy Backend

on:
  push:
    branches: [main]
    paths:
      - 'backend/**'
      - '.github/workflows/deploy-backend.yml'

env:
  AWS_REGION: ap-southeast-1
  ECR_REPOSITORY: my-app-backend
  ECS_CLUSTER: my-app-cluster
  ECS_SERVICE: my-app-service

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build, tag, push Docker image lên ECR
        id: build-image
        env:
          ECR_REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG ./backend
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT

      - name: Force ECS deployment mới
        run: |
          aws ecs update-service \\
            --cluster \${{ env.ECS_CLUSTER }} \\
            --service \${{ env.ECS_SERVICE }} \\
            --force-new-deployment`,
            },
          ],
        },
        {
          id: 'deploy-frontend-s3',
          title: 'Deploy Frontend lên S3',
          subtitle: 'Build React/Next.js và sync lên S3 bucket',
          icon: '🌐',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'code',
              lang: 'yaml',
              filename: '.github/workflows/deploy-frontend.yml',
              code: `name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - 'frontend/**'
      - '.github/workflows/deploy-frontend.yml'

env:
  AWS_REGION: ap-southeast-1
  S3_BUCKET: my-app-frontend-bucket

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install và build
        working-directory: ./frontend
        env:
          NEXT_PUBLIC_API_URL: \${{ secrets.API_URL }}
        run: |
          npm ci
          npm run build

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Sync lên S3
        run: |
          aws s3 sync ./frontend/out s3://\${{ env.S3_BUCKET }} \\
            --delete \\
            --cache-control "public, max-age=31536000, immutable"`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Cache Headers',
              html: 'Flag <code>--cache-control</code> đặt browser cache dài hạn (1 năm) cho các tài nguyên có hash. Nếu dùng CloudFront, cần thêm bước invalidation sau khi sync.',
            },
          ],
        },
        {
          id: 'workflow-tips',
          title: 'Best Practices cho Workflow',
          subtitle: 'Các pattern giữ pipeline nhanh và tin cậy',
          icon: '💡',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                { icon: '⚡', title: 'Dùng path filters', description: 'Thêm filter paths: để workflow backend chỉ chạy khi code backend thay đổi.' },
                { icon: '💾', title: 'Cache dependencies', description: 'Dùng actions/cache hoặc cache: npm trong setup-node để bỏ qua reinstall.' },
                { icon: '🛡', title: 'Dùng environments', description: 'Tạo environments production/staging với protection rules và approval.' },
                { icon: '🏷', title: 'Pin action versions', description: 'Dùng @v4 thay @main để ổn định. Tốt hơn nữa: pin theo commit SHA.' },
                { icon: '🔄', title: 'Tái sử dụng với workflow_call', description: 'Trích xuất jobs chung thành reusable workflows để tránh lặp code.' },
                { icon: '⏰', title: 'Đặt job timeout', description: 'Thêm timeout-minutes: 10 cho jobs để tránh hóa đơn bị thổi phồng do process bị treo.' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
