import Icon from "@/components/ui/icon";

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Icon name="Wrench" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold tracking-wide uppercase">
              Re<span className="text-primary">Belt</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Профессиональная стыковка и ремонт конвейерных лент по всей России и СНГ с 2008 года.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-bold uppercase text-sm mb-4">Услуги</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Горячая вулканизация</li>
            <li>Холодная вулканизация</li>
            <li>Механические соединения</li>
            <li>Ремонт конвейерных лент</li>
            <li>Футеровка барабанов</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold uppercase text-sm mb-4">Контакты</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Icon name="Phone" size={14} className="text-primary" />
              +7 (952) 930-44-08
            </li>
            <li className="flex items-center gap-2">
              <Icon name="Mail" size={14} className="text-primary" />
              sale@holzerflexo.com
            </li>
            <li className="flex items-center gap-2">
              <Icon name="MapPin" size={14} className="text-primary" />
              г. Москва, ул. Дорожная, 60Б
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">
          © 2008–2026 ReBelt. Все права защищены.
        </p>
        <p className="text-xs text-muted-foreground">
          Работаем по всей России и СНГ
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;