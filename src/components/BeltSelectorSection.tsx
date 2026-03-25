import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { materialLabels, featureLabels } from "@/data/belts";
import {
  defaultFilters,
  filterBelts,
  getAvailableOptions,
  materialGroups,
  tempOptions,
  drumOptions,
  angleOptions,
  typeLabels,
  typeBadgeColor,
  type Filters,
} from "@/data/beltSelectorData";

function OptionButton({
  active,
  disabled,
  onClick,
  children,
}: {
  active: boolean;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
        disabled
          ? "border-border/40 text-muted-foreground/40 bg-background cursor-not-allowed"
          : active
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border hover:border-primary hover:text-primary bg-background cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
}

export default function BeltSelectorSection() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);

  const available = useMemo(() => getAvailableOptions(filters.material), [filters.material]);
  const results = useMemo(() => filterBelts(filters), [filters]);

  // При смене материала — сбрасываем фильтры которые стали недоступны
  function setMaterial(mat: string) {
    const newMat = mat === filters.material ? "" : mat;
    const av = getAvailableOptions(newMat);
    setFilters({
      ...defaultFilters,
      material: newMat,
      matTempMax: av.tempMaxValues.includes(filters.matTempMax) ? filters.matTempMax : 0,
      needsCold: av.hasCold ? filters.needsCold : false,
      hasImpact: av.hasImpact ? filters.hasImpact : false,
      needsOil: av.hasOil ? filters.needsOil : false,
      needsFire: av.hasFire ? filters.needsFire : false,
      needsFood: av.hasFood ? filters.needsFood : false,
      drumDiameter: av.drumDiameterValues.includes(filters.drumDiameter) ? filters.drumDiameter : 0,
      angle: av.angleValues.includes(filters.angle) ? filters.angle : 0,
    });
  }

  const scrollToContacts = () => {
    document.querySelector("#contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  const hasAnyFilter =
    filters.matTempMax > 0 ||
    filters.needsCold ||
    filters.hasImpact ||
    filters.needsOil ||
    filters.needsFire ||
    filters.needsFood ||
    filters.drumDiameter > 0 ||
    filters.angle > 0;

  return (
    <section id="belt-selector" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="outline" className="text-primary border-primary">
                Подборщик ленты
              </Badge>
              <h2 className="font-heading text-xl font-bold">
                Подберём конвейерную ленту под ваши условия
              </h2>
            </div>
            {filters.material && (
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium">
                <Icon name="CheckCircle" size={15} />
                {results.length === 0
                  ? "Нет подходящих марок"
                  : `Найдено марок: ${results.length}`}
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm mt-2">
            Выберите материал и укажите условия — система сразу покажет подходящие марки
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">

          {/* Шаг 1: Материал */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</span>
                Что транспортируете?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {materialGroups.map((group) => (
                <div key={group.label}>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                    <Icon name={group.icon} size={11} />
                    {group.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((mat) => (
                      <button
                        key={mat}
                        onClick={() => setMaterial(mat)}
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
            </CardContent>
          </Card>

          {/* Шаг 2: Условия — активен только если выбран материал */}
          <Card className={!filters.material ? "opacity-50 pointer-events-none" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</span>
                Температура и особые требования
                <span className="text-xs font-normal text-muted-foreground ml-1">(необязательно)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">

              {/* Температура материала */}
              <div>
                <p className="text-sm font-medium mb-2">Температура материала при загрузке</p>
                <div className="flex flex-wrap gap-2">
                  {tempOptions.map((opt) => {
                    const isAvailable = available.tempMaxValues.includes(opt.max);
                    const isActive = filters.matTempMax === opt.max;
                    return (
                      <OptionButton
                        key={opt.max}
                        active={isActive}
                        disabled={!isAvailable}
                        onClick={() =>
                          setFilters((f) => ({ ...f, matTempMax: isActive ? 0 : opt.max }))
                        }
                      >
                        <span className="font-medium">{opt.label}</span>
                        <span className="ml-1 opacity-70">{opt.sublabel}</span>
                      </OptionButton>
                    );
                  })}
                </div>
              </div>

              {/* Особые требования */}
              <div>
                <p className="text-sm font-medium mb-2">Особые требования</p>
                <div className="flex flex-wrap gap-2">
                  {([
                    { key: "needsCold" as keyof Filters, label: "Крайний Север", icon: "Snowflake", available: available.hasCold, hint: "до −60°C" },
                    { key: "hasImpact" as keyof Filters, label: "Ударные нагрузки", icon: "Zap", available: available.hasImpact, hint: "крупные куски" },
                    { key: "needsOil" as keyof Filters, label: "Масла / жиры", icon: "Droplets", available: available.hasOil, hint: "маслостойкость" },
                    { key: "needsFire" as keyof Filters, label: "Огнестойкость", icon: "Flame", available: available.hasFire, hint: "шахты" },
                    { key: "needsFood" as keyof Filters, label: "Пищевой контакт", icon: "Apple", available: available.hasFood, hint: "продукты" },
                  ] as const).map((opt) => {
                    const isActive = !!filters[opt.key];
                    return (
                      <button
                        key={opt.key}
                        disabled={!opt.available}
                        onClick={() => setFilters((f) => ({ ...f, [opt.key]: !f[opt.key] }))}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all ${
                          !opt.available
                            ? "border-border/40 text-muted-foreground/40 bg-background cursor-not-allowed"
                            : isActive
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border hover:border-primary hover:text-primary bg-background cursor-pointer"
                        }`}
                      >
                        <Icon name={opt.icon} size={13} />
                        <span>{opt.label}</span>
                        <span className={`text-xs ${!opt.available ? "opacity-40" : isActive ? "opacity-80" : "text-muted-foreground"}`}>
                          {opt.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Шаг 3: Геометрия */}
          <Card className={!filters.material ? "opacity-50 pointer-events-none" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</span>
                Геометрия конвейера
                <span className="text-xs font-normal text-muted-foreground ml-1">(необязательно)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">

              {/* Диаметр барабана */}
              <div>
                <p className="text-sm font-medium mb-2">Диаметр приводного барабана</p>
                <div className="flex flex-wrap gap-2">
                  {drumOptions.map((opt) => {
                    const isAvailable = available.drumDiameterValues.includes(opt.value);
                    const isActive = filters.drumDiameter === opt.value;
                    return (
                      <OptionButton
                        key={opt.value}
                        active={isActive}
                        disabled={!isAvailable}
                        onClick={() =>
                          setFilters((f) => ({ ...f, drumDiameter: isActive ? 0 : opt.value }))
                        }
                      >
                        {opt.label}
                      </OptionButton>
                    );
                  })}
                </div>
              </div>

              {/* Угол наклона */}
              <div>
                <p className="text-sm font-medium mb-2">Угол наклона конвейера</p>
                <div className="flex flex-wrap gap-2">
                  {angleOptions.map((opt) => {
                    const isAvailable = available.angleValues.includes(opt.value);
                    const isActive = filters.angle === opt.value;
                    return (
                      <OptionButton
                        key={opt.value}
                        active={isActive}
                        disabled={!isAvailable}
                        onClick={() =>
                          setFilters((f) => ({ ...f, angle: isActive ? 0 : opt.value }))
                        }
                      >
                        {opt.label}
                      </OptionButton>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Результаты */}
          {filters.material && (
            <div className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold">
                  Подходящих марок:{" "}
                  <span className="text-primary text-lg">{results.length}</span>
                </p>
                {hasAnyFilter && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters((f) => ({ ...defaultFilters, material: f.material }))}
                  >
                    <Icon name="RotateCcw" size={14} />
                    Сбросить фильтры
                  </Button>
                )}
              </div>

              {results.length === 0 ? (
                <Card>
                  <CardContent className="py-10 text-center">
                    <Icon name="SearchX" size={40} className="text-muted-foreground mx-auto mb-3" />
                    <h3 className="font-semibold text-lg mb-2">Точного совпадения нет</h3>
                    <p className="text-muted-foreground mb-5 text-sm">
                      Подберём ленту индивидуально — свяжитесь с нами
                    </p>
                    <Button onClick={scrollToContacts}>Получить консультацию</Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {results.map((belt) => (
                    <Card key={belt.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="font-bold text-lg">{belt.name}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadgeColor[belt.type]}`}>
                                {typeLabels[belt.type]}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-3">{belt.description}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm mb-3">
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
                                <p className="font-semibold">{belt.temp_min}…+{belt.temp_max}°C</p>
                              </div>
                              <div className="bg-muted rounded-lg p-2 text-center">
                                <p className="text-xs text-muted-foreground">Макс. угол</p>
                                <p className="font-semibold">{belt.max_angle}°</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {belt.features.map((f) => (
                                <Badge key={f} variant="secondary" className="text-xs">
                                  {featureLabels[f]}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button size="sm" onClick={scrollToContacts} className="shrink-0">
                            <Icon name="Phone" size={14} />
                            Цена
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="text-center pt-2">
                    <p className="text-sm text-muted-foreground mb-3">
                      Не уверены в выборе? Наш специалист поможет
                    </p>
                    <Button variant="outline" onClick={scrollToContacts}>
                      <Icon name="MessageCircle" size={16} />
                      Проконсультироваться
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}