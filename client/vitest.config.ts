import { defineConfig,configDefaults } from 'vitest/config';


export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setupTest.ts'],
    coverage: {
      reporter: ['text', 'html'],
    },
   exclude:  [...configDefaults.exclude],
   
  }

});