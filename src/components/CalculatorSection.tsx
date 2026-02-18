import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";

const beltTypes = [
  { value: "rubber-fabric", label: "Резинотканевая", baseCost: 15000 },
  { value: "rubber-cable", label: "Резинотросовая", baseCost: 35000 },
  { value: "pvc", label: "ПВХ / ПУ", baseCost: 12000 },
];

const spliceMethods = [
  { value: "hot", label: "Горячая вулканизация", multiplier: 1.0 },
  { value: "cold", label: "Холодная вулканизация", multiplier: 0.6 },
  { value: "mechanical", label: "Механическое соединение", multiplier: 0.35 },
];

const widthRanges = [
  { value: "400-650", label: "400–650 мм", multiplier: 1.0 },
  { value: "800-1000", label: "800–1000 мм", multiplier: 1.4 },
  { value: "1200-1400", label: "1200–1400 мм", multiplier: 1.8 },
  { value: "1600-2000", label: "1600–2000 мм", multiplier: 2.3 },
  { value: "2000+", label: "Более 2000 мм", multiplier: 3.0 },
];

const CalculatorSection = () => {
  const [beltType, setBeltType] = useState("");
  const [method, setMethod] = useState("");
  const [width, setWidth] = useState("");
  const [count, setCount] = useState("1");
  const [calculated, setCalculated] = useState(false);

  const getPrice = () => {
    const belt = beltTypes.find((b) => b.value === beltType);
    const splice = spliceMethods.find((s) => s.value === method);
    const w = widthRanges.find((r) => r.value === width);
    if (!belt || !splice || !w) return 0;
    return Math.round(belt.baseCost * splice.multiplier * w.multiplier * Number(count || 1));
  };

  const handleCalculate = () => {
    if (beltType && method && width) setCalculated(true);
  };

  const price = getPrice();

  return (
    <section id="calculator" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="steel-line w-12" />
            <span className="text-primary font-medium text-sm uppercase tracking-widest">Калькулятор</span>
            <div className="steel-line w-12 rotate-180" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase">
            Рассчитайте <span className="text-primary">стоимость</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Предварительный расчёт стоимости работ. Точную цену уточняйте у менеджера.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto bg-secondary/50 border-border">
          <CardContent className="p-8">
            <div className="grid gap-6">
              <div>
                <Label className="text-sm font-heading uppercase tracking-wider mb-2 block">
                  Тип ленты
                </Label>
                <Select value={beltType} onValueChange={(v) => { setBeltType(v); setCalculated(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип ленты" />
                  </SelectTrigger>
                  <SelectContent>
                    {beltTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-heading uppercase tracking-wider mb-2 block">
                  Метод стыковки
                </Label>
                <Select value={method} onValueChange={(v) => { setMethod(v); setCalculated(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите метод" />
                  </SelectTrigger>
                  <SelectContent>
                    {spliceMethods.map((m) => (
                      <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-heading uppercase tracking-wider mb-2 block">
                  Ширина ленты
                </Label>
                <Select value={width} onValueChange={(v) => { setWidth(v); setCalculated(false); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите ширину" />
                  </SelectTrigger>
                  <SelectContent>
                    {widthRanges.map((w) => (
                      <SelectItem key={w.value} value={w.value}>{w.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-heading uppercase tracking-wider mb-2 block">
                  Количество стыков
                </Label>
                <Input
                  type="number"
                  min="1"
                  max="50"
                  value={count}
                  onChange={(e) => { setCount(e.target.value); setCalculated(false); }}
                  className="bg-background"
                />
              </div>

              <Button
                size="lg"
                className="w-full font-heading uppercase tracking-wider"
                onClick={handleCalculate}
                disabled={!beltType || !method || !width}
              >
                <Icon name="Calculator" size={18} className="mr-2" />
                Рассчитать стоимость
              </Button>

              {calculated && price > 0 && (
                <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-2">Ориентировочная стоимость:</p>
                  <p className="font-heading text-4xl font-bold text-primary">
                    {price.toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="text-xs text-muted-foreground mt-3">
                    * Окончательная стоимость зависит от удалённости объекта и технического состояния ленты
                  </p>
                  <Button className="mt-4 font-heading uppercase tracking-wider" asChild>
                    <a href="#contacts">Заказать выезд бригады</a>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CalculatorSection;
