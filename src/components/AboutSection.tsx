import Icon from "@/components/ui/icon";

const IMG_2 = "https://cdn.poehali.dev/projects/46438581-134f-4116-a078-ece934f09d20/files/6412ad52-9f43-4a9c-a29d-3c65b6b67f7d.jpg";

const advantages = [
  { icon: "Shield", title: "Гарантия до 3 лет", desc: "На все виды стыковок и ремонтных работ" },
  { icon: "Clock", title: "Выезд за 24 часа", desc: "Оперативная мобилизация бригады" },
  { icon: "Award", title: "Сертификация", desc: "Все специалисты сертифицированы по ISO" },
  { icon: "Users", title: "Опытная команда", desc: "Средний стаж сотрудников — 12 лет" },
];

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="steel-line w-12" />
            <span className="text-primary font-medium text-sm uppercase tracking-widest">О компании</span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-6">
            Надёжный партнёр<br />
            <span className="text-primary">в промышленности</span>
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            ReBelt — ведущая компания в области стыковки и ремонта конвейерных лент.
            Мы работаем с горнодобывающими предприятиями, заводами, логистическими центрами
            и портами по всей России и СНГ. Наша миссия — минимизировать простои вашего оборудования.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {advantages.map((item) => (
              <div key={item.title} className="industrial-border pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name={item.icon} size={18} className="text-primary" />
                  <span className="font-heading font-semibold uppercase text-sm">{item.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <img
            src={IMG_2}
            alt="Конвейерная система"
            className="rounded-lg w-full object-cover aspect-[4/3]"
          />
          <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-lg">
            <div className="font-heading text-4xl font-bold">17+</div>
            <div className="text-sm font-medium">лет на рынке</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;