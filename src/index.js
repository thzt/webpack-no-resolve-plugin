class NoResolvePlugin {
  constructor(callback) {
    this._callback = callback;
  }

  // type: resolver类型，'normal' | 'context' | 'loader'
  // ref: https://webpack.js.org/api/resolvers/#types
  _report(type, request, error) {
    const {
      context: {
        issuer: file,  // 父模块绝对路径
      },
      path,            // 项目根目录
      request: name,   // 无法加载的模块名
    } = request;

    const {
      details,         // 路径解析堆栈
      message,         // 错误消息
      missing,         // 查找过程
      stack,           // 错误堆栈
    } = error;

    this._callback({
      type,
      file,
      name,
      missing,
      message,
    });
  }

  apply(compiler) {
    compiler.resolverFactory.hooks.resolver.for('normal').tap('NoResolvePlugin: normal resolver', resolver =>
      resolver.hooks.noResolve.tap('NoResolvePlugin', (request, error) =>
        this._report('normal', request, error)
      )
    );

    compiler.resolverFactory.hooks.resolver.for('context').tap('NoResolvePlugin: context resolver', resolver =>
      resolver.hooks.noResolve.tap('NoResolvePlugin', (request, error) =>
        this._report('context', request, error)
      )
    );

    compiler.resolverFactory.hooks.resolver.for('loader').tap('NoResolvePlugin: loader resolver', resolver =>
      resolver.hooks.noResolve.tap('NoResolvePlugin', (request, error) =>
        this._report('loader', request, error)
      )
    );
  }
}

module.exports = NoResolvePlugin;
