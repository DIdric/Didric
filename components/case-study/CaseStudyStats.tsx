interface Stat {
  label: string;
  value: string;
}

interface CaseStudyStatsProps {
  stats: Stat[];
}

export function CaseStudyStats({ stats }: CaseStudyStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12 bg-dark-800/50 rounded-lg p-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            {stat.value}
          </div>
          <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}