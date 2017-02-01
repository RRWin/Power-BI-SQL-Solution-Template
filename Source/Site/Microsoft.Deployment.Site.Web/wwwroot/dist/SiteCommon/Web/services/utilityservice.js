"use strict";

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UtilityService = function () {
    function UtilityService(mainservice) {
        (0, _classCallCheck3.default)(this, UtilityService);

        this.MS = mainservice;
    }

    (0, _createClass3.default)(UtilityService, [{
        key: 'GenerateDailyTriggers',
        value: function GenerateDailyTriggers() {
            var dailyTriggers = [];
            for (var i = 0; i < 24; i++) {
                dailyTriggers.push(i + ':00');
                dailyTriggers.push(i + ':30');
            }
            return dailyTriggers;
        }
    }, {
        key: 'GetQueryParameter',
        value: function GetQueryParameter(id) {
            var regex = new RegExp('[?&]' + id.replace(/[\[\]]/g, '\\$&') + '(=([^&#]*)|&|#|$)');
            var results = regex.exec(window.location.href);
            return !results || !results[2] ? '' : decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
    }, {
        key: 'GetQueryParameterFromUrl',
        value: function GetQueryParameterFromUrl(name, url) {
            var regex = new RegExp('[?&]' + name.replace(/[\[\]]/g, '\\$&') + '(=([^&#]*)|&|#|$)');
            var results = regex.exec(url);
            return !results || !results[2] ? '' : decodeURIComponent(results[2].replace(/\+/g, ' '));
        }
    }, {
        key: 'GetRouteFromUrl',
        value: function GetRouteFromUrl() {
            var route = '';
            if (window.location.hash) {
                route = window.location.hash.substring(1);
            }
            return route;
        }
    }, {
        key: 'GetUniqueId',
        value: function GetUniqueId(characters) {
            return Math.random().toString(36).substr(2, characters + 2);
        }
    }, {
        key: 'GetPropertiesForTelemtry',
        value: function GetPropertiesForTelemtry() {
            var obj = {};
            obj.TemplateName = this.MS.NavigationService.appName;
            obj.FullUrl = window.location.href;
            obj.Origin = window.location.origin;
            obj.Host = window.location.host;
            obj.HostName = window.location.hostname;
            obj.PageNumber = this.MS.NavigationService.index;
            obj.Page = (0, _stringify2.default)(this.MS.NavigationService.pages[this.MS.NavigationService.index]);
            obj.RootSource = -this.MS.HttpService.isOnPremise ? 'MSI' : 'WEB';
            return obj;
        }
    }, {
        key: 'HasInternetAccess',
        value: function HasInternetAccess() {
            var response = true;
            if (window.navigator && window.navigator.onLine !== null && window.navigator.onLine !== undefined) {
                response = window.navigator.onLine;
            }
            return response;
        }
    }, {
        key: 'extractDomain',
        value: function extractDomain(username) {
            var usernameSplit = username.split('\\');
            return usernameSplit[0];
        }
    }, {
        key: 'extractUsername',
        value: function extractUsername(username) {
            var usernameSplit = username.split('\\');
            return usernameSplit[1];
        }
    }, {
        key: 'validateUsername',
        value: function validateUsername(username) {
            if (username.includes('\\')) {
                return '';
            } else if (username.length > 0) {
                return 'Username must be in <domain>\\<username> or <machinename>\\<username> format.';
            }
            return 'Please enter your username';
        }
    }, {
        key: 'SaveItem',
        value: function SaveItem(key, value) {
            var val = (0, _stringify2.default)(value);
            if (window.sessionStorage.getItem(key)) {
                window.sessionStorage.removeItem(key);
            }
            window.sessionStorage.setItem(key, val);
        }
    }, {
        key: 'ClearSessionStorage',
        value: function ClearSessionStorage() {
            window.sessionStorage.clear();
        }
    }, {
        key: 'GetItem',
        value: function GetItem(key) {
            var item = JSON.parse(window.sessionStorage.getItem(key));
            return item;
        }
    }, {
        key: 'RemoveItem',
        value: function RemoveItem(key) {
            window.sessionStorage.removeItem(key);
        }
    }]);
    return UtilityService;
}();

exports.UtilityService = UtilityService;
//# sourceMappingURL=utilityservice.js.map
