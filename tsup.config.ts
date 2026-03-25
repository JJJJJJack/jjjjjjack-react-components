import { sassPlugin } from "esbuild-sass-plugin";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/styles.scss"], // your barrel file
  format: ["esm", "cjs"], // both module formats
  dts: true, // generate .d.ts files
  splitting: false,
  sourcemap: true,
  clean: true, // wipe dist before each build
  external: ["react", "react-dom", "react-colorful", "react-datepicker", "react-select"], // don't bundle
  loader: {
    ".scss": "css", // tells tsup to process .scss files via sass
  },
  esbuildOptions(options) {
    options.alias = {
      "@": "./src",
    };
  },
  esbuildPlugins: [sassPlugin()],
});
