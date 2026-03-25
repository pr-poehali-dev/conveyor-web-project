import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { featureLabels, type Belt } from "@/data/belts";
import { typeLabels, typeBadgeColor } from "@/data/beltSelectorData";

interface Props {
  results: Belt[];
  onReset: () => void;
  onScrollToContacts: () => void;
}

export default function StepResult({ results, onReset, onScrollToContacts }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-muted-foreground text-sm">
          Найдено подходящих марок: <span className="font-bold text-foreground">{results.length}</span>
        </p>
        <Button variant="outline" size="sm" onClick={onReset}>
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
            <Button onClick={onScrollToContacts}>Получить консультацию</Button>
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
                <Button size="sm" onClick={onScrollToContacts} className="flex-1 sm:flex-none">
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
          <Button variant="outline" onClick={onScrollToContacts}>
            <Icon name="MessageCircle" size={16} />
            Проконсультироваться
          </Button>
        </div>
      )}
    </div>
  );
}
