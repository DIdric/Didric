/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#161616',
          800: '#1e1e1e',
          700: '#262626',
          600: '#2e2e2e',
        },
        accent: {
          red: '#FF0600',
          cyan: '#E80066',
          purple: '#9F2BFF',
          blue: '#146BFF'
        }
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(to right, #FF0600, #E80066, #9F2BFF, #146BFF)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        float: 'float 20s ease-in-out infinite',
        fadeOut: 'fadeOut 0.5s ease-in-out forwards',
        progress: 'progress 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(50px, 50px) rotate(5deg)' },
          '50%': { transform: 'translate(0, 100px) rotate(-5deg)' },
          '75%': { transform: 'translate(-50px, 50px) rotate(5deg)' },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, visibility: 'hidden' }
        },
        progress: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.gray[300]'),
            '--tw-prose-links': theme('colors.accent.blue'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.gray[400]'),
            '--tw-prose-bullets': theme('colors.gray[400]'),
            '--tw-prose-hr': theme('colors.dark[600]'),
            '--tw-prose-quotes': theme('colors.gray[300]'),
            '--tw-prose-quote-borders': theme('colors.accent.blue'),
            '--tw-prose-captions': theme('colors.gray[400]'),
            '--tw-prose-code': theme('colors.accent.purple'),
            '--tw-prose-pre-code': theme('colors.gray[300]'),
            '--tw-prose-pre-bg': theme('colors.dark[800]'),
            '--tw-prose-th-borders': theme('colors.dark[600]'),
            '--tw-prose-td-borders': theme('colors.dark[600]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities }) {
      const utilities = {
        '.animation-delay-1000': { animationDelay: '1000ms' },
        '.animation-delay-2000': { animationDelay: '2000ms' },
      };
      addUtilities(utilities);
    }
  ],
};