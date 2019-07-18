### webpack-no-resolve-plugin

```
const NoResolvePlugin = require('./dist/index.js');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
  },
  module: {
    rules: [
      { test: /\.js$/, use: { loader: 'babel-loader', query: { presets: ['@babel/preset-env'] } } },
    ]
  },
  plugins: [

    /*
      type: resolver类型
      file: 父模块绝对路径
      name: 无法加载的模块名
      missing: 查找过程
      message: 错误消息
    */
    new NoResolvePlugin(({ type, file, name, missing, message }) => {

    }),
  ],
};
```