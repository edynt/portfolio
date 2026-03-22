export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  iconBg: string;
  url: string;
  tags: string[];
  status: "live" | "beta" | "development";
}

export const products: Product[] = [
  {
    id: "termoras",
    name: "Termoras",
    tagline: "Project-based terminal manager",
    description:
      "Desktop app that groups terminals by project — integrates task boards, Git, and command automation. Manage multiple projects with organized terminal sessions, quick commands, and built-in workflow tools.",
    icon: "🖥",
    iconBg: "from-violet-500 to-purple-700",
    url: "https://termoras.vercel.app",
    tags: ["Desktop App", "Terminal", "Git", "Productivity"],
    status: "live",
  },
];
