import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import { defineConfig, globalIgnores } from 'eslint/config'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'prettier.config.mjs',
  ]),
  {
    files: ['**/*.tsx', '**/*.ts', '**/*.js', '**/*.jsx'],
    rules: {
      // js
      'import/no-anonymous-default-export': 'off',
      // React
      'react/no-unescaped-entities': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])

export default eslintConfig
