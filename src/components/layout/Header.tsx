import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoPandeglang from "@/assets/logo-pandeglang.png";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/map", label: "Peta" },
];

export const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-10 w-10 items-center justify-center"
          >
            <img 
              src={logoPandeglang} 
              alt="Logo Kabupaten Pandeglang" 
              className="h-10 w-auto object-contain mix-blend-multiply"
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm leading-tight">
              Pemetaan Kelompok Petani Padi
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Kab. Pandeglang
            </span>
          </div>
        </Link>

        {/* Navigation - Always visible, centered on mobile */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="relative"
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
};
