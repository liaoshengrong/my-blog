const CracoLessPlugin = require("craco-less");
// const rawLoader = require("raw-loader");

module.exports = {
  modules: {
    rules: [
      {
        test: /\.md$/,
        use: [
          {
            loader: "raw-loader",
            options: {
              esModule: false,
            },
          },
        ],
      },
    ],
  },
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
