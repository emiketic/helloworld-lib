"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineLocale = defineLocale;
exports.default = exports.TIME_ZONE = void 0;

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TIME_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
exports.TIME_ZONE = TIME_ZONE;

function defineLocale(localeCode) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  defaults = _objectSpread({
    timeZone: TIME_ZONE,
    currency: 'USD'
  }, defaults);
  var translations = {};
  var locale = {
    setTranslations: function setTranslations(_translations) {
      translations = _translations;
    },
    updateTranslations: function updateTranslations(_translations) {
      translations = _objectSpread({}, translations, {
        _translations: _translations
      });
    },
    $t: function $t(text) {
      text = translations[text] || text;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      args.forEach(function (arg) {
        return text = text.replace('%{}', arg);
      });
      return text;
    },
    number: function number(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return value.toLocaleString(localeCode, options);
    },
    // currency(value, currency = defaults.currency, options = {}) {
    //   return `${value.toLocaleString(localeCode, options)} ${currency}`;
    // },
    currency: function currency(value) {
      var _currency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults.currency;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return value.toLocaleString(localeCode, _objectSpread({
        style: 'currency',
        currency: _currency
      }, options));
    },
    date: function date(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return value.toLocaleDateString(localeCode, _objectSpread({}, options, {
        timeZone: options.timeZone || defaults.timeZone
      }));
    },
    time: function time(value) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        hour: 'numeric',
        minute: 'numeric'
      };
      return value.toLocaleTimeString(localeCode, _objectSpread({}, options, {
        timeZone: options.timeZone || defaults.timeZone
      }));
    }
  };
  Object.assign(locale, {
    timestamp: function timestamp(value) {
      return "".concat(locale.date(value), " ").concat(locale.time(value));
    }
  });
  return locale;
}

var $intl = {};
$intl.en = defineLocale('en');
$intl.current = $intl.en;
var _default = $intl;
exports.default = _default;
//# sourceMappingURL=intl.js.map