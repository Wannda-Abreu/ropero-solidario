import { defineConfig,configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'html'],
    },
   exclude:  [...configDefaults.exclude, './tests/jest/*'],
  },
});