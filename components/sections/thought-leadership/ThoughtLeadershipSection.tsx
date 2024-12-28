import { FadeIn } from '../../ui/FadeIn';
import { FrameworkShowcase } from './FrameworkShowcase';
import { AchievementsGrid } from './AchievementsGrid';

export function ThoughtLeadershipSection() {
  return (
    <section className="py-24 w-full bg-gradient-to-b from-[#111111] to-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <div className="max-w-2xl mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Where Science Meets Creativity</h2>
            <p className="text-gray-400">
              Transforming creative excellence into scalable business impact through systematic frameworks and human-centered design.
            </p>
          </div>
        </FadeIn>

        <FrameworkShowcase />
        <AchievementsGrid />
      </div>
    </section>
  );
}