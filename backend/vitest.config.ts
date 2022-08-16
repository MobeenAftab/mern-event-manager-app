import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './test/setupTests.ts',
    exclude: ['**/node_modules/**', '**/dist/**', '**/data/**'],
    watchExclude: ['**/node_modules/**', '**/dist/**', '**/data/**'],
  },
});
