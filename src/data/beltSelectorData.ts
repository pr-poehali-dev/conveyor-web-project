import { belts, type Belt } from "@/data/belts";

export interface Filters {
  material: string;
  matTempMax: number;
  needsCold: boolean;
  hasImpact: boolean;
  needsOil: boolean;
  needsFire: boolean;
  needsFood: boolean;
  drumDiameter: number;
  angle: number;
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

export const tempOptions = [
  { label: "До 60°C", sublabel: "обычный", max: 60 },
  { label: "До 120°C", sublabel: "горячий", max: 120 },
  { label: "До 150°C", sublabel: "очень горячий", max: 150 },
  { label: "До 200°C", sublabel: "раскалённый", max: 200 },
];

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

// Возвращает ленты для конкретного материала (без остальных фильтров)
function getBeltsForMaterial(material: string): Belt[] {
  if (!material) return belts;
  return belts.filter((b) => b.materials.includes(material));
}

// Какие опции реально доступны для выбранного материала
export interface AvailableOptions {
  tempMaxValues: number[];
  hasCold: boolean;
  hasImpact: boolean;
  hasOil: boolean;
  hasFire: boolean;
  hasFood: boolean;
  drumDiameterValues: number[];
  angleValues: number[];
}

export function getAvailableOptions(material: string): AvailableOptions {
  const pool = getBeltsForMaterial(material);

  return {
    tempMaxValues: tempOptions
      .filter((opt) => pool.some((b) => b.temp_max >= opt.max))
      .map((opt) => opt.max),
    hasCold: pool.some((b) => b.temp_min <= -60),
    hasImpact: pool.some((b) => b.features.includes("impact")),
    hasOil: pool.some((b) => b.features.includes("oil")),
    hasFire: pool.some((b) => b.features.includes("fire")),
    hasFood: pool.some((b) => b.features.includes("food")),
    drumDiameterValues: drumOptions
      .filter((opt) => pool.some((b) => b.min_drum_diameter <= opt.value))
      .map((opt) => opt.value),
    angleValues: angleOptions
      .filter((opt) => pool.some((b) => b.max_angle >= opt.value))
      .map((opt) => opt.value),
  };
}

// Основная фильтрация
export function filterBelts(filters: Filters): Belt[] {
  return belts.filter((b) => {
    if (filters.material && !b.materials.includes(filters.material)) return false;
    if (filters.matTempMax > 0 && b.temp_max < filters.matTempMax) return false;
    if (filters.needsCold && b.temp_min > -60) return false;
    if (filters.hasImpact && !b.features.includes("impact")) return false;
    if (filters.needsOil && !b.features.includes("oil")) return false;
    if (filters.needsFire && !b.features.includes("fire")) return false;
    if (filters.needsFood && !b.features.includes("food")) return false;
    if (filters.drumDiameter > 0 && b.min_drum_diameter > filters.drumDiameter) return false;
    if (filters.angle > 0 && b.max_angle < filters.angle) return false;
    return true;
  });
}
