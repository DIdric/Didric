import { useState } from 'react';

export function useTheme() {
  // Always return dark mode
  return { isDark: true };
}