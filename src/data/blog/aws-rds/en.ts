import type { Tutorial } from '@/types/tutorial';

const tutorial: Tutorial = {
  id: 'aws-rds',
  title: 'AWS RDS Free Tier Setup',
  description:
    'Set up PostgreSQL on AWS RDS Free Tier for development — from creation to connection',
  icon: '🗄️',
  chapters: [
    {
      id: 'chapter1',
      title: 'Overview & Preparation',
      sections: [
        {
          id: 'overview',
          title: 'Overview',
          subtitle: 'What is RDS Free Tier and what you get',
          icon: '📋',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'callout',
              variant: 'info',
              title: 'AWS RDS Free Tier',
              html: 'Amazon RDS (Relational Database Service) Free Tier gives you <strong>750 hours/month</strong> of a managed database for <strong>12 months</strong> after account creation. Perfect for development and learning.',
            },
            {
              type: 'text',
              html: '<strong>Free Tier includes:</strong>',
            },
            {
              type: 'table',
              caption: 'RDS Free Tier Limits',
              headers: ['Resource', 'Free Tier Limit'],
              rows: [
                ['Instance', '<code>db.t3.micro</code> or <code>db.t4g.micro</code>'],
                ['Hours', '750 hours/month (enough for 1 instance 24/7)'],
                ['Storage', '20 GB General Purpose SSD (gp2)'],
                ['Backup', '20 GB automated backup storage'],
                ['Duration', '12 months from account creation'],
              ],
            },
            {
              type: 'text',
              html: '<strong>Supported databases (Free Tier):</strong>',
            },
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '🐘',
                  title: 'PostgreSQL',
                  description: 'Recommended — powerful, standards-compliant, great ecosystem',
                },
                {
                  icon: '🐬',
                  title: 'MySQL',
                  description: 'Most popular — wide community support, mature tooling',
                },
                {
                  icon: '🦭',
                  title: 'MariaDB',
                  description: 'MySQL fork — community-driven, fully compatible',
                },
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Cost Warning',
              html: '<ul><li>Multi-AZ deployments are <strong>NOT free</strong> — always select Single-AZ</li><li>Storage auto-scaling can exceed 20 GB — <strong>disable it</strong></li><li>After 12 months, db.t3.micro costs ~$13-15/month</li><li><strong>Delete resources when not in use to avoid charges</strong></li></ul>',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'Prerequisites',
              html: '<ul><li>AWS Account (with credit card registered)</li><li>Region: <code>us-east-1</code> (N. Virginia) — or your preferred region</li><li>Time: ~15-20 minutes</li></ul>',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter2',
      title: 'Create RDS Instance',
      sections: [
        {
          id: 'step1-create',
          title: 'Step 1: Create RDS Database',
          subtitle: 'Launch a PostgreSQL instance on Free Tier',
          icon: '🗄️',
          iconColor: 'bg-blue-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Sign in to AWS Console: https://console.aws.amazon.com',
                'Search for "RDS" → select <strong>Amazon RDS</strong>',
                'Check region in top right = <strong>your chosen region</strong>',
                'Click <strong>Create database</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Database creation method:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Select <strong>Standard create</strong> (more control over settings)',
                'Engine type: <strong>PostgreSQL</strong>',
                'Engine version: select the latest available (e.g., PostgreSQL 16.x)',
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'IMPORTANT: Select Free Tier Template',
              html: 'In the <strong>Templates</strong> section, select <strong>Free tier</strong>. This auto-sets Single-AZ, db.t3.micro, and disables features that cost money.',
            },
            {
              type: 'text',
              html: '<strong>Settings:</strong>',
            },
            {
              type: 'table',
              caption: 'Instance Configuration',
              headers: ['Setting', 'Value'],
              rows: [
                ['DB instance identifier', '<code>dev-postgres</code> (or your preferred name)'],
                ['Master username', '<code>postgres</code> (default)'],
                ['Credentials management', '<strong>Self managed</strong>'],
                ['Master password', 'Create a strong password and <strong>save it immediately</strong>'],
              ],
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Save Your Password!',
              html: 'AWS will NOT show the master password again after creation. Store it in a password manager or safe location.',
            },
          ],
        },
        {
          id: 'step2-config',
          title: 'Step 2: Instance Configuration',
          subtitle: 'Stay within Free Tier limits',
          icon: '⚙️',
          iconColor: 'bg-orange-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Instance configuration (auto-set by Free Tier template):</strong>',
            },
            {
              type: 'table',
              caption: 'Instance Settings',
              headers: ['Setting', 'Value', 'Why'],
              rows: [
                ['DB instance class', '<code>db.t3.micro</code>', 'Free Tier eligible — 1 vCPU, 1 GB RAM'],
                ['Storage type', 'General Purpose SSD (gp2)', 'Free Tier includes gp2'],
                ['Allocated storage', '<code>20</code> GB', 'Max free storage'],
                ['Storage autoscaling', '<strong>Uncheck</strong> Enable', 'Prevent exceeding 20 GB limit'],
                ['Multi-AZ', '<strong>Do not create</strong> standby', 'Multi-AZ is NOT free'],
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Disable Storage Autoscaling',
              html: 'Storage autoscaling is enabled by default. <strong>Uncheck "Enable storage autoscaling"</strong> to stay within the 20 GB free limit. If storage grows beyond 20 GB, you will be charged.',
            },
          ],
        },
        {
          id: 'step3-connectivity',
          title: 'Step 3: Connectivity Settings',
          subtitle: 'Network access for development',
          icon: '🌐',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Connectivity configuration:</strong>',
            },
            {
              type: 'table',
              caption: 'Connectivity Settings',
              headers: ['Setting', 'Value'],
              rows: [
                ['Compute resource', '<strong>Don\'t connect to an EC2 compute resource</strong>'],
                ['Network type', 'IPv4'],
                ['VPC', 'Default VPC'],
                ['DB subnet group', 'default'],
                ['Public access', '<strong>Yes</strong> (for development — allows connecting from your local machine)'],
                ['VPC security group', '<strong>Create new</strong>'],
                ['New VPC security group name', '<code>rds-dev-sg</code>'],
                ['Availability Zone', 'No preference'],
              ],
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'Public Access = Yes',
              html: 'For <strong>development only</strong>, set Public access to <strong>Yes</strong> so you can connect from your local machine. For production, always set to <strong>No</strong> and use VPC peering or SSH tunneling.',
            },
            {
              type: 'text',
              html: '<strong>Database authentication:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Select <strong>Password authentication</strong> (simplest for development)',
              ],
            },
          ],
        },
        {
          id: 'step4-additional',
          title: 'Step 4: Additional Configuration',
          subtitle: 'Database name, backup, and maintenance',
          icon: '📝',
          iconColor: 'bg-purple-100',
          blocks: [
            {
              type: 'step-list',
              items: [
                'Expand <strong>Additional configuration</strong> section',
                'Initial database name: <code>devdb</code> (if empty, no default database is created)',
                'DB parameter group: default',
                'Option group: default',
              ],
            },
            {
              type: 'text',
              html: '<strong>Backup settings (cost optimization):</strong>',
            },
            {
              type: 'table',
              caption: 'Backup Configuration',
              headers: ['Setting', 'Value', 'Why'],
              rows: [
                ['Automated backups', 'Enable (keep default)', 'Free up to 20 GB backup storage'],
                ['Backup retention', '<code>7</code> days', 'Default, free within 20 GB'],
                ['Backup window', 'No preference', 'AWS picks a low-traffic time'],
              ],
            },
            {
              type: 'text',
              html: '<strong>Other settings:</strong>',
            },
            {
              type: 'table',
              caption: 'Additional Settings',
              headers: ['Setting', 'Value'],
              rows: [
                ['Encryption', 'Enable (default, no extra cost)'],
                ['Performance Insights', '<strong>Uncheck</strong> (not Free Tier)'],
                ['Enhanced monitoring', '<strong>Disable</strong> (not Free Tier)'],
                ['Maintenance window', 'No preference'],
                ['Deletion protection', '<strong>Uncheck</strong> (for dev — allows easy deletion)'],
              ],
            },
            {
              type: 'step-list',
              items: [
                'Review the <strong>Estimated monthly costs</strong> section — should show <strong>Free tier</strong>',
                'Click <strong>Create database</strong>',
                'Wait 5-10 minutes for the instance to become <strong>Available</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify',
              html: 'RDS → Databases → <code>dev-postgres</code> shows status <strong>Available</strong>. Note the <strong>Endpoint</strong> URL — you\'ll need it to connect.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter3',
      title: 'Security & Connection',
      sections: [
        {
          id: 'step5-security',
          title: 'Step 5: Configure Security Group',
          subtitle: 'Allow your IP to access the database',
          icon: '🔒',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: 'The default security group only allows access from within the VPC. You need to add your IP address to connect from your local machine.',
            },
            {
              type: 'step-list',
              items: [
                'Go to RDS → Databases → <code>dev-postgres</code>',
                'In <strong>Connectivity & security</strong> tab, click the security group link (e.g., <code>rds-dev-sg</code>)',
                'This opens <strong>EC2 → Security Groups</strong>',
                'Select the security group → <strong>Inbound rules</strong> tab → <strong>Edit inbound rules</strong>',
                'Add rule: Type: <strong>PostgreSQL</strong> | Port: <code>5432</code> | Source: <strong>My IP</strong>',
                'Click <strong>Save rules</strong>',
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Dynamic IP?',
              html: 'If your ISP changes your IP frequently, you can use <strong>Anywhere-IPv4</strong> (0.0.0.0/0) during development. But <strong>never do this in production</strong> — it exposes your database to the entire internet.',
            },
            {
              type: 'callout',
              variant: 'info',
              title: 'For EC2 → RDS Connection',
              html: 'If connecting from an EC2 instance in the same VPC, add a rule: Type: <strong>PostgreSQL</strong> | Port: <code>5432</code> | Source: <strong>Security group of the EC2 instance</strong>.',
            },
          ],
        },
        {
          id: 'step6-connect',
          title: 'Step 6: Connect to Database',
          subtitle: 'From terminal, GUI tools, and applications',
          icon: '🔌',
          iconColor: 'bg-green-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Get connection details:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Go to RDS → Databases → <code>dev-postgres</code>',
                'Copy the <strong>Endpoint</strong> (e.g., <code>dev-postgres.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com</code>)',
                'Port: <code>5432</code> (default PostgreSQL)',
                'Database: <code>devdb</code> (the initial database name)',
                'Username: <code>postgres</code>',
                'Password: the one you set in Step 1',
              ],
            },
            {
              type: 'text',
              html: '<strong>Method 1: Connect with psql (terminal):</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: 'psql connection',
              code: `# Install psql if needed
# macOS: brew install postgresql
# Ubuntu: sudo apt install postgresql-client

# Connect to RDS
psql -h dev-postgres.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com \\
     -p 5432 \\
     -U postgres \\
     -d devdb

# You'll be prompted for the password`,
            },
            {
              type: 'text',
              html: '<strong>Method 2: Connection string (for applications):</strong>',
            },
            {
              type: 'code',
              lang: 'bash',
              filename: '.env',
              code: `# PostgreSQL connection string format
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@dev-postgres.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com:5432/devdb

# With SSL (recommended)
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@dev-postgres.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com:5432/devdb?sslmode=require`,
            },
            {
              type: 'text',
              html: '<strong>Method 3: GUI tools (DBeaver, pgAdmin, TablePlus):</strong>',
            },
            {
              type: 'table',
              caption: 'Connection Settings for GUI Tools',
              headers: ['Field', 'Value'],
              rows: [
                ['Host', '<code>dev-postgres.xxxxxxxxxxxx.us-east-1.rds.amazonaws.com</code>'],
                ['Port', '<code>5432</code>'],
                ['Database', '<code>devdb</code>'],
                ['Username', '<code>postgres</code>'],
                ['Password', 'Your master password'],
                ['SSL', 'Require (recommended)'],
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify Connection',
              html: 'Run <code>SELECT version();</code> — should return the PostgreSQL version. If you see the result, your RDS is set up correctly!',
            },
          ],
        },
        {
          id: 'step7-app',
          title: 'Step 7: Connect from Application',
          subtitle: 'NestJS / Express example with TypeORM',
          icon: '💻',
          iconColor: 'bg-indigo-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Node.js with pg (native driver):</strong>',
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

// Test connection
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
  synchronize: true, // dev only — never in production!
})`,
            },
            {
              type: 'callout',
              variant: 'warn',
              title: 'SSL Note',
              html: '<code>rejectUnauthorized: false</code> is acceptable for development. For production, download the <strong>AWS RDS CA certificate</strong> and set <code>ca</code> in the SSL options.',
            },
          ],
        },
      ],
    },
    {
      id: 'chapter4',
      title: 'Best Practices & Cleanup',
      sections: [
        {
          id: 'best-practices',
          title: 'Development Best Practices',
          subtitle: 'Stay free and stay safe',
          icon: '✨',
          iconColor: 'bg-yellow-100',
          blocks: [
            {
              type: 'feature-grid',
              items: [
                {
                  icon: '💰',
                  title: 'Monitor Costs',
                  description:
                    'Set up AWS Budgets alert at $1. Go to AWS Budgets → Create budget → Monthly → $1 threshold → email notification.',
                },
                {
                  icon: '⏸️',
                  title: 'Stop When Idle',
                  description:
                    'Stop the RDS instance when not in use. RDS → select instance → Actions → Stop temporarily. It auto-starts after 7 days.',
                },
                {
                  icon: '🔒',
                  title: 'Restrict IP Access',
                  description:
                    'Always use "My IP" in security group rules. Never leave 0.0.0.0/0 open for database ports in production.',
                },
                {
                  icon: '📊',
                  title: 'Check Free Tier Usage',
                  description:
                    'Go to AWS Billing → Free Tier dashboard to monitor usage vs limits. Check weekly.',
                },
              ],
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Stop vs Delete',
              html: '<strong>Stop temporarily:</strong> Instance pauses, no compute charges, but storage charges continue (free up to 20 GB). Auto-restarts after 7 days.<br/><strong>Delete:</strong> Permanently removes instance and data. No charges at all. Choose "No" for final snapshot if you don\'t need the data.',
            },
            {
              type: 'table',
              caption: 'Free Tier Checklist',
              headers: ['Setting', 'Free', 'Not Free'],
              rows: [
                ['Instance class', '<code>db.t3.micro</code> / <code>db.t4g.micro</code>', 'db.t3.small and above'],
                ['Storage', '≤ 20 GB gp2', '> 20 GB or gp3/io1'],
                ['Multi-AZ', 'Single-AZ', 'Multi-AZ deployment'],
                ['Backup storage', '≤ 20 GB', '> 20 GB'],
                ['Data transfer', '1 GB/month outbound', '> 1 GB outbound'],
                ['Performance Insights', 'Disabled', 'Enabled'],
                ['Enhanced monitoring', 'Disabled', 'Enabled'],
              ],
            },
          ],
        },
        {
          id: 'cleanup',
          title: 'Cleanup: Delete RDS Instance',
          subtitle: 'Avoid surprise charges',
          icon: '🗑️',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'callout',
              variant: 'danger',
              title: 'Important: Delete When Done',
              html: 'If you no longer need the database, <strong>delete it</strong> to avoid charges after your Free Tier expires. Stopped instances still incur storage charges and auto-restart after 7 days.',
            },
            {
              type: 'step-list',
              items: [
                'Go to <strong>RDS → Databases</strong>',
                'Select <code>dev-postgres</code>',
                'Click <strong>Actions → Delete</strong>',
                '<strong>Uncheck</strong> "Create final snapshot" (unless you need a backup)',
                '<strong>Check</strong> "I acknowledge that upon instance deletion, automated backups will no longer be available"',
                'Type <code>delete me</code> to confirm',
                'Click <strong>Delete</strong>',
              ],
            },
            {
              type: 'text',
              html: '<strong>Also clean up:</strong>',
            },
            {
              type: 'step-list',
              items: [
                'Delete the security group: <strong>EC2 → Security Groups</strong> → find <code>rds-dev-sg</code> → Delete',
                'Check for any manual snapshots: <strong>RDS → Snapshots</strong> → delete if not needed',
              ],
            },
            {
              type: 'callout',
              variant: 'ok',
              title: 'Verify Cleanup',
              html: '<ul><li>RDS → Databases: no instances</li><li>RDS → Snapshots: no manual snapshots</li><li>EC2 → Security Groups: <code>rds-dev-sg</code> deleted</li><li>AWS Billing dashboard: no unexpected charges</li></ul>',
            },
          ],
        },
        {
          id: 'troubleshooting',
          title: 'Troubleshooting',
          subtitle: 'Common issues and fixes',
          icon: '🔧',
          iconColor: 'bg-red-100',
          blocks: [
            {
              type: 'text',
              html: '<strong>Cannot connect: timeout</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Security group doesn\'t allow your IP, or Public access is set to No.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: '<ol><li>Check security group inbound rules — add your IP for port 5432</li><li>Check RDS instance → Publicly accessible = Yes</li><li>If IP changed, update the security group rule</li></ol>',
            },
            {
              type: 'text',
              html: '<strong>FATAL: password authentication failed</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Wrong password or username.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Reset password: RDS → select instance → <strong>Modify</strong> → set new master password → <strong>Apply immediately</strong>. Wait 1-2 minutes.',
            },
            {
              type: 'text',
              html: '<strong>FATAL: database "devdb" does not exist</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'You left "Initial database name" empty during creation.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Connect to the default <code>postgres</code> database first, then run: <code>CREATE DATABASE devdb;</code>',
            },
            {
              type: 'text',
              html: '<strong>Unexpected charges appearing</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'Storage autoscaling exceeded 20 GB, or Multi-AZ was accidentally enabled, or Free Tier expired.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: '<ol><li>Check AWS Billing → Bills for line items</li><li>Check RDS instance settings for Multi-AZ or storage > 20 GB</li><li>Check Free Tier dashboard for expiration date</li><li>Delete instance if no longer needed</li></ol>',
            },
            {
              type: 'text',
              html: '<strong>Instance stuck in "Starting" or "Modifying"</strong>',
            },
            {
              type: 'callout',
              variant: 'danger',
              title: 'Cause',
              html: 'RDS operations can take 5-15 minutes. Some modifications require a reboot.',
            },
            {
              type: 'callout',
              variant: 'tip',
              title: 'Fix',
              html: 'Wait 15 minutes. If still stuck, check <strong>Events</strong> in the RDS console for error details. You can also try <strong>Actions → Reboot</strong>.',
            },
          ],
        },
      ],
    },
  ],
};

export default tutorial;
