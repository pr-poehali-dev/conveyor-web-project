import { belts, type Belt } from "@/data/belts";

export type Step = "material" | "conditions" | "drums" | "result";

export interface Filters {
  material: string;
  envTempMin: number;
  matTempMax: number;
  hasImpact: boolean;
  needsOil: boolean;
  needsFire: boolean;
  needsFood: boolean;
  drumDiameter: number;
  angle: number;
}

export const defaultFilters: Filters = {
  material: "",
  envTempMin: 0,
  matTempMax: 0,
  hasImpact: false,
  needsOil: false,
  needsFire: false,
  needsFood: false,
  drumDiameter: 0,
  angle: 0,
};

export const materialGroups = [
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

export const drumOptions = [
  { label: "До 200 мм", value: 200 },
  { label: "200–400 мм", value: 400 },
  { label: "400–630 мм", value: 630 },
  { label: "630–800 мм", value: 800 },
  { label: "800–1000 мм", value: 1000 },
  { label: "Более 1000 мм", value: 1250 },
];

export const angleOptions = [
  { label: "До 15°", value: 15 },
  { label: "15–20°", value: 20 },
  { label: "20–25°", value: 25 },
  { label: "Более 25°", value: 30 },
];

export const typeLabels: Record<string, string> = {
  rubber: "Резинотканевая",
  pvc: "ПВХ",
  pu: "Полиуретановая",
};

export const typeBadgeColor: Record<string, string> = {
  rubber: "bg-orange-100 text-orange-800",
  pvc: "bg-blue-100 text-blue-800",
  pu: "bg-green-100 text-green-800",
};

export const steps: { id: Step; label: string; icon: string }[] = [
  { id: "material", label: "Материал", icon: "Layers" },
  { id: "conditions", label: "Условия", icon: "Thermometer" },
  { id: "drums", label: "Геометрия", icon: "Circle" },
  { id: "result", label: "Результат", icon: "CheckCircle" },
];

export function filterBelts(filters: Filters): Belt[] {
  return belts.filter((b) => {
    // Материал
    if (filters.material && !b.materials.includes(filters.material)) return false;
    // Лента должна выдерживать окружающую температуру (temp_min ленты ≤ нужному минимуму среды)
    if (filters.envTempMin !== 0 && b.temp_min > filters.envTempMin) return false;
    // Лента должна выдерживать температуру материала (temp_max ленты ≥ нужному максимуму материала)
    if (filters.matTempMax !== 0 && b.temp_max < filters.matTempMax) return false;
    // Ударные нагрузки
    if (filters.hasImpact && !b.features.includes("impact")) return false;
    // Маслостойкость
    if (filters.needsOil && !b.features.includes("oil")) return false;
    // Огнестойкость
    if (filters.needsFire && !b.features.includes("fire")) return false;
    // Пищевое применение
    if (filters.needsFood && !b.features.includes("food")) return false;
    // Диаметр барабана: лента подходит если её мин. барабан ≤ барабану пользователя
    if (filters.drumDiameter > 0 && b.min_drum_diameter > filters.drumDiameter) return false;
    // Угол: лента должна поддерживать нужный угол
    if (filters.angle > 0 && b.max_angle < filters.angle) return false;
    return true;
  });
}
