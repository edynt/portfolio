import Navbar from "@/components/navbar";
import { products } from "@/data/products-data";
import { ExternalLink } from "lucide-react";

const statusStyles = {
  live: "bg-green-500/10 text-green-400 border-green-500/20",
  beta: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  development: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

const statusLabels = {
  live: "Live",
  beta: "Beta",
  development: "In Development",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Hero */}
        <div className="glass py-16 px-6 text-center border-b border-white/10">
          <div className="max-w-lg mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-500/10 text-primary-400 text-xs font-semibold rounded-full mb-5 border border-primary-500/20">
              🚀 Personal Products
            </span>
            <h1 className="text-4xl font-extrabold text-theme-primary mb-3 tracking-tight leading-tight">
              Products
            </h1>
            <p className="text-theme-secondary text-base leading-relaxed">
              Tools and applications I&apos;ve built to solve real problems.
            </p>
          </div>
        </div>

        {/* Product grid */}
        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <a
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-200 block"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.iconBg} flex items-center justify-center text-2xl shrink-0 shadow-lg`}
                  >
                    {product.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-lg font-bold text-theme-primary group-hover:text-primary-400 transition-colors">
                        {product.name}
                      </h2>
                      <ExternalLink
                        size={14}
                        className="text-theme-muted group-hover:text-primary-400 transition-colors shrink-0"
                      />
                    </div>
                    <p className="text-sm text-theme-muted">{product.tagline}</p>
                  </div>
                </div>

                {/* Status badge */}
                <div className="mb-3">
                  <span
                    className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusStyles[product.status]}`}
                  >
                    {statusLabels[product.status]}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-theme-secondary leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2 py-0.5 bg-white/5 text-theme-muted rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
