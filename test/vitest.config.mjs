import swc from 'unplugin-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    reporters: ['default'],
    coverage: {
      enabled: true,
      reportOnFailure: true,
    },
    root: '.',
    include: ['**/*.e2e-spec.ts'],
    environment: 'node',
  },
  plugins: [
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: 'es6' },
    }),
    viteTsconfigPaths(),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
});
