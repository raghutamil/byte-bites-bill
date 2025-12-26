import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, BarChart3, Settings } from "lucide-react";

export const Header = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "Menu", icon: UtensilsCrossed },
    { path: "/reports", label: "Reports", icon: BarChart3 },
    { path: "/manage", label: "Manage", icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full gradient-warm flex items-center justify-center shadow-warm">
              <span className="text-xl">🍽️</span>
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">
              South Spice
            </h1>
          </Link>

          <nav className="flex items-center gap-1">
            {links.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-warm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
