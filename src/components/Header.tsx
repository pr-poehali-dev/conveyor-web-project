import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const services = [
  { slug: "goryachaya-vulkanizaciya", title: "Горячая вулканизация" },
  { slug: "holodnaya-vulkanizaciya", title: "Холодная вулканизация" },
  { slug: "mekhanicheskie-soedineniya", title: "Механические соединения" },
  { slug: "remont-konveyernykh-lent", title: "Ремонт конвейерных лент" },
  { slug: "futerovka-barabanov", title: "Футеровка барабанов" },
  { slug: "tekhnicheskoe-obsluzhivanie", title: "Техническое обслуживание" },
  { slug: "rezinotkanevye-lenty", title: "Резинотканевые ленты" },
  { slug: "pvkh-lenty", title: "ПВХ конвейерные ленты" },
];

const navLinks = [
  { label: "Главная", href: "#hero" },
  { label: "О компании", href: "#about" },
  { label: "Калькулятор", href: "#calculator" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Регионы", href: "#regions" },
  { label: "Галерея", href: "#gallery" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contacts" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded flex items-center justify-center">
            <Icon name="Wrench" size={20} className="text-primary-foreground" />
          </div>
          <span className="font-heading text-xl font-bold tracking-wide uppercase">
            Re<span className="text-primary">Belt</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.slice(0, 1).map((link) => (
            <button
              key={link.href}
              onClick={() => handleAnchorClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Услуги
              <Icon name="ChevronDown" size={14} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                    onClick={() => setServicesOpen(false)}
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <button
              key={link.href}
              onClick={() => handleAnchorClick(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+79529304408" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Icon name="Phone" size={16} className="text-primary" />
            +7 (952) 930-44-08
          </a>
          <Button size="sm" onClick={() => handleAnchorClick("#contacts")}>
            Оставить заявку
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
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleAnchorClick(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 text-left"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-1 pb-1">
              <p className="text-xs font-bold uppercase text-muted-foreground mb-2 mt-1">Услуги</p>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 pl-2"
                  onClick={() => setMobileOpen(false)}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <a href="tel:+79529304408" className="flex items-center gap-2 text-sm font-medium">
              <Icon name="Phone" size={16} className="text-primary" />
              +7 (952) 930-44-08
            </a>
            <Button size="sm" className="w-full" onClick={() => handleAnchorClick("#contacts")}>
              Оставить заявку
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
