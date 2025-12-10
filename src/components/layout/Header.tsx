import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoPandeglang from "@/assets/logo-pandeglang.png";
import navHomeIcon from "@/assets/nav-home-icon.png";
import navMapIcon from "@/assets/nav-map-icon.png";

const navLinks = [
  { href: "/", label: "Beranda", icon: navHomeIcon },
  { href: "/map", label: "Peta", icon: navMapIcon },
];

export const Header = () => {
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background"
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo - Aligned to left */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex h-10 w-10 items-center justify-center"
          >
            <img
              src={logoPandeglang}
              alt="Logo Kabupaten Pandeglang"
              className="h-10 w-auto object-contain mix-blend-multiply"
            />
          </motion.div>
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="font-bold text-foreground text-sm leading-tight">
              Pemetaan Kelompok Petani Padi
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Kab. Pandeglang
            </span>
          </motion.div>
        </Link>

        {/* Navigation - Right side */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.href;
            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              >
                <Link to={link.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className="relative overflow-hidden"
                  >
                    {/* Desktop: show text */}
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hidden sm:inline"
                    >
                      {link.label}
                    </motion.span>
                    {/* Mobile: show icon */}
                    <motion.img
                      src={link.icon}
                      alt={link.label}
                      className="h-5 w-5 object-contain sm:hidden"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
};
