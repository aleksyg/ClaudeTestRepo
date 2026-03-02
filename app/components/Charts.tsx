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
} from "recharts";
import { YearlyDataPoint, formatCurrency } from "@/app/lib/projections";

interface Props {
  data: YearlyDataPoint[];
  retirementAge: number;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs max-w-[180px]">
      <p className="font-semibold text-slate-700 mb-1">Age {label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function Charts({ data, retirementAge }: Props) {
  const retirementPoint = data.find((d) => d.age === retirementAge);
  const peakNetWorth = Math.max(...data.map((d) => d.netWorth));
  const fundsDepletedAge = data.find(
    (d, i) => d.netWorth <= 0 && i > 0
  )?.age;

  return (
    <div className="space-y-6">
      {/* Summary chips */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-indigo-50 rounded-xl p-3">
          <p className="text-xs text-indigo-500 font-medium">Peak Net Worth</p>
          <p className="text-lg font-bold text-indigo-700">{formatCurrency(peakNetWorth)}</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-3">
          <p className="text-xs text-emerald-500 font-medium">At Retirement</p>
          <p className="text-lg font-bold text-emerald-700">
            {retirementPoint ? formatCurrency(retirementPoint.netWorth) : "—"}
          </p>
        </div>
        {fundsDepletedAge ? (
          <div className="bg-red-50 rounded-xl p-3 col-span-2">
            <p className="text-xs text-red-500 font-medium">⚠️ Funds Depleted at Age</p>
            <p className="text-lg font-bold text-red-600">{fundsDepletedAge}</p>
          </div>
        ) : (
          <div className="bg-emerald-50 rounded-xl p-3 col-span-2">
            <p className="text-xs text-emerald-500 font-medium">✅ Funds Last Until Age</p>
            <p className="text-lg font-bold text-emerald-700">{data[data.length - 1]?.age}+</p>
          </div>
        )}
      </div>

      {/* Net Worth Chart */}
      <div>
        <h3 className="text-sm font-semibold text-slate-600 mb-2">Net Worth Over Time</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="age"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x={retirementAge}
                stroke="#6366f1"
                strokeDasharray="4 4"
                label={{ value: "Retire", fontSize: 10, fill: "#6366f1" }}
              />
              <Line
                type="monotone"
                dataKey="netWorth"
                name="Net Worth"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cash Flow Chart */}
      <div>
        <h3 className="text-sm font-semibold text-slate-600 mb-2">Annual Cash Flow</h3>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.filter((d) => d.age < retirementAge + 5)}
              margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="age"
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatCurrency}
                tick={{ fontSize: 10, fill: "#94a3b8" }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                x={retirementAge}
                stroke="#6366f1"
                strokeDasharray="4 4"
              />
              <Bar dataKey="annualIncome" name="Income" fill="#10b981" radius={[2, 2, 0, 0]} maxBarSize={20} />
              <Bar dataKey="annualExpenses" name="Expenses" fill="#f87171" radius={[2, 2, 0, 0]} maxBarSize={20} />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "4px" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
