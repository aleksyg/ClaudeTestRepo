"use client";

import { useState, useMemo } from "react";
import BaselineForm from "@/app/components/BaselineForm";
import LifeEventsPanel from "@/app/components/LifeEventsPanel";
import Charts from "@/app/components/Charts";
import {
  BaselineInputs,
  LifeEvent,
  DEFAULT_LIFE_EVENTS,
  runProjection,
} from "@/app/lib/projections";

const DEFAULT_INPUTS: BaselineInputs = {
  currentAge: 28,
  retirementAge: 65,
  currentSavings: 50000,
  annualIncome: 80000,
  monthlySavings: 1000,
  investmentReturn: 7,
  inflationRate: 3,
};

type Tab = "inputs" | "events" | "projection";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "inputs", label: "Baseline", icon: "⚙️" },
  { id: "events", label: "Events", icon: "📅" },
  { id: "projection", label: "Projection", icon: "📈" },
];

export default function Home() {
  const [inputs, setInputs] = useState<BaselineInputs>(DEFAULT_INPUTS);
  const [events, setEvents] = useState<LifeEvent[]>(DEFAULT_LIFE_EVENTS);
  const [activeTab, setActiveTab] = useState<Tab>("projection");

  const projectionData = useMemo(
    () => runProjection(inputs, events),
    [inputs, events]
  );

  const enabledEvents = events.filter((e) => e.enabled).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-lg mx-auto relative">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-4 pt-12 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">RetireCalc</h1>
            <p className="text-xs text-slate-400">Retirement projection with life events</p>
          </div>
          {enabledEvents > 0 && (
            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {enabledEvents} event{enabledEvents !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-4 py-5 pb-24">
        {activeTab === "inputs" && (
          <BaselineForm inputs={inputs} onChange={setInputs} />
        )}
        {activeTab === "events" && (
          <LifeEventsPanel
            events={events}
            currentAge={inputs.currentAge}
            onChange={setEvents}
          />
        )}
        {activeTab === "projection" && (
          <Charts data={projectionData} retirementAge={inputs.retirementAge} />
        )}
      </main>

      {/* Bottom Tab Bar — iPhone style */}
      <nav className="bg-white border-t border-slate-100 fixed bottom-0 left-0 right-0 max-w-lg mx-auto">
        <div className="flex pb-safe-bottom">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 transition-colors relative ${
                activeTab === tab.id ? "text-indigo-600" : "text-slate-400"
              }`}
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span className="text-xs font-medium">
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-indigo-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
