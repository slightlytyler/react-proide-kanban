import 'babel-polyfill';

/**
 * This seems to be the easiest way to ensure the `core-js` implementations are
 * used globally.  It'd be nice to not have to do this, but for some reason
 * `core-js/shim` doesn't get applied to dependencies.  So for example, the
 * `provide-map` package ends up using the native `Map` implementation
 * internally (if it exists), while `React.PropTypes.instanceOf(Map)` uses the
 * polyfill, causing a prop validation error.  This fixes that.
 */
if (typeof window !== 'undefined') {
  window.Map = Map;
  window.Set = Set;
  window.WeakMap = WeakMap;
  window.WeakSet = WeakSet;
} else {
  global.Map = Map;
  global.Set = Set;
  global.WeakMap = WeakMap;
  global.WeakSet = WeakSet;
}
