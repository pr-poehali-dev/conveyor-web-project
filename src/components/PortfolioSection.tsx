import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const projects = [
  {
    title: "ГОК «Северный»",
    location: "Мурманская область",
    type: "Горячая вулканизация",
    belt: "Резинотросовая ST-2500, 1600 мм",
    result: "12 стыков за 5 дней",
  },
  {
    title: "Цементный завод «ЕвроЦемент»",
    location: "Белгородская область",
    type: "Холодная вулканизация",
    belt: "Резинотканевая EP-400/3, 1200 мм",
    result: "8 стыков за 3 дня",
  },
  {
    title: "Порт Новороссийск",
    location: "Краснодарский край",
    type: "Горячая вулканизация",
    belt: "Резинотканевая EP-630/4, 1400 мм",
    result: "6 стыков за 2 дня",
  },
  {
    title: "Разрез «Кузнецкий»",
    location: "Кемеровская область",
    type: "Механическое соединение",
    belt: "Резинотросовая ST-3150, 2000 мм",
    result: "4 стыка за 1 день",
  },
];

const PortfolioSection = () => (
  <section id="portfolio" className="py-24 metal-bg">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="steel-line w-12" />
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Портфолио</span>
          <div className="steel-line w-12 rotate-180" />
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">
          Наши <span className="text-primary">проекты</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.title} className="bg-secondary/50 border-border hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase">{project.title}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <Icon name="MapPin" size={14} className="text-primary" />
                    {project.location}
                  </div>
                </div>
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="Factory" size={20} className="text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Wrench" size={14} className="text-primary shrink-0" />
                  <span className="text-muted-foreground">Метод:</span>
                  <span className="font-medium">{project.type}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Ruler" size={14} className="text-primary shrink-0" />
                  <span className="text-muted-foreground">Лента:</span>
                  <span className="font-medium">{project.belt}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="CheckCircle" size={14} className="text-green-500 shrink-0" />
                  <span className="text-muted-foreground">Результат:</span>
                  <span className="font-medium text-primary">{project.result}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioSection;
