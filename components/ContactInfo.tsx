import React from 'react';
import { Mail, Linkedin, MapPin } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold text-accent-blue">
        Get in Touch
      </h3>
      <div className="space-y-4">
        <a
          href="mailto:contact@didric.nl"
          className="flex items-center space-x-3 text-gray-300 hover:text-accent-blue transition-colors"
        >
          <Mail className="w-5 h-5" />
          <span>contact@didric.nl</span>
        </a>
        <a
          href="https://linkedin.com/in/didric"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-3 text-gray-300 hover:text-accent-blue transition-colors"
        >
          <Linkedin className="w-5 h-5" />
          <span>LinkedIn Profile</span>
        </a>
        <div className="flex items-center space-x-3 text-gray-300">
          <MapPin className="w-5 h-5" />
          <span>Netherlands</span>
        </div>
      </div>
    </div>
  );
}