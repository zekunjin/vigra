import { defineConfig } from 'tsup'
import jsx from 'unplugin-vue-jsx'

export default defineConfig(options => ({
  entry: ['src'],
  splitting: true,
  clean: true,
  treeshake: true,
  dts: true,
  format: ['esm', 'cjs'],
  minify: !options.watch,
  esbuildPlugins: [jsx.esbuild({})]
}))
