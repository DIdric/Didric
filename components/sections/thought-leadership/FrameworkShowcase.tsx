import { FadeIn } from '../../ui/FadeIn';
import { FeaturedFramework } from './FeaturedFramework';
import { FrameworkCard } from './FrameworkCard';
import { frameworks } from '../../../data/frameworks';

export function FrameworkShowcase() {
  const [featured, ...others] = frameworks;

  return (
    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <FadeIn delay={0.2}>
        <FeaturedFramework
          id={featured.id}
          icon={<featured.icon />}
          title={featured.title}
          description={featured.description}
          metrics={featured.metrics}
        />
      </FadeIn>

      <div className="grid grid-cols-1 gap-6">
        {others.map((framework, index) => (
          <FadeIn key={framework.id} delay={0.3 + (index * 0.1)}>
            <FrameworkCard
              id={framework.id}
              icon={<framework.icon />}
              title={framework.title}
              description={framework.description}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}