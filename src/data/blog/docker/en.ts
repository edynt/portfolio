import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'docker',
  title: 'Docker Basics',
  description: 'Dockerfile, images, containers, multi-stage builds, and Docker Compose',
  icon: '🐳',
  chapters: [
    {
      id: 'chapter1',
      title: 'Introduction to Docker',
      sections: [
        {
          id: 'what-is-docker',
          title: 'What is Docker?',
          subtitle: 'Containers vs. virtual machines',
          icon: '🐳',
          iconColor: 'bg-sky-100',
          blocks: [
            {
              type: 'text',
              html: 'Docker is a platform that packages your application and all its dependencies into a <strong>container</strong> — a lightweight, portable, self-sufficient unit that runs consistently across any environment.',
            },
            {
              type: 'compare',
              left: {
                title: 'Without Docker',
                blocks: [
                  {
                    type: 'step-list',
                    items: [
                      '"It works on my machine" problem',
                      'Different OS versions cause bugs',
                      'Manual dependency installation',
                      'Environment config sprawl',
                    ],
                  },
                ],
              },
              right: {
                title: 'With Docker',
                blocks: [
                  {
                    type: 'step-list',
                    items: [
                      'Same container runs everywhere',
                      'Dependencies bundled inside image',
                      'Reproducible builds every time',
                      'One command to spin up any service',
                    ],
                  },
                ],
              },
            },
            {
              type: 'feature-grid',
              items: [
                { icon: '📦', title: 'Image', description: 'A read-only snapshot of your app + all dependencies. The blueprint.' },
                { icon: '🚀', title: 'Container', description: 'A running instance of an image. Isolated, ephemeral process.' },
                { icon: '🏗', title: 'Dockerfile', description: 'Instructions to build an image step by step.' },
                { icon: '📚', title: 'Registry', description: 'Storage for images. Docker Hub, ECR, GCR, etc.' },
                { icon: '🎭', title: 'Volume', description: 'Persistent storage that survives container restarts.' },
                { icon: '🌐', title: 'Network', description: 'Virtual network connecting containers to each other.' },
              ],
            },
          ],
        },
        {
          id: 'install-docker',
          title: 'Install Docker',
          subtitle: 'Get Docker Desktop running locally',
          icon: '⚙️',
          iconColor: 'bg-gray-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'Docker Desktop',
              html: 'Install <strong>Docker Desktop</strong> which includes Docker Engine, CLI, Compose, and BuildKit. Available for macOS, Windows, and Linux.',
            },
            {
              type: 'table',
              caption: 'Installation methods by platform',
              headers: ['Platform', 'Method', 'Notes'],
              rows: [
                ['macOS', 'docker.com/get-started → Download .dmg', 'ARM and Intel supported'],
                ['Windows', 'docker.com/get-started → Download .exe', 'Requires WSL2 enabled'],
                ['Ubuntu/Debian', 'apt-get install docker.io', 'Or use official install script'],
              ],
            },
            {
              type: 'text',
              html: 'Verify the installation:',
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
      title: 'Writing Dockerfiles',
      sections: [
        {
          id: 'dockerfile-basics',
          title: 'Dockerfile Basics',
          subtitle: 'Layer by layer — how images are built',
          icon: '📝',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'text',
              html: 'A Dockerfile is a text file with sequential instructions. Each instruction creates a <strong>layer</strong> in the image. Layers are cached — unchanged layers are reused in future builds.',
            },
            {
              type: 'code',
              lang: 'dockerfile',
              filename: 'Dockerfile',
              code: `# Base image — always start from official images
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose port (documentation only — doesn't actually publish)
EXPOSE 3000

# Command to run when container starts
CMD ["node", "dist/index.js"]`,
            },
            {
              type: 'table',
              caption: 'Common Dockerfile instructions',
              headers: ['Instruction', 'Purpose', 'Example'],
              rows: [
                ['FROM', 'Base image to build on', 'FROM node:20-alpine'],
                ['WORKDIR', 'Set working directory', 'WORKDIR /app'],
                ['COPY', 'Copy files from host → image', 'COPY . .'],
                ['RUN', 'Execute command during build', 'RUN npm install'],
                ['ENV', 'Set environment variable', 'ENV NODE_ENV=production'],
                ['EXPOSE', 'Document which port app uses', 'EXPOSE 3000'],
                ['CMD', 'Default command to run', 'CMD ["node", "index.js"]'],
                ['ENTRYPOINT', 'Fixed command (args appended)', 'ENTRYPOINT ["node"]'],
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Layer Caching Tip',
              html: 'Copy <code>package.json</code> and run <code>npm install</code> <strong>before</strong> copying your source code. This way, the install layer is cached and only invalidated when dependencies change — not on every code edit.',
            },
          ],
        },
        {
          id: 'multi-stage-build',
          title: 'Multi-Stage Builds',
          subtitle: 'Keep production images lean',
          icon: '🏗',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'text',
              html: 'Multi-stage builds let you use one stage for building (with all dev tools) and another for running (with only what you need). The final image is dramatically smaller.',
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

# Only copy what we need from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Run as non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3000
CMD ["node", "dist/index.js"]`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Size Comparison',
              html: 'A typical Node.js app: <strong>single stage ~800MB</strong>, multi-stage <strong>~120MB</strong>. Smaller images = faster deploys, less attack surface, lower registry storage costs.',
            },
          ],
        },
        {
          id: 'dockerignore',
          title: '.dockerignore',
          subtitle: 'Exclude files from the build context',
          icon: '🚫',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: 'The <code>.dockerignore</code> file works like <code>.gitignore</code> — it prevents files from being sent to the Docker build context. Always create one to keep builds fast and images clean.',
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
      title: 'Running Containers',
      sections: [
        {
          id: 'build-run',
          title: 'Build & Run Commands',
          subtitle: 'The essential Docker CLI commands',
          icon: '▶️',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'code',
              lang: 'bash',
              code: `# Build an image from Dockerfile in current directory
docker build -t my-app:latest .

# Run a container from the image
docker run -p 3000:3000 my-app:latest

# Run in detached (background) mode
docker run -d -p 3000:3000 --name my-container my-app:latest

# Pass environment variables
docker run -d -p 3000:3000 \\
  -e DATABASE_URL=postgres://... \\
  -e NODE_ENV=production \\
  my-app:latest

# View running containers
docker ps

# View logs
docker logs my-container
docker logs -f my-container  # follow/stream logs

# Stop and remove a container
docker stop my-container
docker rm my-container`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After running <code>docker run -d -p 3000:3000 --name my-container my-app:latest</code>, confirm the container is running:<br><br><code>docker ps</code><br><br>Expected output:<pre>CONTAINER ID   IMAGE            STATUS         PORTS\nabc123...      my-app:latest    Up 5 seconds   0.0.0.0:3000-&gt;3000/tcp</pre>Visit <code>http://localhost:3000</code> in your browser, or check logs with <code>docker logs my-container</code>.',
            },
            {
              type: 'table',
              caption: 'Useful docker run flags',
              headers: ['Flag', 'Meaning', 'Example'],
              rows: [
                ['-p host:container', 'Publish port', '-p 8080:3000'],
                ['-d', 'Detached (background)', '-d'],
                ['--name', 'Name the container', '--name api'],
                ['-e KEY=VALUE', 'Set env variable', '-e NODE_ENV=prod'],
                ['-v host:container', 'Mount volume', '-v ./data:/app/data'],
                ['--rm', 'Auto-remove on stop', '--rm'],
                ['-it', 'Interactive TTY', '-it (for shell access)'],
              ],
            },
          ],
        },
        {
          id: 'docker-compose',
          title: 'Docker Compose',
          subtitle: 'Orchestrate multiple containers locally',
          icon: '🎭',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'text',
              html: 'Docker Compose defines and runs multi-container applications using a YAML file. Perfect for local development with a web server, database, and cache running together.',
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
              code: `# Start all services
docker compose up

# Start in background
docker compose up -d

# View logs for all services
docker compose logs -f

# Stop all services
docker compose down

# Stop and remove volumes (resets database)
docker compose down -v

# Rebuild images and start
docker compose up --build`,
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'After running <code>docker compose up -d</code>, check all services are healthy:<br><br><code>docker compose ps</code><br><br>Expected output — all services show <strong>Up</strong> status:<pre>NAME         STATUS\nmy-app-api   Up\nmy-app-db    Up\nmy-app-cache Up</pre>View combined logs with <code>docker compose logs -f</code>.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Hot Reload with Volumes',
              html: 'The <code>volumes: - .:/app</code> mount syncs your local code into the container in real-time. Combined with <code>npm run dev</code>, you get hot reload without rebuilding the image.',
            },
          ],
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Common Docker issues and solutions',
          icon: '🔧',
          iconColor: 'bg-rose-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Container exits immediately</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Missing <code>CMD</code> instruction in Dockerfile or entrypoint script error — container has nothing to run and exits with code 0 or non-zero.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Check your Dockerfile has a valid <code>CMD</code> or <code>ENTRYPOINT</code>. Inspect exit logs with <code>docker logs &lt;container&gt;</code> or run interactively: <code>docker run -it my-app:latest /bin/sh</code>.',
            },
            {
              type: 'text',
              html: '<strong>Port already in use</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Another process (or another container) is already bound to the host port you are trying to publish.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Find the occupying process with <code>lsof -i :PORT</code> (e.g., <code>lsof -i :3000</code>) and stop it, or change the host port mapping in your <code>docker run -p</code> or <code>docker-compose.yml</code>.',
            },
            {
              type: 'text',
              html: '<strong>Permission denied on volume mount</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'File ownership mismatch — the container process user does not own the mounted host directory, resulting in read/write permission errors.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Run the container as the host user with <code>--user $(id -u):$(id -g)</code>, or add a <code>RUN chown -R appuser /app</code> in your Dockerfile to set ownership inside the image.',
            },
            {
              type: 'text',
              html: '<strong>Image build fails: COPY file not found</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'The file is excluded by <code>.dockerignore</code>, does not exist at the specified path, or the path is relative to the wrong directory.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Verify the file exists locally and is not listed in <code>.dockerignore</code>. Check the COPY source path is relative to the build context (the directory passed to <code>docker build</code>).',
            },
            {
              type: 'text',
              html: '<strong>Cannot connect between containers</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Containers are on different Docker networks — by default, standalone <code>docker run</code> containers are isolated and cannot reach each other by name.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Use Docker Compose (it creates a shared network automatically) or create a shared network manually: <code>docker network create my-net</code> and pass <code>--network my-net</code> to each <code>docker run</code> command.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
