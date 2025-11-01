import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData/**',
      ],
    },
  },
  resolve: {
    alias: [
      { find: /^(@radix-ui\/[^@]+)@[\d.]+$/, replacement: '$1' },
      { find: /^(lucide-react)@[\d.]+$/, replacement: '$1' },
      { find: /^(class-variance-authority)@[\d.]+$/, replacement: '$1' },
      { find: /^(next-themes)@[\d.]+$/, replacement: '$1' },
      { find: /^(sonner)@[\d.]+$/, replacement: '$1' },
      { find: /^(input-otp)@[\d.]+$/, replacement: '$1' },
      { find: /^(react-hook-form)@[\d.]+$/, replacement: '$1' },
      { find: /^(react-day-picker)@[\d.]+$/, replacement: '$1' },
      { find: /^(vaul)@[\d.]+$/, replacement: '$1' },
      { find: /^(cmdk)@[\d.]+$/, replacement: '$1' },
      { find: /^(recharts)@[\d.]+$/, replacement: '$1' },
      { find: /^(embla-carousel-react)@[\d.]+$/, replacement: '$1' },
      { find: /^(react-resizable-panels)@[\d.]+$/, replacement: '$1' },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
});

