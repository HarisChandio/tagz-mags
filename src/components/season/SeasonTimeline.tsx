'use client';
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Season {
  title: string;
  icon: string;
  start: string;
  end: string;
  info: string;
}

interface SeasonTimelineProps {
  seasons: Season[];
}

const SeasonTimeline = ({ seasons }: SeasonTimelineProps) => {
  const months = ['Sep', 'Oct', 'Nov', 'Dec'];
  const timelineStart = new Date('2024-09-01');
  const timelineEnd = new Date('2024-12-31');
  const totalMs = timelineEnd.getTime() - timelineStart.getTime();

const getColor = (info: string, title: string) => {
  if (title.toLowerCase().includes('rifle')) return '#b91c1c'; 

  if (info.toUpperCase().includes('OTC')) return '#a8a29e'; 

  const match = info.match(/(\d+)%/);
  if (match) {
    const percent = parseInt(match[1], 10);
    if (percent >= 75) return '#f87171';
    if (percent >= 40) return '#ef4444'; 
    return '#78350f'; 
  }

  return '#a16207'; 
};


  const formatRange = (start: string, end: string) => {
    const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return `${fmt(new Date(start))} – ${fmt(new Date(end))}`;
  };

  const getPosition = (start: string, end: string) => {
    const left = ((new Date(start).getTime() - timelineStart.getTime()) / totalMs) * 100;
    const width = ((new Date(end).getTime() - new Date(start).getTime()) / totalMs) * 100;
    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="text-sm space-y-3">
        {/* Header */}
        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium px-2">
          <span className="w-5" /> {/* Icon */}
          <span className="w-12 text-center">Odds</span>
          <span className="w-40">Season</span>
          <div className="flex-1 grid grid-cols-4 text-center"> {/* Month line */}
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <span className="w-32 text-right pr-2">Dates</span>
        </div>

        {/* Rows */}
        {seasons.map((s, idx) => {
          const pos = getPosition(s.start, s.end);
          const color = getColor(s.info , s.title);
          const pct = s.info.match(/(\d+%)/)?.[1] || s.info;

          return (
            <div key={idx} className="flex items-center gap-3 px-2 h-9">
              <span className="w-5">{s.icon}</span>
              <span
                className="w-12 text-center text-white text-[11px] font-semibold rounded-md py-[2px]"
                style={{ backgroundColor: color }}
              >
                {pct}
              </span>
              <span className="w-40 truncate text-slate-800">{s.title}</span>
              <div className="relative flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className="absolute h-3 rounded-full hover:scale-y-110 transition-transform duration-200"
                      style={{ ...pos, backgroundColor: color }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>{s.info}</TooltipContent>
                </Tooltip>
              </div>
              <span className="w-32 text-xs text-right text-gray-600 pr-2">
                {formatRange(s.start, s.end)}
              </span>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default SeasonTimeline;
