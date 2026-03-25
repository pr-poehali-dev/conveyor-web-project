import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { drumOptions, angleOptions, type Filters } from "@/data/beltSelectorData";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onNext: () => void;
  onPrev: () => void;
}

export default function StepDrums({ filters, setFilters, onNext, onPrev }: Props) {
  return (
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
          <Button variant="outline" onClick={onPrev}>
            <Icon name="ArrowLeft" size={16} />
            Назад
          </Button>
          <Button onClick={onNext}>
            Показать результаты
            <Icon name="Search" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
