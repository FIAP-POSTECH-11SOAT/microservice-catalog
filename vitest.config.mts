import tsConfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    root: './',
    coverage: {
      exclude: [...configDefaults.exclude, 'test/**/*', '**/main.ts', '**/*.module.ts', '**/types/**'],
    },
  },
  plugins: [tsConfigPaths()],
})
