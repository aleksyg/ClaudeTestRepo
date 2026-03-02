"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import { YearlyDataPoint, formatCurrency } from "@/app/lib/projections";

interface Props {
  data: YearlyDataPoint[];
  retirementAge: number;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs min-w-[140px]">
      <p className="font-bold text-slate-700 mb-2">Age {label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-1.5 mb-1">
          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
          <span className="text-slate-500">{p.name}:</span>
          <span className="font-semibold text-slate-800">{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  variant = "default",
}: {
  label: string;
  value: string;
  sub?: string;
  variant?: "default" | "green" | "red" | "success";
}) {
  const styles = {
    default: "bg-white border-slate-200 text-slate-900",
    green: "bg-emerald-50 border-emerald-200 text-emerald-900",
    red: "bg-red-50 border-red-200 text-red-900",
    success: "bg-emerald-50 border-emerald-200 text-emerald-900",
  };
  const labelStyles = {
    default: "text-slate-500",
    green: "text-emerald-600",
    red: "text-red-500",
    success: "text-emerald-600",
  };
  return (
    <div className={`rounded-2xl border p-4 ${styles[variant]}`}>
      <p className={`text-xs font-semibold mb-1 ${labelStyles[variant]}`}>{label}</p>
      <p className={`text-2xl font-extrabold tracking-tight`}>{value}</p>
      {sub && <p className={`text-xs mt-0.5 ${labelStyles[variant]} opacity-80`}>{sub}</p>}
    </div>
  );
}

export default function Charts({ data, retirementAge }: Props) {
  const retirementPoint = data.find((d) => d.age === retirementAge);
  const peakNetWorth = Math.max(...data.map((d) => d.netWorth));
  const peakAge = data.find((d) => d.netWorth === peakNetWorth)?.age;
  const fundsDepletedAge = data.find((d, i) => d.netWorth <= 0 && i > 0)?.age;
  const preRetirementData = data.filter((d) => d.age <= retirementAge + 5);

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="At Retirement"
          value={retirementPoint ? formatCurrency(retirementPoint.netWorth) : "—"}
          sub={`Age ${retirementAge}`}
          variant="green"
        />
        <StatCard
          label="Peak Net Worth"
          value={formatCurrency(peakNetWorth)}
          sub={peakAge ? `Age ${peakAge}` : undefined}
        />
        {fundsDepletedAge ? (
          <div className="col-span-2">
            <StatCard
              label="⚠️ Funds depleted at age"
              value={String(fundsDepletedAge)}
              sub="Consider increasing savings or delaying retirement"
              variant="red"
            />
          </div>
        ) : (
          <div className="col-span-2">
            <StatCard
              label="✅ Funds last through age"
              value={`${data[data.length - 1]?.age}+`}
              sub="You're on track for a secure retirement"
              variant="success"
            />
          </div>
        )}
      </div>

      {/* Net Worth chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Net Worth Over Time</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="netWorthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="age"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
                width={46}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x={retirementAge}
                stroke="#6366f1"
                strokeDasharray="4 3"
                strokeWidth={1.5}
                label={{ value: "Retire", fontSize: 10, fill: "#6366f1", position: "insideTopRight" }}
              />
              <Area
                type="monotone"
                dataKey="netWorth"
                name="Net Worth"
                stroke="#059669"
                strokeWidth={2.5}
                fill="url(#netWorthGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#059669", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash flow chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Annual Cash Flow</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={preRetirementData}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
              barCategoryGap="30%"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="age"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
                width={46}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x={retirementAge} stroke="#6366f1" strokeDasharray="4 3" strokeWidth={1.5} />
              <Bar dataKey="annualIncome" name="Income" fill="#059669" radius={[3, 3, 0, 0]} maxBarSize={18} />
              <Bar dataKey="annualExpenses" name="Expenses" fill="#f87171" radius={[3, 3, 0, 0]} maxBarSize={18} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center leading-relaxed px-2">
        Projections are estimates for illustrative purposes only, not financial advice.
      </p>
    </div>
  );
}
