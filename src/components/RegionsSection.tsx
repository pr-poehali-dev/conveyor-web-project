import Icon from "@/components/ui/icon";

const regions = [
  { name: "Центральный ФО", cities: "Москва, Белгород, Тула, Липецк" },
  { name: "Северо-Западный ФО", cities: "Санкт-Петербург, Мурманск, Вологда" },
  { name: "Южный ФО", cities: "Краснодар, Ростов-на-Дону, Волгоград" },
  { name: "Уральский ФО", cities: "Екатеринбург, Челябинск, Магнитогорск" },
  { name: "Сибирский ФО", cities: "Новосибирск, Кемерово, Красноярск" },
  { name: "Дальневосточный ФО", cities: "Якутск, Владивосток, Хабаровск" },
  { name: "Приволжский ФО", cities: "Казань, Нижний Новгород, Оренбург" },
  { name: "Страны СНГ", cities: "Казахстан, Узбекистан, Кыргызстан" },
];

const RegionsSection = () => (
  <section id="regions" className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="steel-line w-12" />
          <span className="text-primary font-medium text-sm uppercase tracking-widest">География</span>
          <div className="steel-line w-12 rotate-180" />
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">
          Работаем <span className="text-primary">по всей России</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
          Мобильные бригады выезжают в любую точку России и стран СНГ. Собственный автопарк с оборудованием.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {regions.map((region) => (
          <div
            key={region.name}
            className="industrial-border pl-4 py-4 bg-secondary/30 rounded-r-lg hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="font-heading font-bold uppercase text-sm">{region.name}</span>
            </div>
            <p className="text-xs text-muted-foreground">{region.cities}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center p-8 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Icon name="Truck" size={28} className="text-primary" />
          <span className="font-heading text-xl font-bold uppercase">Выезд в течение 24 часов</span>
        </div>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Укомплектованная бригада с необходимым оборудованием и материалами выезжает на объект в день обращения
        </p>
      </div>
    </div>
  </section>
);

export default RegionsSection;
