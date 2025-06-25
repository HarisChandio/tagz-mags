import React from 'react';

const ElevationRangeChart = () => {
  const max = 14500;
  const rangeStart = 6600;
  const rangeEnd = 14100;
  const ticks = [14500, 14000, 12000, 10000, 8000, 6000, 4000, 2000, 0];

  const y = (val: number) => (1 - val / max) * 160; // 160 is height of viewBox

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-3">
      <h3 className="text-sm font-bold text-slate-800 mb-4 text-center">Elevation Range</h3>
     <div className='flex'>
        {/* Left Y-axis labels */}
      <div className="flex flex-col justify-between h-48 pr-2 text-xs text-slate-400 font-medium">
        {ticks.map((t) => (
          <span key={t}>{t.toLocaleString()} ft</span>
        ))}
      </div>

      {/* Chart */}
      <div className="relative w-24 h-56">
        <svg viewBox="0 0 60 160" className="w-full h-full">
          <defs>
            <linearGradient id="elevGradient" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#93c5fd" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Background bar */}
          <rect x="18" y="0" width="40" height="150" rx="6" fill="#e5e7eb" />

          {/* Highlighted range */}
          <rect
            x="18"
            y={y(rangeEnd)}
            width="40"
            height={y(rangeStart) - y(rangeEnd)}
            rx="6"
            fill="url(#elevGradient)"
          />

          {/* Optional white tick lines */}
          {ticks.map((t) => (
            <line
              key={t}
              x1="10"
              x2="50"
              y1={y(t)}
              y2={y(t)}
              stroke="white"
              strokeWidth="0.8"
              opacity="0.4"
            />
          ))}

          {/* Inside labels */}
          <text
            x="48"
            y={y(rangeEnd) + 6}
            fontSize="8"
            fill="white"
            textAnchor="end"
            fontWeight="bold"
          >
            {rangeEnd.toLocaleString()} ft
          </text>
          <text
            x="48"
            y={y(rangeStart) - 2}
            fontSize="8"
            fill="white"
            textAnchor="end"
            fontWeight="bold"
          >
            {rangeStart.toLocaleString()} ft
          </text>
        </svg>
      </div>
     </div>
    
    </div>
  );
};

export default ElevationRangeChart;
