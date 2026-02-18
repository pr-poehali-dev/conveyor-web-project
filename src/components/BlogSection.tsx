import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const articles = [
  {
    date: "12 февраля 2026",
    title: "Горячая vs холодная вулканизация: что выбрать?",
    excerpt: "Разбираем плюсы и минусы каждого метода стыковки. Когда оправдана горячая вулканизация, а когда достаточно холодной.",
    tag: "Технологии",
  },
  {
    date: "5 февраля 2026",
    title: "Как продлить срок службы конвейерной ленты",
    excerpt: "5 практических советов по обслуживанию конвейерных лент, которые помогут избежать внеплановых простоев.",
    tag: "Советы",
  },
  {
    date: "28 января 2026",
    title: "Выполнили проект на ГОК в Якутии при -45°C",
    excerpt: "Рассказываем о сложностях работы в экстремальных условиях Крайнего Севера и наших технических решениях.",
    tag: "Кейсы",
  },
];

const BlogSection = () => (
  <section id="blog" className="py-24">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="steel-line w-12" />
          <span className="text-primary font-medium text-sm uppercase tracking-widest">Блог</span>
          <div className="steel-line w-12 rotate-180" />
        </div>
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">
          Полезные <span className="text-primary">статьи</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Card
            key={article.title}
            className="bg-secondary/50 border-border hover:border-primary/40 transition-all duration-300 cursor-pointer group"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-medium">
                  {article.tag}
                </span>
                <span className="text-xs text-muted-foreground">{article.date}</span>
              </div>
              <h3 className="font-heading text-lg font-bold uppercase mb-3 group-hover:text-primary transition-colors">
                {article.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
              <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium">
                Читать далее
                <Icon name="ArrowRight" size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default BlogSection;
