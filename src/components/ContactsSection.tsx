import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import funcUrls from "../../backend/func2url.json";

const contactInfo = [
  { icon: "Phone", label: "Телефон", value: "+7 (952) 930-44-08", href: "tel:+79529304408" },
  { icon: "Mail", label: "E-mail", value: "sale@holzerflexo.com", href: "mailto:sale@holzerflexo.com" },
  { icon: "MapPin", label: "Офис", value: "г. Москва, ул. Дорожная, 60Б", href: "#" },
  { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 8:00–18:00, экстренный выезд 24/7", href: "#" },
];

const ContactsSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch(funcUrls["send-lead"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        toast({ title: "Заявка отправлена!", description: "Наш менеджер свяжется с вами в ближайшее время." });
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        toast({ title: "Ошибка", description: data.error || "Попробуйте позже", variant: "destructive" });
      }
    } catch {
      toast({ title: "Ошибка сети", description: "Проверьте подключение и попробуйте снова", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacts" className="py-24 metal-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="steel-line w-12" />
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Контакты</span>
            <div className="steel-line w-12 rotate-180" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">
            Свяжитесь <span className="text-primary">с нами</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="font-heading text-2xl font-bold uppercase mb-6">Оставьте заявку</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-heading uppercase tracking-wider mb-2 block">Ваше имя</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Петров"
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <Label className="text-sm font-heading uppercase tracking-wider mb-2 block">Телефон</Label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+7 (999) 123-45-67"
                  required
                  className="bg-background"
                />
              </div>
              <div>
                <Label className="text-sm font-heading uppercase tracking-wider mb-2 block">E-mail</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="info@company.ru"
                  className="bg-background"
                />
              </div>
              <div>
                <Label className="text-sm font-heading uppercase tracking-wider mb-2 block">Сообщение</Label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Опишите задачу: тип ленты, ширина, количество стыков, местоположение объекта..."
                  rows={4}
                  className="bg-background"
                />
              </div>
              <Button type="submit" size="lg" className="w-full font-heading uppercase tracking-wider" disabled={sending}>
                <Icon name={sending ? "Loader2" : "Send"} size={18} className={`mr-2 ${sending ? "animate-spin" : ""}`} />
                {sending ? "Отправка..." : "Отправить заявку"}
              </Button>
            </form>
          </div>

          <div>
            <h3 className="font-heading text-2xl font-bold uppercase mb-6">Контактная информация</h3>
            <div className="space-y-4 mb-8">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
                    <div className="font-medium text-sm mt-0.5">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-6 text-center">
                <Icon name="AlertTriangle" size={32} className="text-primary mx-auto mb-3" />
                <h4 className="font-heading font-bold uppercase mb-2">Экстренный выезд</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Конвейер встал? Звоните на горячую линию — выезжаем круглосуточно!
                </p>
                <a
                  href="tel:+79529304408"
                  className="font-heading text-2xl font-bold text-primary hover:underline"
                >
                  +7 (952) 930-44-08
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;