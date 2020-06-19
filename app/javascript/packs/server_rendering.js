// By default, this pack is loaded for server-side rendering.
// It must expose react_ujs as `ReactRailsUJS` and prepare a require context.

var ReactRailsUJS = require("react_ujs");

// From react-rails issue #264: https://github.com/reactjs/react-rails/issues/264#issuecomment-552326663
// So that we don't fall back to the global namespace (which leads to hard to
// parse errors).
function fromRequireContext(reqctx) {
  return function(className) {
    const parts = className.split('.');
    const filename = parts.shift();
    const keys = parts;
    // Load the module:
    let component = reqctx('./' + filename);
    // Then access each key:
    keys.forEach((k) => {
      component = component[k];
    });
    // support `export default`
    if (component.__esModule) {
      component = component.default;
    }
    return component;
  };
}
ReactRailsUJS.getConstructor = fromRequireContext(require.context('components', true));
