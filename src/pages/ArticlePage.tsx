import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getArticleBySlug } from "@/data/articles";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="font-heading text-3xl font-bold uppercase">Статья не найдена</h1>
        <Button asChild>
          <Link to="/">На главную</Link>
        </Button>
      </div>
    );
  }

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

      if (inTable) {
        flushTable();
      }

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
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded font-medium">
              {article.tag}
            </span>
            <span className="text-sm text-muted-foreground">{article.date}</span>
          </div>

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-8 leading-tight">
            {article.title}
          </h1>

          <div className="h-px bg-border mb-8" />

          <div className="prose prose-sm max-w-none">
            {renderContent(article.content)}
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">Есть вопросы? Свяжитесь с нами</p>
            <Button asChild>
              <Link to="/#contacts">Оставить заявку</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;
