"use client";

import { BaselineInputs } from "@/app/lib/projections";

interface Props {
  inputs: BaselineInputs;
  onChange: (inputs: BaselineInputs) => void;
}

interface FieldConfig {
  key: keyof BaselineInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
  format?: (v: number) => string;
}

const fields: FieldConfig[] = [
  { key: "currentAge", label: "Current Age", min: 18, max: 80, step: 1, suffix: "yrs" },
  { key: "retirementAge", label: "Retirement Age", min: 40, max: 80, step: 1, suffix: "yrs" },
  { key: "currentSavings", label: "Current Savings", min: 0, max: 5000000, step: 1000, prefix: "$" },
  { key: "annualIncome", label: "Annual Income", min: 0, max: 1000000, step: 1000, prefix: "$" },
  { key: "monthlySavings", label: "Monthly Savings", min: 0, max: 20000, step: 100, prefix: "$" },
  { key: "investmentReturn", label: "Investment Return", min: 1, max: 15, step: 0.5, suffix: "%" },
  { key: "inflationRate", label: "Inflation Rate", min: 1, max: 10, step: 0.5, suffix: "%" },
];

function formatValue(value: number, field: FieldConfig): string {
  if (field.prefix === "$") {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
    return `$${value}`;
  }
  return `${value}${field.suffix ?? ""}`;
}

export default function BaselineForm({ inputs, onChange }: Props) {
  function handleChange(key: keyof BaselineInputs, value: number) {
    onChange({ ...inputs, [key]: value });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Your Baseline</h2>
      {fields.map((field) => {
        const value = inputs[field.key];
        return (
          <div key={field.key} className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-600">{field.label}</label>
              <span className="text-sm font-semibold text-indigo-600">
                {formatValue(value, field)}
              </span>
            </div>
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step}
              value={value}
              onChange={(e) => handleChange(field.key, parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{formatValue(field.min, field)}</span>
              <span>{formatValue(field.max, field)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
