import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  delay?: number;
  href?: string;
}

export const StatCard = ({
  icon: Icon,
  value,
  label,
  delay = 0,
  href,
}: StatCardProps) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border shadow-card cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      {/* Soft hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* 3 Icon stat card */}
      <motion.div
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-secondary transition-colors duration-300"
      >
        <Icon className="h-7 w-7 text-primary" />
      </motion.div>

      {/* Value */}
      <motion.span
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.15,
          type: "spring",
          stiffness: 180,
        }}
        className="relative text-3xl font-bold text-primary"
      >
        {value.toLocaleString("id-ID")}
      </motion.span>

      {/* Label */}
      <span className="relative text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>

      {/* Arrow */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 0, x: -8 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity duration-300"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </motion.div>
    </motion.div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
};
