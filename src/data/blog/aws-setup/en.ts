import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'aws-setup',
  title: 'ECR + S3 for Frontend',
  description: 'ECR, ECS, S3 — deploy backend containers & host static frontend on AWS',
  icon: '☁️',
  chapters: [
    {
      id: 'chapter1',
      title: 'Overview & Preparation',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          subtitle: 'Deploy flow and AWS resources',
          icon: '📋',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'warn',
              title: 'Cost Warning',
              html: 'This guide uses EC2 t3.micro (free tier first 12 months, 750 hours/month). After free tier, EC2 costs ~$8.5/month. <strong>Remember to delete resources when not in use.</strong>',
            },
            {
              type: 'text',
              html: '<strong>You will create the following AWS resources:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'IAM User (for GitHub Actions)',
                'ECR Repository (stores Docker images)',
                'ECS Cluster + EC2 Instance (runs containers)',
                'ECS Task Definition (using JSON)',
                'ECS Service',
                'Security Group (open ports)',
                'S3 Bucket (hosts frontend)',
                'GitHub Secrets (connects GitHub → AWS)',
              ],
            },
            {
              type: 'text',
              html: '<strong>Deploy flow:</strong><br/><strong>Backend:</strong> Push code → GitHub Actions build Docker → push ECR → update ECS<br/><strong>Frontend:</strong> Push code → GitHub Actions → build React → sync to S3',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Important Note',
              html: '<ul><li><strong>Region:</strong> <code>ap-southeast-1</code> (Singapore) — or your chosen region, but must be <strong>consistent</strong> for all services</li><li><strong>Time:</strong> ~30-45 minutes</li><li>Don\'t use CodeBuild — GitHub Actions builds directly, simpler and free 2000 min/month</li></ul>',
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
          title: 'Step 1: Create IAM User',
          subtitle: 'Access management — never use root account',
          icon: '👤',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'text',
              html: 'IAM (Identity and Access Management) manages AWS access. Create a dedicated user for GitHub Actions (never use the root account).',
            },
            {
              type: 'step-list',
              items: [
                'Sign in to AWS Console: https://console.aws.amazon.com',
                'Search for "IAM" → select <strong>IAM</strong> (IAM is global, not region-specific)',
                'Left menu → <strong>Users</strong> → <strong>Create user</strong> button',
                '<strong>User name:</strong> <code>github-actions-deployer</code>',
                '<strong>Do NOT check</strong> "Provide user access to AWS Management Console" → Next',
                'Select <strong>Attach policies directly</strong> → <strong>Create policy</strong> button (opens new tab)',
              ],
            },
            {
              type: 'text',
              html: '<strong>Create IAM Policy:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'In the new tab, select the <strong>JSON</strong> tab',
                'Clear the default content and paste the JSON below',
                'Next → Policy name: <code>github-actions-deploy-policy</code> → Create policy',
                'Return to the user creation tab → click refresh 🔄 → find <code>github-actions-deploy-policy</code> → check it → Next → Create user',
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
              title: 'Note',
              html: 'ECR resource uses <code>*:*</code> for region/account to avoid errors when changing regions.',
            },
            {
              type: 'text',
              html: '<strong>Create Access Key:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Select the <code>github-actions-deployer</code> user you just created',
                '<strong>Security credentials</strong> tab → <strong>Create access key</strong>',
                'Use case: <strong>Application running outside AWS</strong> → check confirm → Next → Create access key',
                '<strong>IMPORTANT:</strong> Copy and save the <strong>Access key ID</strong> + <strong>Secret access key</strong> immediately (shown only once!)',
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: '<ul><li>✅ You have: Access Key ID and Secret Access Key</li><li>✅ Policy <code>github-actions-deploy-policy</code> attached to user</li></ul>',
            },
          ],
        },
        {
          id: 'step2-ecr',
          title: 'Step 2: Create ECR Repository',
          subtitle: 'Elastic Container Registry — stores your Docker images',
          icon: '🐳',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'warn',
              title: 'IMPORTANT',
              html: 'From this step forward, <strong>always check the region</strong> in the top right corner before doing anything. All services (ECR, ECS, S3) must be in the same region.',
            },
            {
              type: 'step-list',
              items: [
                'Search for "ECR" or "Elastic Container Registry" → select <strong>Amazon ECR</strong>',
                'Check the region in the top right = <strong>correct region</strong>',
                'Left menu → <strong>Repositories</strong> → <strong>Create repository</strong>',
                'Visibility: <strong>Private</strong>',
                'Repository name: <code>ecr-backend</code>',
                'Skip all other settings → <strong>Create repository</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: '<ul><li>Repository URI shown: <code>{ACCOUNT_ID}.dkr.ecr.{REGION}.amazonaws.com/ecr-backend</code></li><li>Note your <strong>ACCOUNT_ID</strong> (12 digits) — needed later</li></ul>',
            },
          ],
        },
        {
          id: 'step3-ecs',
          title: 'Step 3: Create ECS Cluster',
          subtitle: 'Elastic Container Service + EC2 t3.micro',
          icon: '⚙️',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: 'ECS (Elastic Container Service) manages and runs Docker containers. A cluster is a group of servers running containers.',
            },
            {
              type: 'step-list',
              items: [
                'Search for "ECS" → select <strong>Elastic Container Service</strong>',
                'Check region = <strong>your chosen region</strong>',
                'Left menu → <strong>Clusters</strong> → <strong>Create cluster</strong>',
                'Cluster name: <code>ecr-cluster</code>',
                'Skip Service Connect defaults',
                'Click to expand the <strong>Infrastructure - advanced</strong> section',
                'Select <strong>Fargate and Self-managed instances</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>EC2 Instance Configuration:</strong>',
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
                ['Auto-assign public IP', '<strong>Turn on</strong> (important!)'],
              ],
            },
            {
              type: 'step-list',
              items: [
                'Container Insights: select <strong>Turned off</strong> (saves costs)',
                'KMS Key ID: <strong>leave blank</strong>',
                'Click <strong>Create</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Common Error',
              html: 'If error "CloudFormation stack already exists for a failed cluster with the same name" → go to <strong>CloudFormation Console</strong> → delete stack <code>Infra-ECS-Cluster-ecr-cluster-*</code> → wait for deletion → recreate.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Wait 2-3 minutes, go to <strong>ECS → Clusters → ecr-cluster → Infrastructure tab</strong> — should see 1 EC2 instance with status <strong>ACTIVE</strong>',
            },
          ],
        },
        {
          id: 'step4-taskdef',
          title: 'Step 4: Create Task Definition',
          subtitle: 'Use JSON editor to avoid resource errors',
          icon: '📄',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'callout',
              variant: 'warn',
              title: 'Lesson Learned',
              html: 'Using the UI form makes it easy to accidentally set Memory = 3 GiB (default) instead of 450 MiB → t3.micro (1 GB RAM) insufficient → task pending forever. <strong>Use JSON for precision.</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Required: Create ecsTaskExecutionRole first',
              html: 'If your account doesn\'t have the <code>ecsTaskExecutionRole</code> IAM role, creating the task definition will fail with <strong>"Role is not valid"</strong>. Check: <strong>IAM → Roles</strong> → search <code>ecsTaskExecutionRole</code>. If not found, create it:<ol><li><strong>IAM → Roles → Create role</strong></li><li>Trusted entity: <strong>AWS service</strong> → Use case: <strong>Elastic Container Service → Elastic Container Service Task</strong> → Next</li><li>Search and attach policy: <code>AmazonECSTaskExecutionRolePolicy</code> → Next</li><li>Role name: <code>ecsTaskExecutionRole</code> → <strong>Create role</strong></li></ol>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>ECS</strong> → left menu → <strong>Task definitions</strong> → <strong>Create new task definition</strong> → select <strong>Create new task definition with JSON</strong>',
                'Clear the default content and paste the JSON below (replace <code>{ACCOUNT_ID}</code> and <code>{REGION}</code>)',
                'Click <strong>Create</strong>',
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
              title: 'Example with real values',
              html: 'For account <code>093468662880</code> and region <code>ap-southeast-1</code>:<br/><code>executionRoleArn: arn:aws:iam::093468662880:role/ecsTaskExecutionRole</code><br/><code>image: 093468662880.dkr.ecr.ap-southeast-1.amazonaws.com/ecr-backend:latest</code>',
            },
            {
              type: 'table',
              caption: 'Key Configuration Explained',
              headers: ['Config', 'Giá trị / Value', 'Tại sao / Why'],
              rows: [
                ['<code>networkMode</code>', '<code>bridge</code>', 'awsvpc on EC2 causes ENI errors, bridge is simpler'],
                ['<code>memory</code>', '<code>450</code> (MiB)', 't3.micro has 1 GB, keep 450 MiB for container + ECS agent'],
                ['<code>memoryReservation</code>', '<code>256</code> (MiB)', 'Soft limit, container will use at least 256 MiB'],
                ['<code>cpu</code>', '<code>256</code>', '0.25 vCPU, sufficient for a small NestJS app'],
                ['<code>awslogs-create-group</code>', '<code>true</code>', 'Auto-creates CloudWatch log group, avoids log stream errors'],
                ['Task-level CPU/Memory', 'Not set', 'Set at container level only — avoids resource mismatch errors'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Alternative: Create role via ECS UI',
              html: 'You can also create the role by: <strong>ECS → Task definitions → Create new task definition</strong> (UI form) → in Task execution role section → select <strong>Create new role</strong> → this auto-creates <code>ecsTaskExecutionRole</code>. Then delete that task definition and recreate using JSON above.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Task definition <code>ecr-backend-task</code> appears with revision 1',
            },
          ],
        },
        {
          id: 'step5-service',
          title: 'Step 5: Create ECS Service',
          subtitle: 'Service ensures container is always running',
          icon: '🔄',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                '<strong>ECS → Clusters → ecr-cluster</strong> → <strong>Services</strong> tab → <strong>Create</strong>',
                'Compute configuration: <strong>Launch type</strong> = <strong>EC2</strong>',
                'Task definition Family: <code>ecr-backend-task</code>, Revision: LATEST',
                'Service name: <code>ecr-backend-service</code>',
                'Desired tasks: <code>1</code>',
                'Deployment type: <strong>Rolling update</strong>',
                '<strong>Deployment failure detection:</strong> <strong>uncheck</strong> "Use the Amazon ECS deployment circuit breaker" (temporary, easier to debug)',
                '<strong>Load balancing:</strong> None',
                '<strong>Service auto scaling:</strong> Do not adjust',
                'Click <strong>Create</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Note',
              html: 'The first deployment will FAIL because ECR has no Docker image yet. This is normal — the service will automatically restart after GitHub Actions pushes the first image.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: '<ul><li>Service shows in Services tab, status 0/1 running (no image yet)</li><li>Note the <strong>service name</strong> (e.g. <code>ecr-backend-service</code>) — needed for GitHub Secret</li></ul>',
            },
          ],
        },
        {
          id: 'step6-sg',
          title: 'Step 6: Configure Security Group',
          subtitle: 'EC2 instance firewall — open port 3000',
          icon: '🔒',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Note',
              html: 'If you already added an inbound rule for port 3000 when creating the Cluster (Step 3) → skip this step.',
            },
            {
              type: 'step-list',
              items: [
                '<strong>EC2 Console</strong> → left menu → <strong>Security Groups</strong>',
                'Find the security group whose description contains "ecr-cluster" or was created by ECS',
                'Select it → <strong>Inbound rules</strong> tab → <strong>Edit inbound rules</strong>',
                'Add rule: Type: <strong>Custom TCP</strong> | Port: <code>3000</code> | Source: <strong>Anywhere-IPv4</strong> (0.0.0.0/0)',
                '(Optional) Add rule: Type: <strong>SSH</strong> | Port: <code>22</code> | Source: <strong>My IP</strong>',
                'Click <strong>Save rules</strong>',
              ],
            },
          ],
        },
        {
          id: 'step7-s3',
          title: 'Step 7: Create S3 Bucket',
          subtitle: 'Static website hosting for React frontend',
          icon: '🪣',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Search for "S3" → select <strong>S3</strong>',
                'Click <strong>Create bucket</strong>',
                'Bucket name: <code>ecr-frontend-{your-name}</code> (e.g. <code>ecr-frontend-tringuyen-2026</code>) — bucket name must be globally unique',
                'Region: <strong>same region as ECS</strong>',
                'Object Ownership: ACLs disabled (default)',
                '<strong>Block Public Access: UNCHECK</strong> "Block all public access" → check the acknowledgment "I acknowledge..."',
                'Skip other settings → <strong>Create bucket</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Enable Static Website Hosting:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Go to the bucket → <strong>Properties</strong> tab → scroll to <strong>Static website hosting</strong> → <strong>Edit</strong>',
                'Static website hosting: <strong>Enable</strong>',
                'Index document: <code>index.html</code>',
                'Error document: <code>index.html</code> (for SPA routing)',
                'Click <strong>Save changes</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Add Bucket Policy:</strong>',
            },
            {
              type: 'step-list',
              items: [
                '<strong>Permissions</strong> tab → <strong>Bucket policy</strong> → <strong>Edit</strong>',
                'Paste the JSON below (replace <code>{bucket-name}</code> with your actual bucket name)',
                'Click <strong>Save changes</strong>',
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
              title: 'Verify',
              html: 'Properties tab → Static website hosting → note the <strong>Bucket website endpoint</strong>: <code>http://{bucket-name}.s3-website-{REGION}.amazonaws.com</code> — Visiting this URL shows 404 (no files yet) — that\'s normal',
            },
          ],
        },
        {
          id: 'step8-secrets',
          title: 'Step 8: Setup GitHub Secrets',
          subtitle: 'Connect GitHub Actions to AWS',
          icon: '🔑',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>For REPO <code>ecr-backend</code>:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'GitHub → repo <code>ecr-backend</code> → <strong>Settings → Secrets and variables → Actions</strong>',
                'Click <strong>New repository secret</strong> and add each secret below',
              ],
            },
            {
              type: 'table',
              caption: 'Secrets for ecr-backend',
              headers: ['Secret Name', 'Value'],
              rows: [
                ['<code>AWS_ACCESS_KEY_ID</code>', 'Access Key from Step 1'],
                ['<code>AWS_SECRET_ACCESS_KEY</code>', 'Secret Key from Step 1'],
                ['<code>AWS_REGION</code>', '<code>ap-southeast-1</code> (or your chosen region)'],
                ['<code>ECS_SERVICE</code>', 'Service name from Step 5 (e.g. <code>ecr-backend-service</code>)'],
              ],
            },
            {
              type: 'text',
              html: '<strong>For REPO <code>ecr-frontend</code>:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'GitHub → repo <code>ecr-frontend</code> → <strong>Settings → Secrets and variables → Actions</strong>',
                'Click <strong>New repository secret</strong> and add the secrets below',
              ],
            },
            {
              type: 'table',
              caption: 'Secrets for ecr-frontend',
              headers: ['Secret Name', 'Value'],
              rows: [
                ['<code>AWS_ACCESS_KEY_ID</code>', 'Access Key from Step 1'],
                ['<code>AWS_SECRET_ACCESS_KEY</code>', 'Secret Key from Step 1'],
                ['<code>AWS_REGION</code>', '<code>ap-southeast-1</code>'],
                ['<code>AWS_S3_BUCKET_NAME</code>', '<code>ecr-frontend-{your-name}</code>'],
                ['<code>VITE_API_URL</code>', '<code>http://{EC2-PUBLIC-IP}:3000</code>'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Tip: Elastic IP',
              html: 'Attach an <strong>Elastic IP</strong> to your EC2 instance to keep a fixed IP even after restart. Go to <strong>EC2 → Elastic IPs → Allocate → Associate</strong> with the ECS instance (free when attached to a running instance).',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: '<ul><li>Repo <code>ecr-backend</code>: 4 secrets ✅</li><li>Repo <code>ecr-frontend</code>: 5 secrets ✅</li></ul>',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Complete & Troubleshooting',
      sections: [
        {
          id: 'done',
          title: 'Complete!',
          subtitle: 'All AWS resources have been set up',
          icon: '✅',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'callout',
              variant: 'ok',
              title: '🎉 All AWS resources set up!',
              html: '<strong>Backend:</strong> Push code → GitHub Actions build Docker → push ECR → update ECS → Access: <code>http://{EC2-PUBLIC-IP}:3000</code><br/><strong>Frontend:</strong> Push code → GitHub Actions build → deploy S3 → Access: <code>http://{bucket-name}.s3-website-{REGION}.amazonaws.com</code>',
            },
            {
              type: 'text',
              html: '<strong>Find Account ID:</strong> Click account name in the top right of AWS Console → Copy the 12-digit number',
            },
          ],
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Common issues and solutions',
          icon: '🔧',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Task stuck at Provisioning / Pending</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Task definition requests more resources than the EC2 instance has (Memory 3 GiB > t3.micro 1 GB)',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Create new task definition using JSON, ensure <code>memory: 450</code> (MiB), don\'t set task-level CPU/Memory',
            },
            {
              type: 'text',
              html: '<strong>Log stream doesn\'t exist</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Container has never started → no log stream created',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Add <code>"awslogs-create-group": "true"</code> in the task definition\'s logConfiguration',
            },
            {
              type: 'text',
              html: '<strong>Deployment circuit breaker triggered</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Task keeps failing → ECS auto-rollbacks',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Disable circuit breaker while debugging (Update service → uncheck circuit breaker), fix task definition first, then re-enable',
            },
            {
              type: 'text',
              html: '<strong>GitHub Actions not triggering</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Workflow triggers on branch <code>main</code> but remote branch is named <code>master</code> (or vice versa)',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Check <code>git branch -vv</code> and update workflow <code>branches: [main, master]</code>',
            },
            {
              type: 'text',
              html: '<strong>Task auto-restarts after being stopped</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'ECS Service maintains desired count = 1, auto-creates replacement tasks',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: '<strong>Delete or update the service</strong> (set desired tasks = 0), don\'t just stop the task',
            },
            {
              type: 'text',
              html: '<strong>Region mismatch between services</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'ECR in <code>ap-southeast-1</code> but ECS in <code>ap-southeast-1</code> (or vice versa)',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'All services must be in the same region. Delete resources in wrong region, recreate in correct region',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
