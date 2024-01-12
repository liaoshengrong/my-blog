const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" }, // 可以在此修改默认的主题变量
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
