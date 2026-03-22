import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'aws-setup',
  title: 'ECR + S3 for Frontend',
  description: 'ECR, ECS, S3 — deploy backend container & host frontend tĩnh trên AWS',
  icon: '☁️',
  chapters: [
    {
      id: 'chapter1',
      title: 'Chuẩn bị & Overview',
      sections: [
        {
          id: 'overview',
          title: 'Tổng quan',
          subtitle: 'Luồng deploy và các tài nguyên AWS',
          icon: '📋',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'warn',
              title: 'Cảnh báo chi phí',
              html: 'Hướng dẫn này sử dụng EC2 t3.micro (free tier 12 tháng đầu, 750 giờ/tháng). Sau free tier, EC2 tốn ~$8.5/tháng. <strong>Nhớ xoá tài nguyên khi không dùng.</strong>',
            },
            {
              type: 'text',
              html: '<strong>Bạn sẽ tạo các tài nguyên AWS sau:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'IAM User (cho GitHub Actions)',
                'ECR Repository (chứa Docker images)',
                'ECS Cluster + EC2 Instance (chạy container)',
                'ECS Task Definition (dùng JSON)',
                'ECS Service',
                'Security Group (mở port)',
                'S3 Bucket (chứa frontend)',
                'GitHub Secrets (kết nối GitHub → AWS)',
              ],
            },
            {
              type: 'text',
              html: '<strong>Luồng deploy:</strong><br/><strong>Backend:</strong> Push code → GitHub Actions build Docker → push ECR → update ECS<br/><strong>Frontend:</strong> Push code → GitHub Actions → build React → sync to S3',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Lưu ý quan trọng',
              html: '<ul><li><strong>Region:</strong> <code>ap-southeast-1</code> (Singapore) — hoặc region bạn chọn, nhưng phải <strong>đồng nhất</strong> cho tất cả services</li><li><strong>Thời gian:</strong> ~30-45 phút</li><li>Không dùng CodeBuild — GitHub Actions build trực tiếp, đơn giản hơn, miễn phí 2000 phút/tháng</li></ul>',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Setup AWS Resources',
      sections: [
        {
          id: 'step1-iam',
          title: 'Bước 1: Tạo IAM User',
          subtitle: 'Quản lý quyền truy cập — không dùng root account',
          icon: '👤',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: 'IAM (Identity and Access Management) quản lý quyền truy cập AWS. Bạn tạo user riêng cho GitHub Actions (không dùng root account).',
            },
            {
              type: 'step-list',
              items: [
                'Đăng nhập AWS Console: https://console.aws.amazon.com',
                'Tìm kiếm "IAM" → chọn <strong>IAM</strong> (IAM là global, không phụ thuộc region)',
                'Menu bên trái → <strong>Users</strong> → nút <strong>Create user</strong>',
                '<strong>User name:</strong> <code>github-actions-deployer</code>',
                '<strong>KHÔNG tick</strong> "Provide user access to AWS Management Console" → Next',
                'Chọn <strong>Attach policies directly</strong> → nút <strong>Create policy</strong> (mở tab mới)',
              ],
            },
            {
              type: 'text',
              html: '<strong>Tạo IAM Policy:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Trong tab mới, chọn tab <strong>JSON</strong>',
                'Xoá nội dung mặc định, paste JSON bên dưới',
                'Next → Policy name: <code>github-actions-deploy-policy</code> → Create policy',
                'Quay lại tab tạo user → nhấn nút refresh 🔄 → tìm <code>github-actions-deploy-policy</code> → tick chọn → Next → Create user',
              ],
            },
            {
              type: 'code',
              lang: 'json',
              filename: 'IAM Policy JSON',
              code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ECRAuth",
      "Effect": "Allow",
      "Action": "ecr:GetAuthorizationToken",
      "Resource": "*"
    },
    {
      "Sid": "ECRPush",
      "Effect": "Allow",
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:PutImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload"
      ],
      "Resource": "arn:aws:ecr:*:*:repository/ecr-backend"
    },
    {
      "Sid": "ECSUpdate",
      "Effect": "Allow",
      "Action": [
        "ecs:UpdateService",
        "ecs:DescribeServices"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3Deploy",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:GetBucketLocation"
      ],
      "Resource": [
        "arn:aws:s3:::ecr-frontend-*",
        "arn:aws:s3:::ecr-frontend-*/*"
      ]
    }
  ]
}`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Lưu ý',
              html: 'ECR resource dùng <code>*:*</code> cho region/account để tránh lỗi khi đổi region.',
            },
            {
              type: 'text',
              html: '<strong>Tạo Access Key:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Chọn user <code>github-actions-deployer</code> vừa tạo',
                'Tab <strong>Security credentials</strong> → <strong>Create access key</strong>',
                'Use case: <strong>Application running outside AWS</strong> → tick confirm → Next → Create access key',
                '<strong>QUAN TRỌNG:</strong> Copy và lưu <strong>Access key ID</strong> + <strong>Secret access key</strong> ngay (chỉ hiển thị 1 lần!)',
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: '<ul><li>✅ Bạn đã có: Access Key ID và Secret Access Key</li><li>✅ Policy <code>github-actions-deploy-policy</code> đã được gắn vào user</li></ul>',
            },
          ],
        },
        {
          id: 'step2-ecr',
          title: 'Bước 2: Tạo ECR Repository',
          subtitle: 'Elastic Container Registry — nơi lưu trữ Docker images',
          icon: '🐳',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'warn',
              title: 'QUAN TRỌNG',
              html: 'Từ bước này trở đi, <strong>luôn kiểm tra region</strong> ở góc phải trên trước khi làm bất cứ điều gì. Tất cả services (ECR, ECS, S3) phải cùng 1 region.',
            },
            {
              type: 'step-list',
              items: [
                'Tìm kiếm "ECR" hoặc "Elastic Container Registry" → chọn <strong>Amazon ECR</strong>',
                'Kiểm tra region ở góc phải trên = <strong>đúng region</strong>',
                'Menu bên trái → <strong>Repositories</strong> → <strong>Create repository</strong>',
                'Visibility: <strong>Private</strong>',
                'Repository name: <code>ecr-backend</code>',
                'Bỏ qua tất cả setting khác → <strong>Create repository</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: '<ul><li>Repository URI hiển thị: <code>{ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com/ecr-backend</code></li><li>Ghi nhớ <strong>ACCOUNT_ID</strong> (12 chữ số) — cần dùng sau</li></ul>',
            },
          ],
        },
        {
          id: 'step3-ecs',
          title: 'Bước 3: Tạo ECS Cluster',
          subtitle: 'Elastic Container Service + EC2 t3.micro',
          icon: '⚙️',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: 'ECS (Elastic Container Service) quản lý và chạy Docker containers. Cluster là nhóm máy chủ chạy containers.',
            },
            {
              type: 'step-list',
              items: [
                'Tìm kiếm "ECS" → chọn <strong>Elastic Container Service</strong>',
                'Kiểm tra region = <strong>đúng region bạn chọn</strong>',
                'Menu bên trái → <strong>Clusters</strong> → <strong>Create cluster</strong>',
                'Cluster name: <code>ecr-cluster</code>',
                'Bỏ qua Service Connect defaults',
                'Click mở section <strong>Infrastructure - advanced</strong>',
                'Chọn <strong>Fargate and Self-managed instances</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Cấu hình EC2 Instance:</strong>',
            },
            {
              type: 'table',
              caption: 'EC2 Configuration',
              headers: ['Setting', 'Giá trị / Value'],
              rows: [
                ['Operating System', 'Amazon Linux 2'],
                ['EC2 instance type', '<code>t3.micro</code>'],
                ['Desired capacity (min)', '<code>1</code>'],
                ['Desired capacity (max)', '<code>1</code>'],
                ['SSH Key pair', 'Create new → name: <code>ecr-key</code> → Download .pem'],
                ['VPC', 'default VPC'],
                ['Subnets', 'All subnets'],
                ['Security group', 'Create new security group'],
                ['Inbound rule', 'Custom TCP | Port 3000 | Source: Anywhere (0.0.0.0/0)'],
                ['Auto-assign public IP', '<strong>Turn on</strong> (quan trọng!)'],
              ],
            },
            {
              type: 'step-list',
              items: [
                'Container Insights: chọn <strong>Turned off</strong> (tiết kiệm chi phí)',
                'KMS Key ID: <strong>bỏ trống</strong>',
                'Nhấn <strong>Create</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Lỗi thường gặp',
              html: 'Nếu lỗi "CloudFormation stack already exists for a failed cluster with the same name" → vào <strong>CloudFormation Console</strong> → xoá stack <code>Infra-ECS-Cluster-ecr-cluster-*</code> → đợi xoá xong → tạo lại.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Đợi 2-3 phút, vào <strong>ECS → Clusters → ecr-cluster → Infrastructure tab</strong> — phải thấy 1 EC2 instance ở trạng thái <strong>ACTIVE</strong>',
            },
          ],
        },
        {
          id: 'step4-taskdef',
          title: 'Bước 4: Tạo Task Definition',
          subtitle: 'Dùng JSON editor để tránh lỗi resource',
          icon: '📄',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'callout',
              variant: 'warn',
              title: 'Bài học từ thực tế',
              html: 'Nếu dùng UI form, dễ set nhầm Memory = 3 GiB (mặc định) thay vì 450 MiB → t3.micro (1 GB RAM) không đủ → task pending mãi. <strong>Dùng JSON chính xác hơn.</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>ECS</strong> → menu bên trái → <strong>Task definitions</strong> → <strong>Create new task definition</strong> → chọn <strong>Create new task definition with JSON</strong>',
                'Xoá nội dung mặc định, paste JSON bên dưới (thay <code>{ACCOUNT_ID}</code> và <code>{REGION}</code>)',
                'Nhấn <strong>Create</strong>',
              ],
            },
            {
              type: 'code',
              lang: 'json',
              filename: 'Task Definition JSON',
              code: `{
  "family": "ecr-backend-task",
  "networkMode": "bridge",
  "executionRoleArn": "arn:aws:iam::{ACCOUNT_ID}:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "ecr-backend",
      "image": "{ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com/ecr-backend:latest",
      "cpu": 256,
      "memory": 450,
      "memoryReservation": 256,
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ecr-backend-task",
          "awslogs-region": "{REGION}",
          "awslogs-stream-prefix": "ecs",
          "awslogs-create-group": "true"
        }
      }
    }
  ],
  "requiresCompatibilities": ["EC2"]
}`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Ví dụ điền thực tế',
              html: 'Với account <code>093468662880</code> và region <code>ap-southeast-1</code>:<br/><code>executionRoleArn: arn:aws:iam::093468662880:role/ecsTaskExecutionRole</code><br/><code>image: 093468662880.dkr.ecr.ap-southeast-1.amazonaws.com/ecr-backend:latest</code>',
            },
            {
              type: 'table',
              caption: 'Giải thích config quan trọng',
              headers: ['Config', 'Giá trị / Value', 'Tại sao / Why'],
              rows: [
                ['<code>networkMode</code>', '<code>bridge</code>', 'awsvpc trên EC2 gây lỗi ENI, bridge đơn giản hơn'],
                ['<code>memory</code>', '<code>450</code> (MiB)', 't3.micro có 1 GB, để 450 MiB cho container + ECS agent'],
                ['<code>memoryReservation</code>', '<code>256</code> (MiB)', 'Soft limit, container sẽ dùng ít nhất 256 MiB'],
                ['<code>cpu</code>', '<code>256</code>', '0.25 vCPU, đủ cho NestJS app nhỏ'],
                ['<code>awslogs-create-group</code>', '<code>true</code>', 'Tự tạo CloudWatch log group, tránh lỗi log stream'],
                ['Task-level CPU/Memory', 'Không set', 'Chỉ set ở container level — tránh lỗi resource mismatch'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Nếu chưa có ecsTaskExecutionRole',
              html: 'Tạo task definition bằng <strong>UI form</strong> 1 lần → ở phần Task execution role → chọn <strong>Create new role</strong> → tên <code>ecsTaskExecutionRole</code> → xong xoá task definition vừa tạo và tạo lại bằng JSON.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Task definition <code>ecr-backend-task</code> xuất hiện với revision 1',
            },
          ],
        },
        {
          id: 'step5-service',
          title: 'Bước 5: Tạo ECS Service',
          subtitle: 'Service đảm bảo container luôn chạy',
          icon: '🔄',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                '<strong>ECS → Clusters → ecr-cluster</strong> → tab <strong>Services</strong> → <strong>Create</strong>',
                'Compute configuration: <strong>Launch type</strong> = <strong>EC2</strong>',
                'Task definition Family: <code>ecr-backend-task</code>, Revision: LATEST',
                'Service name: <code>ecr-backend-service</code>',
                'Desired tasks: <code>1</code>',
                'Deployment type: <strong>Rolling update</strong>',
                '<strong>Deployment failure detection:</strong> <strong>bỏ tick</strong> "Use the Amazon ECS deployment circuit breaker" (tạm thời, dễ debug hơn)',
                '<strong>Load balancing:</strong> None',
                '<strong>Service auto scaling:</strong> Do not adjust',
                'Nhấn <strong>Create</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Lưu ý',
              html: 'Lần deploy đầu sẽ FAIL vì ECR chưa có Docker image. Đây là bình thường — service sẽ tự chạy lại sau khi GitHub Actions push image lần đầu.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: '<ul><li>Service hiển thị ở tab Services, trạng thái 0/1 running (chưa có image)</li><li>Ghi nhớ <strong>tên service</strong> (ví dụ: <code>ecr-backend-service</code>) — cần cho GitHub Secret</li></ul>',
            },
          ],
        },
        {
          id: 'step6-sg',
          title: 'Bước 6: Cấu hình Security Group',
          subtitle: 'Firewall cho EC2 instance — mở port 3000',
          icon: '🔒',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Lưu ý',
              html: 'Nếu đã thêm inbound rule port 3000 khi tạo Cluster (Bước 3) → bỏ qua bước này.',
            },
            {
              type: 'step-list',
              items: [
                '<strong>EC2 Console</strong> → menu bên trái → <strong>Security Groups</strong>',
                'Tìm security group có description chứa "ecr-cluster" hoặc được tạo bởi ECS',
                'Chọn → tab <strong>Inbound rules</strong> → <strong>Edit inbound rules</strong>',
                'Add rule: Type: <strong>Custom TCP</strong> | Port: <code>3000</code> | Source: <strong>Anywhere-IPv4</strong> (0.0.0.0/0)',
                '(Tùy chọn) Add rule: Type: <strong>SSH</strong> | Port: <code>22</code> | Source: <strong>My IP</strong>',
                'Nhấn <strong>Save rules</strong>',
              ],
            },
          ],
        },
        {
          id: 'step7-s3',
          title: 'Bước 7: Tạo S3 Bucket',
          subtitle: 'Static website hosting cho frontend React',
          icon: '🪣',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Tìm kiếm "S3" → chọn <strong>S3</strong>',
                'Click <strong>Create bucket</strong>',
                'Bucket name: <code>ecr-frontend-{ten-cua-ban}</code> (ví dụ: <code>ecr-frontend-tringuyen-2026</code>) — tên bucket phải là duy nhất toàn cầu',
                'Region: <strong>cùng region với ECS</strong>',
                'Object Ownership: ACLs disabled (mặc định)',
                '<strong>Block Public Access: BỎ TICK</strong> "Block all public access" → tick xác nhận "I acknowledge..."',
                'Bỏ qua các setting khác → <strong>Create bucket</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Bật Static Website Hosting:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Vào bucket vừa tạo → tab <strong>Properties</strong> → kéo xuống <strong>Static website hosting</strong> → <strong>Edit</strong>',
                'Static website hosting: <strong>Enable</strong>',
                'Index document: <code>index.html</code>',
                'Error document: <code>index.html</code> (cho SPA routing)',
                'Nhấn <strong>Save changes</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Thêm Bucket Policy:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Tab <strong>Permissions</strong> → <strong>Bucket policy</strong> → <strong>Edit</strong>',
                'Paste đoạn JSON bên dưới (thay <code>{ten-bucket}</code> bằng tên bucket thật)',
                'Nhấn <strong>Save changes</strong>',
              ],
            },
            {
              type: 'code',
              lang: 'json',
              filename: 'Bucket Policy',
              code: `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::{ten-bucket}/*"
    }
  ]
}`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: 'Tab Properties → Static website hosting → ghi nhớ <strong>Bucket website endpoint</strong>: <code>http://{ten-bucket}.s3-website-{REGION}.amazonaws.com</code> — Truy cập URL này sẽ thấy 404 (chưa có file) — bình thường',
            },
          ],
        },
        {
          id: 'step8-secrets',
          title: 'Bước 8: Setup GitHub Secrets',
          subtitle: 'Kết nối GitHub Actions với AWS',
          icon: '🔑',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Cho REPO <code>ecr-backend</code>:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'GitHub → repo <code>ecr-backend</code> → <strong>Settings → Secrets and variables → Actions</strong>',
                'Click <strong>New repository secret</strong>, thêm lần lượt các secrets bên dưới',
              ],
            },
            {
              type: 'table',
              caption: 'Secrets cho ecr-backend',
              headers: ['Secret Name', 'Value'],
              rows: [
                ['<code>AWS_ACCESS_KEY_ID</code>', 'Access Key từ Bước 1'],
                ['<code>AWS_SECRET_ACCESS_KEY</code>', 'Secret Key từ Bước 1'],
                ['<code>AWS_REGION</code>', '<code>ap-southeast-1</code> (hoặc region bạn chọn)'],
                ['<code>ECS_SERVICE</code>', 'Tên service từ Bước 5 (ví dụ: <code>ecr-backend-service</code>)'],
              ],
            },
            {
              type: 'text',
              html: '<strong>Cho REPO <code>ecr-frontend</code>:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'GitHub → repo <code>ecr-frontend</code> → <strong>Settings → Secrets and variables → Actions</strong>',
                'Click <strong>New repository secret</strong>, thêm các secrets bên dưới',
              ],
            },
            {
              type: 'table',
              caption: 'Secrets cho ecr-frontend',
              headers: ['Secret Name', 'Value'],
              rows: [
                ['<code>AWS_ACCESS_KEY_ID</code>', 'Access Key từ Bước 1'],
                ['<code>AWS_SECRET_ACCESS_KEY</code>', 'Secret Key từ Bước 1'],
                ['<code>AWS_REGION</code>', '<code>ap-southeast-1</code>'],
                ['<code>AWS_S3_BUCKET_NAME</code>', '<code>ecr-frontend-{ten-cua-ban}</code>'],
                ['<code>VITE_API_URL</code>', '<code>http://{EC2-PUBLIC-IP}:3000</code>'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Tip: Elastic IP',
              html: 'Gắn <strong>Elastic IP</strong> cho EC2 instance để IP không đổi khi restart. Vào <strong>EC2 → Elastic IPs → Allocate → Associate</strong> với instance ECS (miễn phí khi gắn với running instance).',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Kiểm tra',
              html: '<ul><li>Repo <code>ecr-backend</code>: 4 secrets ✅</li><li>Repo <code>ecr-frontend</code>: 5 secrets ✅</li></ul>',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Hoàn tất & Troubleshooting',
      sections: [
        {
          id: 'done',
          title: 'Hoàn tất!',
          subtitle: 'Tất cả AWS resources đã được setup',
          icon: '✅',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'callout',
              variant: 'ok',
              title: '🎉 Bạn đã setup xong tất cả AWS resources!',
              html: '<strong>Backend:</strong> Push code → GitHub Actions build Docker → push ECR → update ECS → Truy cập: <code>http://{EC2-PUBLIC-IP}:3000</code><br/><strong>Frontend:</strong> Push code → GitHub Actions build → deploy S3 → Truy cập: <code>http://{ten-bucket}.s3-website-{REGION}.amazonaws.com</code>',
            },
            {
              type: 'text',
              html: '<strong>Tìm Account ID:</strong> Click tên account ở góc phải trên AWS Console → Copy số 12 chữ số',
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
              html: '<strong>Task stuck ở Provisioning / Pending</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Task definition yêu cầu nhiều resource hơn EC2 instance có (Memory 3 GiB > t3.micro 1 GB)',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Tạo task definition mới bằng JSON, đảm bảo <code>memory: 450</code> (MiB), không set task-level CPU/Memory',
            },
            {
              type: 'text',
              html: '<strong>Log stream doesn\'t exist</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Container chưa bao giờ start được → chưa tạo log stream',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Thêm <code>"awslogs-create-group": "true"</code> trong logConfiguration của task definition',
            },
            {
              type: 'text',
              html: '<strong>Deployment circuit breaker triggered</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Task fail liên tục → ECS tự rollback',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Disable circuit breaker khi debug (Update service → bỏ tick circuit breaker), fix task definition trước, rồi bật lại',
            },
            {
              type: 'text',
              html: '<strong>GitHub Actions không trigger</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'Workflow trigger trên branch <code>main</code> nhưng remote branch tên <code>master</code> (hoặc ngược lại)',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Kiểm tra <code>git branch -vv</code> và update workflow <code>branches: [main, master]</code>',
            },
            {
              type: 'text',
              html: '<strong>Task tự restart sau khi stop</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'ECS Service duy trì desired count = 1, nên tự tạo task mới thay thế',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Phải <strong>xoá hoặc update service</strong> (set desired tasks = 0), không chỉ stop task',
            },
            {
              type: 'text',
              html: '<strong>Sai region giữa các services</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Nguyên nhân',
              html: 'ECR ở <code>ap-southeast-1</code> nhưng ECS ở <code>ap-southeast-1</code> (hoặc ngược lại)',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Tất cả services phải cùng region. Xoá resource sai region, tạo lại đúng region',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
