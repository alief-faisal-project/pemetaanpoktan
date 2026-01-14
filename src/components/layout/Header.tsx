import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logoPandeglang from "@/assets/logo-pandeglang.png";
import { FaHome, FaMapMarkedAlt } from "react-icons/fa";

const navLinks = [
  { href: "/", label: "Beranda", icon: FaHome },
  { href: "/map", label: "Peta", icon: FaMapMarkedAlt },
];

export const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/"
          className="relative z-20 flex items-center gap-3 flex-shrink-0 cursor-pointer"
        >
          <div className="flex h-10 w-10 items-center justify-center">
            <img
              src={logoPandeglang}
              alt="Logo Kabupaten Pandeglang"
              className="h-10 w-auto object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-bold text-foreground text-sm leading-tight">
              Pemetaan Kelompok Petani Padi
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              Kab. Pandeglang
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            const Icon = link.icon;

            return (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="relative overflow-hidden"
                >
                  {/* Desktop */}
                  <span className="hidden sm:inline">{link.label}</span>

                  {/* Mobile */}
                  <span className="sm:hidden">
                    <Icon className="h-5 w-5" />
                  </span>

                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 rounded-md -z-10" />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
