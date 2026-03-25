import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { steps, defaultFilters, filterBelts, type Filters, type Step } from "@/data/beltSelectorData";
import StepMaterial from "@/components/belt-selector/StepMaterial";
import StepConditions from "@/components/belt-selector/StepConditions";
import StepDrums from "@/components/belt-selector/StepDrums";
import StepResult from "@/components/belt-selector/StepResult";

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
          {step === "material" && (
            <StepMaterial filters={filters} setFilters={setFilters} onNext={goNext} />
          )}
          {step === "conditions" && (
            <StepConditions filters={filters} setFilters={setFilters} onNext={goNext} onPrev={goPrev} />
          )}
          {step === "drums" && (
            <StepDrums filters={filters} setFilters={setFilters} onNext={goNext} onPrev={goPrev} />
          )}
          {step === "result" && (
            <StepResult results={results} onReset={reset} onScrollToContacts={scrollToContacts} />
          )}
        </div>
      </div>
    </section>
  );
}
