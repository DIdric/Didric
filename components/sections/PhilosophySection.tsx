import React from 'react';
import { FadeIn } from '../ui/FadeIn';

export function PhilosophySection() {
  return (
    <section className="py-24 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <FadeIn>
          <h2 className="text-3xl font-bold text-white mb-12">Design Philosophy</h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Main Philosophy */}
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <div className="border-l-2 border-[#ff3b30] pl-6">
                <h3 className="text-xl text-white font-bold mb-3">Systematic Creativity</h3>
                <p className="text-gray-400">
                  Good creative work is truly valuable when it's scalable. I develop frameworks 
                  that enable teams to deliver consistent, high-quality experiences at scale.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="border-l-2 border-[#ff3b30] pl-6">
                <h3 className="text-xl text-white font-bold mb-3">Experience Design</h3>
                <p className="text-gray-400">
                  Combining behavioral science with creative excellence to craft meaningful 
                  digital experiences that resonate on a deeper level.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Frameworks */}
          <FadeIn delay={0.6}>
            <div className="bg-[#1a1a1a] rounded-lg p-8">
              <h3 className="text-xl text-white font-bold mb-6">Key Frameworks</h3>
              <div className="space-y-4">
                {/* Framework Item */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#ff3b30]/10 flex items-center justify-center">
                    <span className="text-[#ff3b30]">01</span>
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Total Brand Experience</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Aligning brand values with customer experience touchpoints
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}