import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { materialLabels } from "@/data/belts";
import { materialGroups, type Filters } from "@/data/beltSelectorData";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onNext: () => void;
}

export default function StepMaterial({ filters, setFilters, onNext }: Props) {
  return (
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
          <Button onClick={onNext} disabled={!filters.material}>
            Далее
            <Icon name="ArrowRight" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
