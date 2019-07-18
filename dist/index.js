"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NoResolvePlugin =
/*#__PURE__*/
function () {
  function NoResolvePlugin(callback) {
    _classCallCheck(this, NoResolvePlugin);

    this._callback = callback;
  } // type: resolver类型，'normal' | 'context' | 'loader'
  // ref: https://webpack.js.org/api/resolvers/#types


  _createClass(NoResolvePlugin, [{
    key: "_report",
    value: function _report(type, request, error) {
      var file = request.context.issuer,
          path = request.path,
          name = request.request;
      var details = error.details,
          message = error.message,
          missing = error.missing,
          stack = error.stack;

      this._callback({
        type,
        file,
        name,
        missing,
        message
      });
    }
  }, {
    key: "apply",
    value: function apply(compiler) {
      var _this = this;

      compiler.resolverFactory.hooks.resolver.for('normal').tap('NoResolvePlugin: normal resolver', function (resolver) {
        return resolver.hooks.noResolve.tap('NoResolvePlugin', function (request, error) {
          return _this._report('normal', request, error);
        });
      });
      compiler.resolverFactory.hooks.resolver.for('context').tap('NoResolvePlugin: context resolver', function (resolver) {
        return resolver.hooks.noResolve.tap('NoResolvePlugin', function (request, error) {
          return _this._report('context', request, error);
        });
      });
      compiler.resolverFactory.hooks.resolver.for('loader').tap('NoResolvePlugin: loader resolver', function (resolver) {
        return resolver.hooks.noResolve.tap('NoResolvePlugin', function (request, error) {
          return _this._report('loader', request, error);
        });
      });
    }
  }]);

  return NoResolvePlugin;
}();

module.exports = NoResolvePlugin;