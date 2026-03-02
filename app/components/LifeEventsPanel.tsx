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

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-slate-800">Life Events</h2>

      <div className="space-y-2">
        {events.map((event) => (
          <div
            key={event.id}
            className={`rounded-xl border p-3 transition-all ${
              event.enabled
                ? "border-indigo-300 bg-indigo-50"
                : "border-slate-200 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xl">{event.icon}</span>
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${event.enabled ? "text-indigo-800" : "text-slate-700"}`}>
                    {event.label}
                  </p>
                  <p className="text-xs text-slate-400">
                    {event.oneTimeCost > 0 && `$${(event.oneTimeCost / 1000).toFixed(0)}K upfront`}
                    {event.annualCostDelta !== 0 && ` · ${event.annualCostDelta > 0 ? "+" : ""}$${(event.annualCostDelta / 1000).toFixed(0)}K/yr`}
                    {event.annualIncomeDelta !== 0 && ` · +$${(event.annualIncomeDelta / 1000).toFixed(0)}K income`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {event.isCustom && (
                  <button
                    onClick={() => removeCustom(event.id)}
                    className="text-slate-400 hover:text-red-500 text-xs px-1"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={() => toggle(event.id)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    event.enabled ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      event.enabled ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {event.enabled && (
              <div className="mt-2 pt-2 border-t border-indigo-200">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-indigo-600 font-medium">At age</label>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateEventAge(event.id, Math.max(currentAge, event.year - 1))}
                      className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold text-indigo-700 w-8 text-center">
                      {event.year}
                    </span>
                    <button
                      onClick={() => updateEventAge(event.id, Math.min(80, event.year + 1))}
                      className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center"
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

      {/* Add custom event */}
      {showForm ? (
        <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-indigo-700">New Life Event</h3>

          <input
            type="text"
            placeholder="Event name (e.g. Start Business)"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Age it occurs</label>
              <input
                type="number"
                min={currentAge}
                max={80}
                value={form.year}
                onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || currentAge })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">One-time cost ($)</label>
              <input
                type="number"
                min={0}
                value={form.oneTimeCost}
                onChange={(e) => setForm({ ...form, oneTimeCost: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Annual cost change ($)</label>
              <input
                type="number"
                value={form.annualCostDelta}
                onChange={(e) => setForm({ ...form, annualCostDelta: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Annual income change ($)</label>
              <input
                type="number"
                value={form.annualIncomeDelta}
                onChange={(e) => setForm({ ...form, annualIncomeDelta: parseInt(e.target.value) || 0 })}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={addCustomEvent}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium"
            >
              Add Event
            </button>
            <button
              onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
              className="flex-1 bg-white border border-slate-200 text-slate-600 rounded-lg py-2 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-xl border border-dashed border-slate-300 py-3 text-sm text-slate-500 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
        >
          + Add Custom Event
        </button>
      )}
    </div>
  );
}
