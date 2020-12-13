const envVarsAsJSON = require("./src/utils/envVarsAsJSON");
// const getRuntimeConfig = require("./src/utils/getRuntimeConfig");
// const webpack = require("webpack");

module.exports = {
  chainWebpack: config => {
    // config.module
    //   .rule("raw")
    //   .test(/.html$/)
    //   .use("raw-loader")
    //   .loader("raw-loader")
    //   .end()

    //   .rule("string-replace")
    //   .test(/index\.html$/)
    //   .use("string-replace-loader")
    //   .loader("string-replace-loader")
    //   .tap(options => {
    //     options = {
    //       search: "{{ JS_RUNTIME_CONFIG }}",
    //       replace: JSON.stringify(envVarsAsJSON())
    //     };
    //     return options;
    //   })
    //   .end();

    config.plugin("html").tap(args => {
      args[0].title = "My Vue App";
      args[0].templateContent = ({ htmlWebpackPlugin }) => `

      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width,initial-scale=1.0">
          <link rel="icon" href=${process.env.VUE_APP_BASE_URL}favicon.ico />
          <title>${htmlWebpackPlugin.options.title}</title>
      </head>
      <body>
          <noscript>
          <strong>We're sorry but ${htmlWebpackPlugin.options.title} doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
          </noscript>
          <script type="application/json" id="js-runtime-config">
          {{ JS_RUNTIME_CONFIG }}
          </script>
          <div id="app"></div>
      </body>
      </html>
    `;
      return args;
    });

    config.plugin("define").tap(definitions => {
      definitions[0]["process.env"]["PACKAGE_VERSION"] = JSON.stringify(
        require("./package.json").version
      );

      const envVars = envVarsAsJSON();
      for (const key in envVars) {
        definitions[0]["process.env"][key] = JSON.stringify(envVars[key]);
      }

      console.log("process.env: ", process.env);
      //   const runtimeConfig = JSON.parse(getRuntimeConfig());
      //   for (const key in runtimeConfig) {
      //     definitions[0]["process.env"][key] = JSON.stringify(runtimeConfig[key]);
      //   }
      return definitions;
    });
  }
};
