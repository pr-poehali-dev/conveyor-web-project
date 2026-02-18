import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const services = [
  {
    icon: "Flame",
    title: "Горячая вулканизация",
    desc: "Стыковка конвейерных лент методом горячей вулканизации с применением пресса. Максимальная прочность соединения до 95% от прочности ленты.",
    features: ["Резинотканевые ленты", "Резинотросовые ленты", "ПВХ ленты"],
  },
  {
    icon: "Snowflake",
    title: "Холодная вулканизация",
    desc: "Стыковка с использованием двухкомпонентных клеевых составов. Оптимальное решение для быстрого восстановления работы конвейера.",
    features: ["Быстрый монтаж", "Без нагрева", "Экономичность"],
  },
  {
    icon: "Wrench",
    title: "Ремонт конвейерных лент",
    desc: "Восстановление повреждённых участков ленты: порезы, пробои, расслоения. Продление срока службы ленты без полной замены.",
    features: ["Латки и заплатки", "Восстановление кромок", "Ремонт стыков"],
  },
  {
    icon: "ClipboardCheck",
    title: "Механические соединения",
    desc: "Установка механических замков и скоб для оперативного восстановления конвейера. Временное и постоянное решение.",
    features: ["Замки Flexco", "Скобы Mato", "Шарнирные соединения"],
  },
  {
    icon: "HardHat",
    title: "Футеровка барабанов",
    desc: "Нанесение износостойкого резинового покрытия на приводные и натяжные барабаны для увеличения сцепления с лентой.",
    features: ["Горячая футеровка", "Холодная футеровка", "Керамическая"],
  },
  {
    icon: "Cog",
    title: "Обслуживание конвейеров",
    desc: "Комплексное техническое обслуживание конвейерных систем: диагностика, регулировка, замена роликов и элементов.",
    features: ["Диагностика", "Регулировка", "Замена комплектующих"],
  },
];

const ServicesSection = () => (
  <section id="services" className="py-24 metal-bg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="steel-line w-12" />
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Наши услуги</span>
          <div className="steel-line w-12 rotate-180" />
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">
          Полный спектр <span className="text-primary">услуг</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.title} className="bg-secondary/50 border-border hover:border-primary/40 transition-all duration-300 group">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon name={service.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-heading text-lg font-bold uppercase mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{service.desc}</p>
              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {f}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
