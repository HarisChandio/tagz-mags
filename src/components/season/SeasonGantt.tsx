import { ChartGantt } from "lucide-react";

interface Season {
  id: number;
  species: string;
  season: string;
  startDate: string;
  endDate: string;
  status: "active" | "upcoming" | "closed";
  description: string;
}

interface SeasonGanttProps {
  seasons: Season[];
}

const SeasonGantt = ({ seasons }: SeasonGanttProps) => {
  // Fixed timeline for Sep-Dec 2025
  const timelineStart = new Date('2025-09-01');
  const timelineEnd = new Date('2025-12-31');
  
  // Generate month markers for Sep, Oct, Nov, Dec
  const months = [
    { date: new Date('2025-09-01'), label: 'Sep' },
    { date: new Date('2025-10-01'), label: 'Oct' },
    { date: new Date('2025-11-01'), label: 'Nov' },
    { date: new Date('2025-12-01'), label: 'Dec' }
  ];

  const getPositionAndWidth = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalDuration = timelineEnd.getTime() - timelineStart.getTime();
    
    const left = ((start.getTime() - timelineStart.getTime()) / totalDuration) * 100;
    const width = ((end.getTime() - start.getTime()) / totalDuration) * 100;
    
    return { left: `${left}%`, width: `${width}%` };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'upcoming':
        return 'bg-blue-500';
      case 'closed':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getSpeciesIcon = (species: string) => {
    if (species.toLowerCase().includes('deer')) return '';
    if (species.toLowerCase().includes('elk')) return '🫎';
    return '🎯';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <ChartGantt className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold text-green-900">Season Timeline</h2>
      </div>
      
      {/* Month headers */}
      <div className="relative mb-3">
        <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
          {months.map((month, index) => (
            <div key={index} className="text-center flex-1 font-medium">
              {month.label}
            </div>
          ))}
        </div>
      </div>

      {/* Gantt chart */}
      <div className="space-y-2">
        {seasons.map((season) => {
          const position = getPositionAndWidth(season.startDate, season.endDate);
          return (
            <div key={season.id} className="relative">
              <div className="flex items-center mb-1">
                <span className="text-base mr-2">{getSpeciesIcon(season.species)}</span>
                <span className="text-sm font-medium text-gray-700 w-32 truncate">
                  {season.season}
                </span>
              </div>
              <div className="relative h-4 bg-gray-100 rounded-full">
                <div
                  className={`absolute h-full rounded-full ${getStatusColor(season.status)} transition-all duration-300`}
                  style={position}
                >
                  <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full"></div>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-0.5">
                {new Date(season.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
                {new Date(season.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeasonGantt;
