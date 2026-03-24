import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { services } from "@/data/services";

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
          <Link key={service.slug} to={`/services/${service.slug}`}>
            <Card className="bg-secondary/50 border-border hover:border-primary/40 transition-all duration-300 group h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon name={service.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-heading text-lg font-bold uppercase mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{service.desc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.features.map((f) => (
                    <span key={f} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-primary text-sm font-medium mt-auto">
                  Подробнее
                  <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
