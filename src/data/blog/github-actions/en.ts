import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'github-actions',
  title: 'GitHub Actions CI/CD',
  description: 'Write workflows, automate tests, and deploy to AWS with GitHub Actions',
  icon: '⚙️',
  chapters: [
    {
      id: 'chapter1',
      title: 'Introduction',
      sections: [
        {
          id: 'what-is-gha',
          title: 'What is GitHub Actions?',
          subtitle: 'Automate everything from your repository',
          icon: '⚙️',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'text',
              html: 'GitHub Actions is a CI/CD platform built into GitHub. It lets you automate workflows in response to repository events — like pushing code, opening a PR, or creating a release.',
            },
            {
              type: 'feature-grid',
              items: [
                { icon: '📁', title: 'Workflow', description: 'A YAML file in .github/workflows/ that defines your automation pipeline.' },
                { icon: '🎯', title: 'Event', description: 'The trigger: push, pull_request, schedule, workflow_dispatch, etc.' },
                { icon: '💼', title: 'Job', description: 'A set of steps that run on the same runner machine.' },
                { icon: '🔧', title: 'Step', description: 'An individual command or action within a job.' },
                { icon: '🏃', title: 'Runner', description: 'The VM where jobs execute. GitHub-hosted (ubuntu, windows, mac) or self-hosted.' },
                { icon: '📦', title: 'Action', description: 'Reusable unit of code. Use from Marketplace or write your own.' },
              ],
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Free Tier',
              html: 'GitHub Actions is free for public repositories. For private repos: <strong>2,000 minutes/month free</strong> on the Free plan. Ubuntu runners are fastest and most cost-effective.',
            },
          ],
        },
        {
          id: 'first-workflow',
          title: 'Your First Workflow',
          subtitle: 'Hello World with GitHub Actions',
          icon: '👋',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'text',
              html: 'Workflows live in <code>.github/workflows/</code> directory. Any <code>.yml</code> file here is automatically picked up by GitHub.',
            },
            {
              type: 'code',
              lang: 'yaml',
              filename: '.github/workflows/hello.yml',
              code: `name: Hello World

# Trigger: run on every push to main
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
        run: echo "Hello from GitHub Actions!"

      - name: Show environment info
        run: |
          echo "Branch: \${{ github.ref_name }}"
          echo "Commit: \${{ github.sha }}"
          echo "Actor: \${{ github.actor }}"`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After pushing to <code>main</code>, go to your repository on GitHub → <strong>Actions tab</strong>. You should see the "Hello World" workflow running. Click on it to see the step-by-step logs and confirm all steps pass with a green checkmark.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Build & Test Pipeline',
      sections: [
        {
          id: 'nodejs-ci',
          title: 'Node.js CI Workflow',
          subtitle: 'Install, lint, test on every PR',
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
              html: 'The <code>matrix</code> strategy runs your job once for each combination. Testing on Node 18 and 20 in parallel catches version-specific bugs before they reach production.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Open a Pull Request against <code>main</code> — the CI workflow should trigger automatically. In the <strong>Actions tab</strong>, you will see two parallel jobs: one for Node 18.x and one for 20.x. Both must show a green checkmark before the PR can be merged.',
            },
          ],
        },
        {
          id: 'secrets-env',
          title: 'Secrets & Environment Variables',
          subtitle: 'Securely pass credentials to workflows',
          icon: '🔐',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Go to your GitHub repository → Settings → Secrets and variables → Actions',
                'Click "New repository secret"',
                'Add secrets like AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, etc.',
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

      # Reference secrets with \${{ secrets.SECRET_NAME }}
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-southeast-1

      # Use environment variables in run commands
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
              title: 'Never hardcode secrets',
              html: 'Never put API keys, passwords, or tokens directly in workflow YAML files. They will be visible in your git history. Always use <code>secrets</code> or <code>vars</code>.',
            },
            {
              type: 'table',
              caption: 'Secrets vs Environment Variables vs vars',
              headers: ['Type', 'Usage', 'Visible in logs'],
              rows: [
                ['secrets.*', 'Sensitive values (API keys, passwords)', 'No — masked automatically'],
                ['vars.*', 'Non-sensitive config (region, app name)', 'Yes'],
                ['env:', 'Workflow-scoped variables', 'Yes'],
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Deploy to AWS',
      sections: [
        {
          id: 'deploy-backend-ecs',
          title: 'Deploy Backend to ECS',
          subtitle: 'Build Docker image, push to ECR, update ECS service',
          icon: '🚀',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: 'This workflow runs on push to <code>main</code>: builds the Docker image, pushes it to ECR, then forces a new ECS deployment to pick up the new image.',
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

      - name: Build, tag, and push Docker image to ECR
        id: build-image
        env:
          ECR_REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG ./backend
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG" >> $GITHUB_OUTPUT

      - name: Force new ECS deployment
        run: |
          aws ecs update-service \\
            --cluster \${{ env.ECS_CLUSTER }} \\
            --service \${{ env.ECS_SERVICE }} \\
            --force-new-deployment`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After the workflow completes, check the <strong>Actions tab</strong> — all steps should be green. Then confirm the deployment in AWS: go to <strong>ECS → Clusters → your cluster → Tasks</strong> and verify a new task revision is running. Test your application URL to confirm the latest code is live.',
            },
          ],
        },
        {
          id: 'deploy-frontend-s3',
          title: 'Deploy Frontend to S3',
          subtitle: 'Build React/Next.js and sync to S3 bucket',
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

      - name: Install and build
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

      - name: Sync to S3
        run: |
          aws s3 sync ./frontend/out s3://\${{ env.S3_BUCKET }} \\
            --delete \\
            --cache-control "public, max-age=31536000, immutable"`,
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Cache Headers',
              html: 'The <code>--cache-control</code> flag sets long-lived browser cache (1 year) for hashed assets. If using CloudFront, you should also add an invalidation step after syncing.',
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'Check the <strong>Actions tab</strong> — the "Deploy Frontend" workflow should complete successfully. Then open your S3 bucket in the AWS Console and confirm the new build files are present. Open your deployment URL (S3 static website or CloudFront distribution) to verify the latest version is live.',
            },
          ],
        },
        {
          id: 'workflow-tips',
          title: 'Workflow Best Practices',
          subtitle: 'Patterns that keep pipelines fast and reliable',
          icon: '💡',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                { icon: '⚡', title: 'Use path filters', description: 'Add paths: filter so backend workflow only runs when backend code changes.' },
                { icon: '💾', title: 'Cache dependencies', description: 'Use actions/cache or built-in cache: npm in setup-node to skip reinstalling.' },
                { icon: '🛡', title: 'Use environments', description: 'Create production/staging environments with protection rules and approvals.' },
                { icon: '🏷', title: 'Pin action versions', description: "Use @v4 not @main for stability. Even better: pin to a commit SHA." },
                { icon: '🔄', title: 'Reuse with workflow_call', description: 'Extract common jobs into reusable workflows to avoid duplication.' },
                { icon: '⏰', title: 'Set job timeouts', description: 'Add timeout-minutes: 10 to jobs to prevent runaway bills from hung processes.' },
              ],
            },
          ],
        },
        {
          id: 'gha-troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Common issues and how to fix them',
          icon: '🔍',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Workflow not triggering</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The branch name in the <code>on.push.branches</code> trigger does not match your actual default branch, or there is a YAML syntax error that prevents GitHub from parsing the workflow file.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Verify that <code>branches: [main]</code> matches your repository\'s default branch name (some repos use <code>master</code>). Use a YAML validator to check syntax. Also confirm the workflow file is in <code>.github/workflows/</code> with a <code>.yml</code> or <code>.yaml</code> extension.',
            },
            {
              type: 'text',
              html: '<strong>Secret not available in workflow</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The secret name has a typo, or the secret was added at the wrong scope (organization-level vs repository-level). Secrets from forks are also not available in pull request workflows by default.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Go to <strong>Settings → Secrets and variables → Actions</strong> and verify the exact secret name. The reference in the workflow must match exactly: <code>${{ secrets.AWS_ACCESS_KEY_ID }}</code>. Check whether it is a repository secret or an environment secret (environment secrets require <code>environment:</code> to be set on the job).',
            },
            {
              type: 'text',
              html: '<strong>Docker build fails in CI</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The Dockerfile <code>COPY</code> instruction references files outside the build context, or <code>.dockerignore</code> is accidentally excluding files that are needed during the build.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Review your <code>.dockerignore</code> to ensure required files are not excluded. Set <code>working-directory</code> in the workflow step to the correct directory if using a monorepo. Pass the correct build context path to <code>docker build</code>.',
            },
            {
              type: 'text',
              html: '<strong>Deploy step succeeds but app not updated</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The ECS service is not force-deploying a new task revision after the new Docker image is pushed to ECR. ECS may still be running the old task if no task definition change is detected.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Add the <code>--force-new-deployment</code> flag to the <code>aws ecs update-service</code> command. This forces ECS to start a new task with the latest image even if the task definition has not changed.',
            },
            {
              type: 'text',
              html: '<strong>Permission denied in workflow</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The workflow is missing a <code>permissions</code> block, or the <code>actions/checkout</code> step is absent, causing the runner to lack access to the repository contents or to request tokens.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Add a <code>permissions</code> block to the job with the required scopes. For OIDC-based AWS auth, add <code>id-token: write</code> and <code>contents: read</code>. Always include <code>actions/checkout@v4</code> as the first step so the runner has access to your code.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
