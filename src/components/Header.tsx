import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Регионы", href: "#regions" },
  { label: "Галерея", href: "#gallery" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#hero" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded flex items-center justify-center">
            <Icon name="Wrench" size={20} className="text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-wide uppercase">
            Конвейер<span className="text-primary">Сервис</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+78001234567" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Icon name="Phone" size={16} className="text-primary" />
            8 (800) 123-45-67
          </a>
          <Button size="sm" asChild>
            <a href="#contacts">Оставить заявку</a>
          </Button>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <Icon name={mobileOpen ? "X" : "Menu"} size={24} />
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <a href="tel:+78001234567" className="flex items-center gap-2 text-sm font-medium">
              <Icon name="Phone" size={16} className="text-primary" />
              8 (800) 123-45-67
            </a>
            <Button size="sm" className="w-full" asChild>
              <a href="#contacts">Оставить заявку</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
