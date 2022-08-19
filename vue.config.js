const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "./src/assets/styles/_variables.scss";
        @import "./src/assets/styles/_reset.scss";
        @import "./src/assets/styles/_material-icons.scss";
        `,
      },
    },
  },
});
