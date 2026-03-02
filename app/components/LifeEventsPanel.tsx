"use client";

import { useState } from "react";
import { LifeEvent } from "@/app/lib/projections";

interface Props {
  events: LifeEvent[];
  currentAge: number;
  onChange: (events: LifeEvent[]) => void;
}

interface NewEventForm {
  label: string;
  year: number;
  oneTimeCost: number;
  annualCostDelta: number;
  annualIncomeDelta: number;
}

const EMPTY_FORM: NewEventForm = {
  label: "",
  year: 30,
  oneTimeCost: 0,
  annualCostDelta: 0,
  annualIncomeDelta: 0,
};

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
        on ? "bg-emerald-500" : "bg-slate-200"
      }`}
      role="switch"
      aria-checked={on}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          on ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

function NumericInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="block text-xs text-slate-500 mb-1 font-medium">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-slate-400 text-sm pointer-events-none">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className={`w-full border border-slate-200 rounded-lg py-2 text-sm font-semibold text-slate-800
            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white
            ${prefix ? "pl-7 pr-3" : "pl-3"} ${suffix ? "pr-10" : "pr-3"}`}
        />
        {suffix && (
          <span className="absolute right-3 text-slate-400 text-xs pointer-events-none">{suffix}</span>
        )}
      </div>
    </div>
  );
}

export default function LifeEventsPanel({ events, currentAge, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NewEventForm>(EMPTY_FORM);

  function toggle(id: string) {
    onChange(events.map((e) => (e.id === id ? { ...e, enabled: !e.enabled } : e)));
  }

  function updateEventAge(id: string, year: number) {
    onChange(events.map((e) => (e.id === id ? { ...e, year } : e)));
  }

  function removeCustom(id: string) {
    onChange(events.filter((e) => e.id !== id));
  }

  function addCustomEvent() {
    if (!form.label.trim()) return;
    const newEvent: LifeEvent = {
      id: `custom-${Date.now()}`,
      label: form.label,
      icon: "✨",
      enabled: true,
      year: form.year,
      oneTimeCost: form.oneTimeCost,
      annualCostDelta: form.annualCostDelta,
      annualIncomeDelta: form.annualIncomeDelta,
      isCustom: true,
    };
    onChange([...events, newEvent]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  const presets = events.filter((e) => !e.isCustom);
  const custom = events.filter((e) => e.isCustom);

  return (
    <div className="space-y-5">
      {/* Preset events */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Common Milestones</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {presets.map((event) => (
            <div key={event.id} className={`transition-colors ${event.enabled ? "bg-emerald-50/60" : "bg-white"}`}>
              <div className="flex items-center gap-3 px-5 py-4">
                <span className="text-2xl flex-shrink-0">{event.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${event.enabled ? "text-emerald-900" : "text-slate-800"}`}>
                    {event.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {event.oneTimeCost > 0 && `$${(event.oneTimeCost / 1000).toFixed(0)}K upfront`}
                    {event.annualCostDelta > 0 && ` · +$${(event.annualCostDelta / 1000).toFixed(0)}K/yr`}
                    {event.annualCostDelta < 0 && ` · saves $${(Math.abs(event.annualCostDelta) / 1000).toFixed(0)}K/yr`}
                    {event.annualIncomeDelta > 0 && ` · +$${(event.annualIncomeDelta / 1000).toFixed(0)}K income`}
                  </p>
                </div>
                <Toggle on={event.enabled} onToggle={() => toggle(event.id)} />
              </div>

              {/* Expanded age selector when enabled */}
              {event.enabled && (
                <div className="px-5 pb-4 pt-0">
                  <div className="bg-white border border-emerald-200 rounded-xl px-4 py-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-700">Age when this happens</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateEventAge(event.id, Math.max(currentAge, event.year - 1))}
                        className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-base flex items-center justify-center hover:bg-emerald-200 transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-bold text-slate-900 w-6 text-center">{event.year}</span>
                      <button
                        onClick={() => updateEventAge(event.id, Math.min(80, event.year + 1))}
                        className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-base flex items-center justify-center hover:bg-emerald-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom events */}
      {custom.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Custom Events</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {custom.map((event) => (
              <div key={event.id} className={`transition-colors ${event.enabled ? "bg-emerald-50/60" : "bg-white"}`}>
                <div className="flex items-center gap-3 px-5 py-4">
                  <span className="text-2xl flex-shrink-0">{event.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${event.enabled ? "text-emerald-900" : "text-slate-800"}`}>
                      {event.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Age {event.year}</p>
                  </div>
                  <button
                    onClick={() => removeCustom(event.id)}
                    className="text-slate-300 hover:text-red-400 transition-colors mr-2 text-lg leading-none"
                  >
                    ×
                  </button>
                  <Toggle on={event.enabled} onToggle={() => toggle(event.id)} />
                </div>
                {event.enabled && (
                  <div className="px-5 pb-4 pt-0">
                    <div className="bg-white border border-emerald-200 rounded-xl px-4 py-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-700">Age when this happens</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateEventAge(event.id, Math.max(currentAge, event.year - 1))}
                          className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-base flex items-center justify-center hover:bg-emerald-200 transition-colors"
                        >
                          −
                        </button>
                        <span className="text-sm font-bold text-slate-900 w-6 text-center">{event.year}</span>
                        <button
                          onClick={() => updateEventAge(event.id, Math.min(80, event.year + 1))}
                          className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-bold text-base flex items-center justify-center hover:bg-emerald-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add custom event */}
      {showForm ? (
        <div className="bg-white rounded-2xl border border-emerald-200 overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 bg-emerald-50 border-b border-emerald-200">
            <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest">New Custom Event</h3>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs text-slate-500 mb-1 font-medium">Event name</label>
              <input
                type="text"
                placeholder="e.g. Start a Business, Move Abroad..."
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <NumericInput
                label="Age it occurs"
                value={form.year}
                onChange={(v) => setForm({ ...form, year: v })}
                min={currentAge}
                max={80}
                suffix="yrs"
              />
              <NumericInput
                label="One-time cost"
                value={form.oneTimeCost}
                onChange={(v) => setForm({ ...form, oneTimeCost: v })}
                prefix="$"
                min={0}
              />
              <NumericInput
                label="Annual expense change"
                value={form.annualCostDelta}
                onChange={(v) => setForm({ ...form, annualCostDelta: v })}
                prefix="$"
              />
              <NumericInput
                label="Annual income change"
                value={form.annualIncomeDelta}
                onChange={(v) => setForm({ ...form, annualIncomeDelta: v })}
                prefix="$"
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button
                onClick={addCustomEvent}
                className="flex-1 bg-emerald-600 text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                Add Event
              </button>
              <button
                onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
                className="flex-1 bg-slate-100 text-slate-600 rounded-xl py-2.5 text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-2xl border-2 border-dashed border-slate-200 py-4 text-sm font-semibold text-slate-400 hover:border-emerald-400 hover:text-emerald-600 transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span> Add a Custom Event
        </button>
      )}
    </div>
  );
}
