import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { belts, materialLabels, featureLabels, type Belt } from "@/data/belts";

type Step = "material" | "conditions" | "drums" | "result";

interface Filters {
  material: string;
  tempMin: number;
  tempMax: number;
  hasImpact: boolean;
  needsOil: boolean;
  needsFire: boolean;
  needsFood: boolean;
  drumDiameter: number;
  angle: number;
}

const defaultFilters: Filters = {
  material: "",
  tempMin: -25,
  tempMax: 60,
  hasImpact: false,
  needsOil: false,
  needsFire: false,
  needsFood: false,
  drumDiameter: 0,
  angle: 0,
};

const materialGroups = [
  {
    label: "Горнодобыча и строительство",
    icon: "Mountain",
    items: ["gravel", "sand", "ore", "rock", "coal"],
  },
  {
    label: "Металлургия и химия",
    icon: "Flame",
    items: ["sinter", "coke", "clinker", "ash", "potash", "chemicals"],
  },
  {
    label: "Сельское хозяйство и пищевая",
    icon: "Wheat",
    items: ["grain", "seeds", "fertilizer", "food", "pharma"],
  },
  {
    label: "Лёгкая промышленность",
    icon: "Package",
    items: ["light", "chemical"],
  },
];

const drumOptions = [
  { label: "До 200 мм", value: 200 },
  { label: "200–400 мм", value: 400 },
  { label: "400–630 мм", value: 630 },
  { label: "630–800 мм", value: 800 },
  { label: "800–1000 мм", value: 1000 },
  { label: "Более 1000 мм", value: 1250 },
];

const angleOptions = [
  { label: "До 15°", value: 15 },
  { label: "15–20°", value: 20 },
  { label: "20–25°", value: 25 },
  { label: "Более 25°", value: 30 },
];

const typeLabels: Record<string, string> = {
  rubber: "Резинотканевая",
  pvc: "ПВХ",
  pu: "Полиуретановая",
};

const typeBadgeColor: Record<string, string> = {
  rubber: "bg-orange-100 text-orange-800",
  pvc: "bg-blue-100 text-blue-800",
  pu: "bg-green-100 text-green-800",
};

function filterBelts(filters: Filters): Belt[] {
  return belts.filter((b) => {
    if (filters.material && !b.materials.includes(filters.material)) return false;
    if (filters.tempMin < b.temp_min) return false;
    if (filters.tempMax > b.temp_max) return false;
    if (filters.hasImpact && !b.features.includes("impact") && b.breaking_strength < 400) return false;
    if (filters.needsOil && !b.features.includes("oil")) return false;
    if (filters.needsFire && !b.features.includes("fire")) return false;
    if (filters.needsFood && !b.features.includes("food")) return false;
    if (filters.drumDiameter > 0 && b.min_drum_diameter > filters.drumDiameter) return false;
    if (filters.angle > 0 && b.max_angle < filters.angle) return false;
    return true;
  });
}

const steps: { id: Step; label: string; icon: string }[] = [
  { id: "material", label: "Материал", icon: "Layers" },
  { id: "conditions", label: "Условия", icon: "Thermometer" },
  { id: "drums", label: "Геометрия", icon: "Circle" },
  { id: "result", label: "Результат", icon: "CheckCircle" },
];

