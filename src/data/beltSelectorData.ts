import { belts, type Belt } from "@/data/belts";

export type Step = "material" | "conditions" | "drums" | "result";

export interface Filters {
  material: string;       // ключ материала из materialLabels
  matTempMax: number;     // макс. температура материала (0 = не выбрано)
  needsCold: boolean;     // нужна морозостойкость до -60°C (Крайний Север)
  hasImpact: boolean;     // есть ударные нагрузки
  needsOil: boolean;      // нужна маслостойкость
  needsFire: boolean;     // нужна огнестойкость (шахты)
  needsFood: boolean;     // пищевой контакт
  drumDiameter: number;   // диаметр барабана пользователя в мм (0 = не важно)
  angle: number;          // угол наклона конвейера в градусах (0 = не важно)
}

export const defaultFilters: Filters = {
  material: "",
  matTempMax: 0,
  needsCold: false,
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

// Диаметры барабанов — value = реальный диаметр барабана пользователя в мм
export const drumOptions = [
  { label: "100–200 мм", value: 200 },
  { label: "200–400 мм", value: 400 },
  { label: "400–630 мм", value: 630 },
  { label: "630–800 мм", value: 800 },
  { label: "800–1000 мм", value: 1000 },
  { label: "Более 1000 мм", value: 9999 },
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
    // 1. Материал — лента должна явно поддерживать выбранный материал
    if (filters.material && !b.materials.includes(filters.material)) return false;

    // 2. Температура материала — лента должна выдержать указанную температуру
    //    matTempMax=0 означает "не выбрано", пропускаем фильтр
    if (filters.matTempMax > 0 && b.temp_max < filters.matTempMax) return false;

    // 3. Морозостойкость — только если выбран Крайний Север (-60°C)
    //    Требуем ленты с temp_min не выше -60
    if (filters.needsCold && b.temp_min > -60) return false;

    // 4. Ударные нагрузки
    if (filters.hasImpact && !b.features.includes("impact")) return false;

    // 5. Маслостойкость
    if (filters.needsOil && !b.features.includes("oil")) return false;

    // 6. Огнестойкость (шахты)
    if (filters.needsFire && !b.features.includes("fire")) return false;

    // 7. Пищевой контакт
    if (filters.needsFood && !b.features.includes("food")) return false;

    // 8. Диаметр барабана — лента подходит если её минимальный барабан
    //    не превышает диаметр барабана пользователя
    //    drumDiameter=0 означает "не важно"
    if (filters.drumDiameter > 0 && b.min_drum_diameter > filters.drumDiameter) return false;

    // 9. Угол наклона — лента должна поддерживать нужный угол
    //    angle=0 означает "не важно"
    if (filters.angle > 0 && b.max_angle < filters.angle) return false;

    return true;
  });
}
