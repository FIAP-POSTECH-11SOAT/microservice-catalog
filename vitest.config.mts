import tsConfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [...configDefaults.exclude, 'test/**/*', '**/main.ts', '**/*.module.ts', '**/types/**', 'src/infra/env/**'],
    },
  },
  plugins: [tsConfigPaths()],
})
