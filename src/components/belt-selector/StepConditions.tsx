import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { type Filters } from "@/data/beltSelectorData";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onNext: () => void;
  onPrev: () => void;
}

const tempOptions = [
  { label: "До 60°C", sublabel: "обычный материал", max: 60 },
  { label: "До 120°C", sublabel: "горячий материал", max: 120 },
  { label: "До 150°C", sublabel: "очень горячий", max: 150 },
  { label: "До 200°C", sublabel: "раскалённый", max: 200 },
];

const specialOptions: { key: keyof Filters; label: string; icon: string; hint: string }[] = [
  { key: "needsCold", label: "Крайний Север", icon: "Snowflake", hint: "до −60°C" },
  { key: "hasImpact", label: "Ударные нагрузки", icon: "Zap", hint: "крупные куски" },
  { key: "needsOil", label: "Масла / жиры", icon: "Droplets", hint: "маслостойкость" },
  { key: "needsFire", label: "Огнестойкость", icon: "Flame", hint: "шахты, рудники" },
  { key: "needsFood", label: "Пищевой контакт", icon: "Apple", hint: "продукты питания" },
];

export default function StepConditions({ filters, setFilters, onNext, onPrev }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Thermometer" size={20} className="text-primary" />
          Условия эксплуатации
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Температура транспортируемого материала */}
        <div>
          <p className="font-medium mb-1">Температура материала при загрузке</p>
          <p className="text-xs text-muted-foreground mb-3">Выберите, если материал горячий. Для обычных условий — пропустите.</p>
          <div className="flex flex-wrap gap-2">
            {tempOptions.map((opt) => (
              <button
                key={opt.max}
                onClick={() =>
                  setFilters((f) => ({ ...f, matTempMax: f.matTempMax === opt.max ? 0 : opt.max }))
                }
                className={`flex flex-col items-start px-4 py-2 rounded-xl text-sm border transition-all ${
                  filters.matTempMax === opt.max
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary hover:text-primary bg-background"
                }`}
              >
                <span className="font-semibold">{opt.label}</span>
                <span className={`text-xs ${filters.matTempMax === opt.max ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {opt.sublabel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Особые требования */}
        <div>
          <p className="font-medium mb-1">Особые требования к ленте</p>
          <p className="text-xs text-muted-foreground mb-3">Выберите все подходящие условия.</p>
          <div className="flex flex-wrap gap-2">
            {specialOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() =>
                  setFilters((f) => ({ ...f, [opt.key]: !f[opt.key] }))
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all ${
                  filters[opt.key]
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary hover:text-primary bg-background"
                }`}
              >
                <Icon name={opt.icon} size={14} />
                <span>
                  <span className="font-medium">{opt.label}</span>
                  <span className={`ml-1 text-xs ${filters[opt.key] ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {opt.hint}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={onPrev}>
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Button>
          <Button onClick={onNext}>
            Далее
            <Icon name="ArrowRight" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
