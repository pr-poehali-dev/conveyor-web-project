import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getServiceBySlug, services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const renderContent = (content: string) => {
  const lines = content.split("\n");
  const result: React.ReactNode[] = [];
  let tableRows: string[][] = [];
  let inTable = false;

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, , ...body] = tableRows;
      result.push(
        <div key={`table-${result.length}`} className="overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                {header.map((cell, i) => (
                  <th key={i} className="border border-border px-4 py-2 text-left bg-secondary font-bold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} className="even:bg-secondary/30">
                  {row.map((cell, ci) => (
                    <td key={ci} className="border border-border px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("|")) {
      inTable = true;
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      tableRows.push(cells);
      return;
    }
    if (inTable) flushTable();

    if (line.startsWith("## ")) {
      result.push(
        <h2 key={i} className="font-heading text-2xl md:text-3xl font-bold uppercase mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      result.push(
        <p key={i} className="font-bold mt-4 mb-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      result.push(
        <li key={i} className="flex items-start gap-2 ml-4 text-muted-foreground">
          <span className="text-primary mt-1.5 text-xs">▶</span>
          {line.slice(2)}
        </li>
      );
    } else if (line.trim() === "") {
      result.push(<div key={i} className="h-2" />);
    } else {
      result.push(
        <p key={i} className="text-muted-foreground leading-relaxed">
          {line}
        </p>
      );
    }
  });

  if (inTable) flushTable();
  return result;
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || "");
  const otherServices = services.filter((s) => s.slug !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="font-heading text-3xl font-bold uppercase">Услуга не найдена</h1>
        <Button asChild>
          <Link to="/">На главную</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
          <Button variant="outline" size="sm" asChild>
            <Link to="/" className="flex items-center gap-2">
              <Icon name="ArrowLeft" size={16} />
              Назад
            </Link>
          </Button>
        </div>
      </header>

      <main className="pt-24 pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded bg-primary/10 flex items-center justify-center shrink-0">
              <Icon name={service.icon} size={28} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-primary font-medium uppercase tracking-widest mb-1">Наши услуги</p>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-tight">
                {service.title}
              </h1>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{service.desc}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {service.features.map((f) => (
              <span key={f} className="text-sm bg-primary/10 text-primary px-3 py-1.5 rounded font-medium">
                {f}
              </span>
            ))}
          </div>

          <div className="h-px bg-border mb-8" />

          <div>{renderContent(service.content)}</div>

          <div className="mt-12 p-6 bg-secondary/50 border border-border rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-heading font-bold uppercase mb-1">Нужна консультация?</p>
              <p className="text-muted-foreground text-sm">Позвоним, ответим на вопросы, рассчитаем стоимость</p>
            </div>
            <Button size="lg" asChild className="shrink-0">
              <Link to="/#contacts">Оставить заявку</Link>
            </Button>
          </div>

          {otherServices.length > 0 && (
            <div className="mt-16">
              <h2 className="font-heading text-2xl font-bold uppercase mb-6">Другие услуги</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherServices.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`}>
                    <Card className="bg-secondary/50 border-border hover:border-primary/40 transition-all duration-300 group h-full">
                      <CardContent className="p-4 flex items-start gap-3">
                        <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Icon name={s.icon} size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-heading text-sm font-bold uppercase group-hover:text-primary transition-colors">
                            {s.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ServicePage;
