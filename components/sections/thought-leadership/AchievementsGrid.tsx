import { FadeIn } from '../../ui/FadeIn';

const achievements = [
  {
    number: "20+",
    label: "Clients Worldwide",
    description: "Trusted by leading brands"
  },
  {
    number: "M100",
    label: "Digital Agencies",
    description: "Industry recognition"
  },
  {
    number: "DDMA",
    label: "Commission Role",
    description: "Industry leadership"
  }
];

export function AchievementsGrid() {
  return (
    <FadeIn delay={0.5}>
      <div className="bg-black/30 rounded-lg p-8">
        <h3 className="text-xl font-bold text-white mb-6">Industry Recognition</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <div key={achievement.label}>
              <div className="text-2xl font-bold text-[#ff3b30]">{achievement.number}</div>
              <div className="font-medium text-white mt-1">{achievement.label}</div>
              <div className="text-sm text-gray-400 mt-1">{achievement.description}</div>
            </div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}