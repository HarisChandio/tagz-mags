import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SeasonTimeline from '@/components/season/SeasonTimeline'
import LandSplitChart from '@/components/LandSplitChart'
import ElevationRangeChart from '@/components/ElevationRangeChart'
import {
  Users,
  BarChart3,
  TrendingUp,
  ClipboardCheck,
  Activity,
  PieChart,
  Lightbulb,
  ChartGantt,
  MapPin,
} from 'lucide-react'
import MapWidgets from '@/components/MapWidget'

interface PreferencePointData {
  category: string
  min: number
  max: number
  color: string
}

interface HuntingData {
  quota: number
  winners: number
  applicants: number
  harvestRate: number
  totalHunters: number
  residentPercentage: number
  nonresidentCap: number
  youthPreference: number
}

const preferenceData: PreferencePointData[] = [
  {
    category: "Resident",
    min: 7,
    max: 15,
    color: "bg-emerald-500",
  },
  {
    category: "Non-resident",
    min: 10,
    max: 22,
    color: "bg-blue-500",
  },
]

const huntingStats: HuntingData = {
  quota: 45,
  winners: 45,
  applicants: 286,
  harvestRate: 12,
  totalHunters: 894,
  residentPercentage: 84,
  nonresidentCap: 25,
  youthPreference: 15
}

interface TimelineSeason {
  title: string
  icon: string
  start: string
  end: string
  info: string
}

const timelineSeasons: TimelineSeason[] = [
  {
    title: 'Archery',
    icon: '',
    start: '2024-09-02',
    end: '2024-09-30',
    info: 'Tag odds 35%'
  },
  {
    title: 'Muzzleloader',
    icon: '',
    start: '2024-09-13',
    end: '2024-09-21',
    info: 'Tag odds 56%'
  },
  {
    title: '1st Rifle',
    icon: '',
    start: '2024-10-15',
    end: '2024-10-19',
    info: 'Tag odds 12%'
  },
  {
    title: '2nd Rifle',
    icon: '',
    start: '2024-10-25',
    end: '2024-11-02',
    info: 'OTC'
  },
  {
    title: '3rd Rifle',
    icon: '',
    start: '2024-11-08',
    end: '2024-11-16',
    info: 'OTC'
  },
  {
    title: '4th Rifle',
    icon: '',
    start: '2024-11-19',
    end: '2024-11-23',
    info: 'Tag odds 55%'
  },
  {
    title: 'Late',
    icon: '',
    start: '2024-12-01',
    end: '2024-12-31',
    info: 'Tag odds 98%'
  }
]

const StatBar = ({ value, maxValue, label, color, isAnimated }: {
  value: number
  maxValue: number
  label: string
  color: string
  isAnimated: boolean
}) => {
  const height = (value / maxValue) * 112

  return (
    <div className="text-center group">
      <div className="relative h-32 mb-4 flex items-end justify-center">
        <div
          className={`w-12 rounded-t-2xl transition-all duration-1200 ease-out hover:scale-110 hover:shadow-2xl shadow-lg relative overflow-hidden group-hover:shadow-2xl`}
          style={{
            height: isAnimated ? `${height}px` : '0px',
            background:
              color === 'bg-blue-400'
                ? 'linear-gradient(180deg, #93c5fd 0%, #60a5fa 50%, #3b82f6 100%)'
                : color === 'bg-blue-500'
                  ? 'linear-gradient(180deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)'
                  : color === 'bg-blue-600'
                    ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 50%, #1e3a8a 100%)'
                    : color === 'bg-emerald-500'
                      ? 'linear-gradient(180deg, #6ee7b7 0%, #10b981 50%, #047857 100%)'
                      : color === 'bg-gray-400'
                        ? 'linear-gradient(180deg, #e5e7eb 0%, #9ca3af 50%, #6b7280 100%)'
                        : 'linear-gradient(180deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)'
          }}
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div
          className="absolute left-1/2 -translate-x-1/2 text-2xl text-slate-800 transition-all duration-1200 ease-out"
          style={{ bottom: isAnimated ? `${height + 8}px` : '0px' }}
        >
          {value}
        </div>
      </div>
      <div className="text-sm font-bold text-slate-600 group-hover:text-slate-800 transition-colors">{label}</div>
    </div>
  )
}

