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
        {/* Температура материала */}
        <div>
          <p className="font-medium mb-3">Температура транспортируемого материала</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "До 60°C (обычный)", max: 60 },
              { label: "До 120°C (горячий)", max: 120 },
              { label: "До 150°C (очень горячий)", max: 150 },
              { label: "До 200°C (раскалённый)", max: 200 },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() =>
                  setFilters((f) => ({ ...f, matTempMax: f.matTempMax === opt.max ? 0 : opt.max }))
                }
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  filters.matTempMax === opt.max
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary hover:text-primary bg-background"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Температура окружающей среды */}
        <div>
          <p className="font-medium mb-3">Температура окружающей среды</p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Обычная (до −25°C)", min: -25 },
              { label: "Крайний Север (до −60°C)", min: -60 },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() =>
                  setFilters((f) => ({ ...f, envTempMin: f.envTempMin === opt.min ? 0 : opt.min }))
                }
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  filters.envTempMin === opt.min
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary hover:text-primary bg-background"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Особые требования */}
        <div>
          <p className="font-medium mb-3">Особые требования</p>
          <div className="flex flex-wrap gap-2">
            {[
              { key: "hasImpact", label: "Ударные нагрузки", icon: "Zap" },
              { key: "needsOil", label: "Масла / жиры", icon: "Droplets" },
              { key: "needsFire", label: "Огнестойкость (шахты)", icon: "Flame" },
              { key: "needsFood", label: "Пищевой контакт", icon: "Apple" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    [opt.key]: !f[opt.key as keyof Filters],
                  }))
                }
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
                  filters[opt.key as keyof Filters]
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:border-primary hover:text-primary bg-background"
                }`}
              >
                <Icon name={opt.icon} size={13} />
                {opt.label}
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
