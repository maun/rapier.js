const CreateFileWebpack = require("create-file-webpack");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

function matchOtherDimRegex({ is2d }) {
  if (is2d) {
    return /^ *\/\/ *#if +DIM3[\s\S]*?(?=#endif)#endif/gm;
  } else {
    return /^ *\/\/ *#if +DIM2[\s\S]*?(?=#endif)#endif/gm;
  }
}

function wasmImport({ is2d }) {
  let dim = is2d ? "2d" : "3d";
  return `
// @ts-ignore
import wasmBase64 from "url-loader!./rapier_wasm${dim}_bg.wasm";
import wasmInit from "./rapier_wasm${dim}";
`;
}

function copyAndReplace({ is2d }) {
  let dim = is2d ? "2d" : "3d";

  return {
    mode: "production",
    entry: {},
    plugins: [
      new CopyPlugin({
        patterns: [
          // copy src.ts into pkg for compiling,
          // remove sections wrapped in #ifdef DIMx ... #endif
          // replace "##WASM_IMPORT##" with correct import
          {
            from: path.resolve(__dirname, "src.ts"),
            to: path.resolve(__dirname, `rapier${dim}/pkg/`),
            transform(content) {
              return content
                .toString()
                .replace(matchOtherDimRegex({ is2d }), "")
                .replace("##WASM_IMPORT##", wasmImport({ is2d }));
            },
          },
          // copy typescript sources into dist to support source mapping (see #3)
          {
            from: path.resolve(__dirname, "src.ts"),
            to: path.resolve(__dirname, `rapier${dim}/dist/`),
            transform(content) {
              return content
                .toString()
                .replace(matchOtherDimRegex({ is2d }), "");
            },
            filter: (path) => !path.endsWith("raw.ts"),
          },
          // copy package.json, adapting entries, LICENSE and README.md
          {
            from: path.resolve(__dirname, `rapier${dim}/pkg/package.json`),
            to: path.resolve(__dirname, `rapier${dim}/dist/package.json`),
            transform(content) {
              let config = JSON.parse(content.toString());
              config.name = "@dimforge/rapier";
              config.types = "rapier.ts";
              config.main = "rapier.js";
              config.files = ["*"];
              delete config.module;

              return JSON.stringify(config, undefined, 2);
            },
          },
          {
            from: path.resolve(__dirname, `rapier${dim}/pkg/LICENSE`),
            to: path.resolve(__dirname, `rapier${dim}/dist/`),
          },
          {
            from: path.resolve(__dirname, `rapier${dim}/pkg/README.md`),
            to: path.resolve(__dirname, `rapier${dim}/dist/README.md`),
          },
        ],
      }),
      // ts files import from raw.ts, create the file reexporting the wasm-bindgen exports.
      // the indirection simplifies switching between 2d and 3d
      new CreateFileWebpack({
        path: `./rapier${dim}/pkg/`,
        fileName: "raw.ts",
        content: `export * from "./rapier_wasm${dim}"`,
      }),
    ],
  };
}

function compile({ is2d }) {
  let dim = is2d ? "2d" : "3d";

  return {
    mode: "production",
    entry: path.resolve(__dirname, `rapier${dim}/pkg/rapier.ts`),

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "rapier.js",
      path: path.resolve(__dirname, `rapier${dim}/dist`),
      library: "RAPIER",
      libraryTarget: "umd",
    },
  };
}

module.exports = [
  // 2d
  copyAndReplace({ is2d: true }),
  compile({ is2d: true }),

  // 3d
  copyAndReplace({ is2d: false }),
  compile({ is2d: false }),
];
