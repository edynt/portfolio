"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { products } from "@/data/products-data";

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

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">Products</h2>
          <p className="text-theme-secondary max-w-2xl mx-auto">
            Tools and applications I&apos;ve built to solve real problems.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {products.map((product, index) => (
            <motion.a
              key={product.id}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-card rounded-2xl p-6 hover:border-primary-500/30 transition-all duration-200 block"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl ${product.icon.startsWith("http") ? "" : `bg-gradient-to-br ${product.iconBg}`} flex items-center justify-center text-2xl shrink-0 shadow-lg overflow-hidden`}
                >
                  {product.icon.startsWith("http") ? (
                    <img
                      src={product.icon}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    product.icon
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-theme-primary group-hover:text-primary-400 transition-colors">
                      {product.name}
                    </h3>
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
