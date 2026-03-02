"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import BaselineForm from "@/app/components/BaselineForm";
import LifeEventsPanel from "@/app/components/LifeEventsPanel";
import Charts from "@/app/components/Charts";
import {
  BaselineInputs,
  LifeEvent,
  DEFAULT_LIFE_EVENTS,
  runProjection,
  formatCurrency,
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

type Tab = "settings" | "events" | "projection";

const TABS: { id: Tab; label: string; icon: string; description: string }[] = [
  { id: "settings", label: "Settings", icon: "⚙️", description: "Your baseline" },
  { id: "events", label: "Events", icon: "📅", description: "Life milestones" },
  { id: "projection", label: "Projection", icon: "📈", description: "Your future" },
];

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<BaselineInputs>(DEFAULT_INPUTS);
  const [events, setEvents] = useState<LifeEvent[]>(DEFAULT_LIFE_EVENTS);
  const [activeTab, setActiveTab] = useState<Tab>("projection");

  const projectionData = useMemo(() => runProjection(inputs, events), [inputs, events]);
  const enabledEvents = events.filter((e) => e.enabled).length;

  const retirementPoint = projectionData.find((d) => d.age === inputs.retirementAge);
  const peakNetWorth = Math.max(...projectionData.map((d) => d.netWorth));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center group-hover:bg-emerald-700 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                <path d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H6zm2 3h8v2H8V7zm0 4h8v2H8v-2zm0 4h5v2H8v-2z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900">Chapter</span>
          </Link>

          {/* Quick stats */}
          <div className="flex items-center gap-4 text-right">
            <div className="hidden sm:block">
              <p className="text-xs text-slate-400 leading-none">At retirement</p>
              <p className="text-sm font-bold text-emerald-600">
                {retirementPoint ? formatCurrency(retirementPoint.netWorth) : "—"}
              </p>
            </div>
            {enabledEvents > 0 && (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                {enabledEvents} event{enabledEvents !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-10">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-3 gap-0.5 relative border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-emerald-600 text-emerald-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <span className="text-lg leading-none">{tab.icon}</span>
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 pb-10">
        {activeTab === "settings" && (
          <BaselineForm inputs={inputs} onChange={setInputs} />
        )}
        {activeTab === "events" && (
          <LifeEventsPanel events={events} currentAge={inputs.currentAge} onChange={setEvents} />
        )}
        {activeTab === "projection" && (
          <Charts data={projectionData} retirementAge={inputs.retirementAge} />
        )}
      </main>
    </div>
  );
}
