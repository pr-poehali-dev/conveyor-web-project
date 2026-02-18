import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/46438581-134f-4116-a078-ece934f09d20/files/56a48e5c-5656-4df7-b35a-7cabec99c328.jpg";

const HeroSection = () => (
  <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
    <div className="absolute inset-0">
      <img src={HERO_IMG} alt="Стыковка конвейерных лент" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
    </div>

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-2xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="steel-line w-12" />
          <span className="text-primary font-medium text-sm uppercase tracking-widest">С 2008 года на рынке</span>
        </div>

        <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase leading-tight mb-6">
          Стыковка и ремонт
          <span className="text-gradient block">конвейерных лент</span>
        </h1>

        <p className="text-lg text-muted-foreground mb-8 max-w-lg font-light">
          Профессиональная горячая и холодная вулканизация. Выезд бригады по всей России и странам СНГ в течение 24 часов.
        </p>

        <div className="flex flex-wrap gap-4 mb-12">
          <Button size="lg" className="font-heading uppercase tracking-wider" asChild>
            <a href="#calculator">
              <Icon name="Calculator" size={18} className="mr-2" />
              Рассчитать стоимость
            </a>
          </Button>
          <Button size="lg" variant="outline" className="font-heading uppercase tracking-wider border-primary/30 hover:bg-primary/10" asChild>
            <a href="#contacts">
              <Icon name="Phone" size={18} className="mr-2" />
              Вызвать бригаду
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-md">
          {[
            { value: "1500+", label: "Стыковок выполнено" },
            { value: "24ч", label: "Выезд бригады" },
            { value: "85+", label: "Регионов обслуживания" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-heading text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <Icon name="ChevronDown" size={28} className="text-primary/60" />
    </div>
  </section>
);

export default HeroSection;
