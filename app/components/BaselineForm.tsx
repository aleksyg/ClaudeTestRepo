"use client";

import { BaselineInputs } from "@/app/lib/projections";

interface Props {
  inputs: BaselineInputs;
  onChange: (inputs: BaselineInputs) => void;
}

interface FieldDef {
  key: keyof BaselineInputs;
  label: string;
  helpText: string;
  prefix?: string;
  suffix?: string;
  min: number;
  max: number;
  step: number;
}

const SECTIONS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Profile",
    fields: [
      {
        key: "currentAge",
        label: "Current Age",
        helpText: "How old are you today?",
        suffix: "years",
        min: 18,
        max: 79,
        step: 1,
      },
      {
        key: "retirementAge",
        label: "Target Retirement Age",
        helpText: "When do you plan to stop working?",
        suffix: "years",
        min: 40,
        max: 80,
        step: 1,
      },
    ],
  },
  {
    title: "Finances",
    fields: [
      {
        key: "currentSavings",
        label: "Current Savings",
        helpText: "Total across all investment accounts",
        prefix: "$",
        min: 0,
        max: 5000000,
        step: 1000,
      },
      {
        key: "annualIncome",
        label: "Annual Income",
        helpText: "Your gross income before taxes",
        prefix: "$",
        min: 0,
        max: 1000000,
        step: 1000,
      },
      {
        key: "monthlySavings",
        label: "Monthly Savings",
        helpText: "How much you invest each month",
        prefix: "$",
        min: 0,
        max: 20000,
        step: 50,
      },
    ],
  },
  {
    title: "Assumptions",
    fields: [
      {
        key: "investmentReturn",
        label: "Expected Annual Return",
        helpText: "Historical stock market avg. is ~7% after inflation",
        suffix: "%",
        min: 1,
        max: 15,
        step: 0.5,
      },
      {
        key: "inflationRate",
        label: "Inflation Rate",
        helpText: "Long-term US avg. is ~3%",
        suffix: "%",
        min: 1,
        max: 10,
        step: 0.5,
      },
    ],
  },
];

function formatDisplay(value: number, field: FieldDef): string {
  if (field.prefix === "$") {
    return value.toLocaleString("en-US");
  }
  return String(value);
}

function parseInput(raw: string): number {
  return parseFloat(raw.replace(/,/g, "")) || 0;
}

interface InputFieldProps {
  field: FieldDef;
  value: number;
  onChange: (value: number) => void;
}

function InputField({ field, value, onChange }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">
        {field.label}
      </label>
      <div className="relative flex items-center">
        {field.prefix && (
          <span className="absolute left-3 text-slate-400 text-sm font-medium pointer-events-none select-none">
            {field.prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          min={field.min}
          max={field.max}
          step={field.step}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!isNaN(parsed)) onChange(Math.min(field.max, Math.max(field.min, parsed)));
          }}
          className={`w-full border border-slate-200 bg-white rounded-xl py-3 text-sm font-semibold text-slate-800
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
            hover:border-slate-300 transition-colors
            ${field.prefix ? "pl-8 pr-4" : "pl-4"} ${field.suffix ? "pr-14" : "pr-4"}`}
        />
        {field.suffix && (
          <span className="absolute right-3 text-slate-400 text-sm pointer-events-none select-none">
            {field.suffix}
          </span>
        )}
      </div>
      <p className="mt-1.5 text-xs text-slate-400">{field.helpText}</p>
    </div>
  );
}

export default function BaselineForm({ inputs, onChange }: Props) {
  function handleChange(key: keyof BaselineInputs, value: number) {
    onChange({ ...inputs, [key]: value });
  }

  return (
    <div className="space-y-6">
      {SECTIONS.map((section) => (
        <div key={section.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {section.title}
            </h3>
          </div>
          <div className="p-5 space-y-5">
            {section.fields.map((field) => (
              <InputField
                key={field.key}
                field={field}
                value={inputs[field.key]}
                onChange={(v) => handleChange(field.key, v)}
              />
            ))}
          </div>
        </div>
      ))}

      <p className="text-xs text-slate-400 text-center leading-relaxed px-4">
        These numbers stay private — everything is calculated in your browser.
      </p>
    </div>
  );
}