export default function BeltSelectorSection() {
  const [step, setStep] = useState<Step>("material");
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const results = useMemo(() => filterBelts(filters), [filters]);

  const stepIndex = steps.findIndex((s) => s.id === step);

  const goNext = () => {
    const next = steps[stepIndex + 1];
    if (next) setStep(next.id);
  };

  const goPrev = () => {
    const prev = steps[stepIndex - 1];
    if (prev) setStep(prev.id);
  };

  const reset = () => {
    setFilters(defaultFilters);
    setStep("material");
  };

  const scrollToContacts = () => {
    document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="belt-selector" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Подборщик ленты
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Подберём конвейерную ленту под ваши условия
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ответьте на 3 простых вопроса — система подберёт подходящие марки из нашего ассортимента
          </p>
        </div>

        {/* Прогресс */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <button
                onClick={() => i < stepIndex && setStep(s.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  s.id === step
                    ? "bg-primary text-primary-foreground"
                    : i < stepIndex
                    ? "bg-primary/20 text-primary cursor-pointer hover:bg-primary/30"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon name={s.icon} size={14} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`w-6 h-0.5 ${i < stepIndex ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Шаг 1: Материал */}
          {step === "material" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Layers" size={20} className="text-primary" />
                  Что транспортируете?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {materialGroups.map((group) => (
                  <div key={group.label}>
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                      <Icon name={group.icon} size={12} />
                      {group.label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((mat) => (
                        <button
                          key={mat}
                          onClick={() =>
                            setFilters((f) => ({
                              ...f,
                              material: f.material === mat ? "" : mat,
                            }))
                          }
                          className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                            filters.material === mat
                              ? "bg-primary text-primary-foreground border-primary"
                              : "border-border hover:border-primary hover:text-primary bg-background"
                          }`}
                        >
                          {materialLabels[mat]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-4 flex justify-end">
                  <Button onClick={goNext} disabled={!filters.material}>
                    Далее
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Шаг 2: Условия */}
          {step === "conditions" && (
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
                      { label: "До 60°C (обычный)", min: -25, max: 60 },
                      { label: "До 120°C (горячий)", min: -25, max: 120 },
                      { label: "До 150°C (очень горячий)", min: -25, max: 150 },
                      { label: "До 200°C (раскалённый)", min: -25, max: 200 },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() =>
                          setFilters((f) => ({ ...f, tempMin: opt.min, tempMax: opt.max }))
                        }
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          filters.tempMax === opt.max
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
                          setFilters((f) => ({ ...f, tempMin: opt.min }))
                        }
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          filters.tempMin === opt.min
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
                  <Button variant="outline" onClick={goPrev}>
                    <Icon name="ArrowLeft" size={16} />
                    Назад
                  </Button>
                  <Button onClick={goNext}>
                    Далее
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Шаг 3: Геометрия */}
          {step === "drums" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Circle" size={20} className="text-primary" />
                  Геометрия конвейера
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="font-medium mb-3">Диаметр приводного барабана</p>
                  <div className="flex flex-wrap gap-2">
                    {drumOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            drumDiameter: f.drumDiameter === opt.value ? 0 : opt.value,
                          }))
                        }
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          filters.drumDiameter === opt.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary hover:text-primary bg-background"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-3">Угол наклона конвейера</p>
                  <div className="flex flex-wrap gap-2">
                    {angleOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            angle: f.angle === opt.value ? 0 : opt.value,
                          }))
                        }
                        className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                          filters.angle === opt.value
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary hover:text-primary bg-background"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={goPrev}>
                    <Icon name="ArrowLeft" size={16} />
                    Назад
                  </Button>
                  <Button onClick={goNext}>
                    Показать результаты
                    <Icon name="Search" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Шаг 4: Результат */}
          {step === "result" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-muted-foreground text-sm">
                  Найдено подходящих марок: <span className="font-bold text-foreground">{results.length}</span>
                </p>
                <Button variant="outline" size="sm" onClick={reset}>
                  <Icon name="RotateCcw" size={14} />
                  Начать заново
                </Button>
              </div>

              {results.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Точного совпадения нет</h3>
                    <p className="text-muted-foreground mb-6">
                      Мы подберём ленту под ваши требования индивидуально — свяжитесь с нами
                    </p>
                    <Button onClick={scrollToContacts}>Получить консультацию</Button>
                  </CardContent>
                </Card>
              ) : (
                results.map((belt) => (
                  <Card key={belt.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-5 pb-5">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-bold text-lg">{belt.name}</h3>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadgeColor[belt.type]}`}
                            >
                              {typeLabels[belt.type]}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">{belt.description}</p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                            <div className="bg-muted rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">Прочность</p>
                              <p className="font-semibold">{belt.breaking_strength} кН/м</p>
                            </div>
                            <div className="bg-muted rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">Мин. барабан</p>
                              <p className="font-semibold">{belt.min_drum_diameter} мм</p>
                            </div>
                            <div className="bg-muted rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">Температура</p>
                              <p className="font-semibold">{belt.temp_min}...+{belt.temp_max}°C</p>
                            </div>
                            <div className="bg-muted rounded-lg p-2 text-center">
                              <p className="text-xs text-muted-foreground">Макс. угол</p>
                              <p className="font-semibold">{belt.max_angle}°</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-3">
                            {belt.features.map((f) => (
                              <Badge key={f} variant="secondary" className="text-xs">
                                {featureLabels[f]}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" onClick={scrollToContacts} className="flex-1 sm:flex-none">
                          <Icon name="Phone" size={14} />
                          Запросить цену
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

              {results.length > 0 && (
                <div className="text-center pt-2">
                  <p className="text-sm text-muted-foreground mb-3">
                    Не уверены в выборе? Наш специалист поможет подобрать оптимальный вариант
                  </p>
                  <Button variant="outline" onClick={scrollToContacts}>
                    <Icon name="MessageCircle" size={16} />
                    Проконсультироваться
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}