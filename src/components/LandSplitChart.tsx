'use client';
import React from 'react';
import { PieChart } from 'lucide-react';

const outerRadius = 80;
const innerRadius = 65;
const circumference = 2 * Math.PI * outerRadius;

const landTypes = [
  { name: 'Plains', percentage: 60, color: '#f59e0b' }, 
  { name: 'Mountains', percentage: 40, color: '#6b7280' }, 
];

const forest = { name: 'Forest', percentage: 45 , color: '#10b981' }; 

const LandSplitChart = () => {
  let landOffset = 0;

  const getDashArray = (percentage: number) => {
    const dash = (percentage / 100) * circumference;
    return `${dash} ${circumference - dash}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 w-full">
      <h3 className="text-sm font-bold text-slate-800 mb-2 text-center">Land &amp; Forest Distribution</h3>
      <div className="flex flex-col items-center justify-center">
        <div className="relative w-44 h-44">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Outer background ring */}
            <circle
              cx="100"
              cy="100"
              r={outerRadius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="12"
              opacity="0.5"
            />
            {/* Land Split Segments */}
            {landTypes.map((t, idx) => {
              const dash = getDashArray(t.percentage);
              const el = (
                <circle
                  key={t.name}
                  cx="100"
                  cy="100"
                  r={outerRadius}
                  fill="none"
                  stroke={t.color}
                  strokeWidth="18"
                  strokeDasharray={dash}
                  strokeDashoffset={-landOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  className="transition-all duration-700"
                />
              );
              landOffset += (t.percentage / 100) * circumference;
              return el;
            })}

            {/* Inner Forest Segment */}
            <circle
              cx="100"
              cy="100"
              r={innerRadius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
              opacity="0.4"
            />
            <circle
              cx="100"
              cy="100"
              r={innerRadius}
              fill="none"
              stroke={forest.color}
              strokeWidth="6"
              strokeDasharray={getDashArray(forest.percentage)}
              strokeDashoffset={0}
              strokeLinecap="round"
              transform="rotate(-80 100 100)"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
            <span className="text-slate-700">Plains</span>
            <span className="font-semibold text-slate-800">60%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#6b7280]" />
            <span className="text-slate-700">Mountains</span>
            <span className="font-semibold text-slate-800">40%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
            <span className="text-slate-700">Forest</span>
            <span className="font-semibold text-slate-800">54%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandSplitChart;