const DonutChart = ({ percentage }: { percentage: number }) => {
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`

  return (
    <div className="relative w-56 h-56 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#donutGradient)"
          strokeWidth="8"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
          className="transition-all duration-1500 ease-out drop-shadow-lg"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-black text-blue-700 mb-1">{percentage}%</div>
          <div className="text-sm text-slate-600 font-bold">Resident</div>
        </div>
      </div>
    </div>
  )
}

const PreferencePointsPanel = () => {
  const maxScale = 30

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white to-slate-50">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-slate-800">Preference Points Range</CardTitle>
            <p className="text-xs text-slate-600 mt-1">
              Min points needed to draw a tag and max points hunters bid<br />
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {preferenceData.map((item, index) => (
          <div key={index} className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-700 text-lg">{item.category}</span>
            </div>

            <div className="relative h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl overflow-hidden shadow-inner">
              <div className="absolute inset-0 flex">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="flex-1 border-r border-slate-300 last:border-r-0" />
                ))}
              </div>

              <div
                className={`absolute top-0 h-full opacity-90 rounded-xl shadow-lg transition-all duration-1000 ease-out`}
                style={{
                  left: `${(item.min / maxScale) * 100}%`,
                  width: `${((item.max - item.min) / maxScale) * 100}%`,
                  backgroundColor: item.category === 'Resident' ? '#60a5fa' : '#2563eb'
                }}
              />

              <div
                className="absolute top-0 h-full flex items-center"
                style={{ left: `${(item.min / maxScale) * 100}%` }}
              >
                <span className="text-sm font-black text-white ml-2">{item.min}</span>
              </div>
              <div
                className="absolute top-0 h-full flex items-center justify-end"
                style={{
                  left: `${(item.min / maxScale) * 100}%`,
                  width: `${((item.max - item.min) / maxScale) * 100}%`,
                }}
              >
                <span className="text-sm font-black text-white mr-2">{item.max}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2 font-semibold">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>30</span>
          </div>
          <div className="h-2 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-full shadow-inner" />
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex  ">
        {/* Applicant Section */}
        <div className="flex items-start gap-2">
          <span className="text-sm font-medium text-slate-600 w-20">Animal:</span>
          <div className="flex flex-wrap gap-2">
            <Badge className="ml-1 bg-blue-100 text-blue-700 !hover:bg-blue-50">Bull</Badge>
            <Badge className="ml-1 bg-blue-100 text-blue-700 !hover:bg-blue-50">Either</Badge>
          </div>
        </div>

        {/* Animal Section */}
        <div className="flex items-start gap-2">
          <span className="text-sm font-medium text-slate-600 w-20">Season:</span>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">Archery</Badge>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">st Rifle</Badge>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function HuntingDashboard() {
  const [isAnimated, setIsAnimated] = useState(false)
  const oversubscription = (huntingStats.applicants / huntingStats.winners).toFixed(1)
  const drawOdds = ((huntingStats.winners / huntingStats.applicants) * 100).toFixed(0)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (

    <div className="flex items-center justify-center p-4 bg-gray-100">
      <div className="w-[90%] bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-600 text-white p-10 relative overflow-hidden">
          {/* Animated circles */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-8 h-8 bg-white rounded-full animate-pulse"></div>
            <div className="absolute top-20 right-16 w-4 h-4 bg-white rounded-full animate-pulse delay-100"></div>
            <div className="absolute bottom-16 left-20 w-6 h-6 bg-white rounded-full animate-pulse delay-200"></div>
            <div className="absolute bottom-10 right-10 w-5 h-5 bg-white rounded-full animate-pulse delay-300"></div>
          </div>

          {/* Header Content */}
          <div className="relative z-10 text-center">
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight ">GMU 551</h1>
            <p className="text-lg md:text-lg font-semibold leading-relaxed">
              Colorado • Elk
            </p>
          </div>
        </div>

        {/* Your main content can go here */}
        <div className="p-2">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-700  border-b border-slate-300 py-4">
              Location & Access
            </h2>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Map Card */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-3xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-800">Map</CardTitle>
                      <p className="text-xs text-slate-600 mt-1">Boundaries and Landmarks</p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <MapWidgets />
                </CardContent>
              </Card>

              {/* Terrain + Area Card */}
             
              <Card className="relative shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-3xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <ClipboardCheck className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-800">Terrain</CardTitle>
                      <p className="text-xs text-slate-600 mt-1">Landscape & Elevation Overview</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[20rem] gap-8">
                    {/* Land Split Chart */}
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="w-full h-full">
                          <LandSplitChart />
                        </div>
                      </div>

                    </div>

                    {/* Elevation Chart */}
                    <div className="space-y-4 ">
                      <div className=" w-full h-full">
                        <ElevationRangeChart />
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className='absolute bottom-0 left-0 right-0'>
                  <div className="flex flex-col md:flex-row gap-4 w-full ">
                    {/* Area */}
                    <div className=" flex-1 bg-gradient-to-br from-teal-100 via-blue-50 to-teal-50 rounded-2xl border-l-4 border-teal-500 shadow-lg text-center py-2">
                      <div className="text-3xl font-black text-teal-700">546</div>
                      <div className="text-md font-bold text-teal-700">sq miles, Area</div>
                    </div>

                    {/* Public Land */}
                    <div className="flex-1 bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-50 rounded-2xl border-l-4 border-yellow-500 shadow-lg text-center py-2">
                      <div className="text-3xl font-black text-yellow-700">45%</div>
                      <div className="text-md font-bold text-yellow-700">Public Land</div>
                    </div>
                  </div>

                </CardFooter>
              </Card>
            </div>

            <h2 className="text-2xl font-bold text-slate-700  border-b border-slate-300 py-4 mt-8">
              Odds and Statistics</h2>
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-3xl transition-all duration-300 mb-10">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <ChartGantt className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Seasons and Odds</CardTitle>
                    <p className="text-xs text-slate-600 mt-1">
                      Season timeline, duration, and applicant odds
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <SeasonTimeline seasons={timelineSeasons} />
              </CardContent>
              <CardFooter className="pt-0 flex  ">
                {/* Applicant Section */}
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 w-20">Applicant:</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">Adult</Badge>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">Nonresident</Badge>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">5 preference points</Badge>
                  </div>
                </div>

                {/* Animal Section */}
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 w-20">Animal:</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">Bull</Badge>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">Either</Badge>
                  </div>
                </div>
              </CardFooter>

            </Card>


            {/* Top Row - Popularity and Points */}
            <div className="grid lg:grid-cols-2 gap-4 ">

              {/* Popularity */}
              <Card className="shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-3xl transition-all duration-300">
                <CardHeader className="pb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-slate-800">Unit Popularity</CardTitle>
                      <p className="text-xs text-slate-600 mt-1">
                        Quota, winners, and applicants overview<br />
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-8 mb-8">
                    <StatBar
                      value={huntingStats.quota}
                      maxValue={huntingStats.applicants}
                      label="Quota"
                      color="bg-blue-400"
                      isAnimated={isAnimated}
                    />
                    <StatBar
                      value={huntingStats.winners}
                      maxValue={huntingStats.applicants}
                      label="Winners"
                      color="bg-blue-500"
                      isAnimated={isAnimated}
                    />
                    <StatBar
                      value={huntingStats.applicants}
                      maxValue={huntingStats.applicants}
                      label="Applicants"
                      color="bg-blue-600"
                      isAnimated={isAnimated}
                    />
                  </div>

                  <div className="text-center px-6 py-3.5 bg-gradient-to-br from-teal-100 via-blue-50 to-teal-50 rounded-2xl border-l-4 border-teal-500 shadow-lg">
                    <div className="text-4xl font-black text-teal-700 mb-2">{oversubscription}x</div>
                    <div className="text-base font-bold text-teal-700">Oversubscription Ratio</div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0 flex  ">
                  {/* Applicant Section */}
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-slate-600 w-20">Animal:</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="ml-1 bg-blue-100 text-blue-700 !hover:bg-blue-50">Bull</Badge>
                      <Badge className="ml-1 bg-blue-100 text-blue-700 !hover:bg-blue-50">Either</Badge>
                    </div>
                  </div>

                  {/* Animal Section */}
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-slate-600 w-20">Season:</span>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">Archery</Badge>
                      <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">st Rifle</Badge>
                    </div>
                  </div>
                </CardFooter>

              </Card>

              {/* Preference Points */}
              <PreferencePointsPanel />
            </div>


            {/* Season Statistics */}
            <Card className="mt-4 shadow-2xl border-0 bg-gradient-to-br from-white to-slate-50 hover:shadow-3xl transition-all duration-300 w-full">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-slate-800">Season Statistics</CardTitle>
                    <p className="text-xs text-slate-600 mt-1">
                      Historical average hunter success and participation<br />
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center px-6 py-3 bg-gradient-to-br from-blue-100 to-slate-100 rounded-2xl border-l-4 border-blue-500 relative overflow-hidden shadow-lg">
                    <div
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400/30 to-blue-700/30 transition-all duration-1500 ease-out rounded-2xl"
                      style={{ width: isAnimated ? '22%' : '0%' }}
                    />
                    <div className="relative z-10">
                      <div className="text-3xl font-black text-blue-700 mb-2">22%</div>
                      <div className="text-base font-bold text-blue-700">Harvest Rate</div>
                    </div>
                  </div>

                  <div className="text-center px-6 py-3.5 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl border-l-4 border-amber-500 shadow-lg">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <Users className="w-8 h-8 text-amber-700" />
                      <div className="text-4xl font-black text-amber-700">{huntingStats.totalHunters.toLocaleString()}</div>
                    </div>
                    <div className="text-base font-bold text-amber-700">Total Hunters</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex  ">
                {/* Applicant Section */}
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 w-20">Animal:</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="ml-1 bg-blue-100 text-blue-700 !hover:bg-blue-50">Bull</Badge>
                    <Badge className="ml-1 bg-blue-100 text-blue-700 !hover:bg-blue-50">Either</Badge>
                  </div>
                </div>

                {/* Animal Section */}
                <div className="flex items-start gap-2">
                  <span className="text-sm font-medium text-slate-600 w-20">Season:</span>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">Archery</Badge>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-50">st Rifle</Badge>
                  </div>
                </div>
              </CardFooter>
            </Card>

          </div>
        </div>


      </div>
    </div>


  )
}
