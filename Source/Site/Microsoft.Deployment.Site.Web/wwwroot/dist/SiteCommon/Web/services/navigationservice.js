"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NavigationService = function () {
    function NavigationService(MainService) {
        (0, _classCallCheck3.default)(this, NavigationService);

        this.currentViewModel = null;
        this.index = -1;
        this.isOnline = true;
        this.pages = [];
        this.appName = '';
        this.isCurrentlyNavigating = false;
        this.MS = MainService;
    }

    (0, _createClass3.default)(NavigationService, [{
        key: 'init',
        value: function init(pagesJson) {
            this.pages = pagesJson;
            if (this.pages && this.pages.length && this.pages.length > 0) {
                this.index = 0;
                for (var i = 1; i < this.pages.length; i++) {
                    this.MS.Router.addRoute({
                        route: this.pages[i].RoutePageName.toLowerCase(),
                        name: this.pages[i].PageName,
                        moduleId: '.' + this.pages[i].Path.replace(/\\/g, "/"),
                        title: this.pages[i].DisplayName,
                        nav: true
                    });
                }
                this.MS.Router.addRoute({
                    route: '',
                    name: this.pages[0].PageName,
                    moduleId: '.' + this.pages[0].Path.replace(/\\/g, "/"),
                    title: this.pages[0].DisplayName,
                    nav: true
                });
                this.pages[0].isActive = true;
                this.pages[0].RoutePageName = '';
                this.MS.Router.refreshNavigation();
            }
            this.UpdateIndex();
            this.MS.DataStore.CurrentRoutePage = this.pages[this.index].RoutePageName.toLowerCase();
            this.MS.LoggerService.TrackPageView(this.GetCurrentRoutePath(), window.location.href);
        }
    }, {
        key: 'GetCurrentRoutePath',
        value: function GetCurrentRoutePath() {
            var history = this.MS.Router.history;
            var route = history.location.hash;
            var routePage = this.MS.NavigationService.appName + route.replace('#', '');
            if (routePage.endsWith('/')) {
                routePage += '//';
                routePage.replace('///', '');
            }
            return routePage;
        }
    }, {
        key: 'GetRoute',
        value: function GetRoute() {
            var history = this.MS.Router.history;
            var route = history.location.hash;
            return route.replace('#', '').replace('/', '');
        }
    }, {
        key: 'UpdateIndex',
        value: function UpdateIndex() {
            var routePageName = this.GetRoute();
            for (var i = 0; i < this.pages.length; i++) {
                if (this.pages[i].RoutePageName.toLowerCase() === routePageName.toLowerCase()) {
                    this.index = i;
                }
            }
            for (var _i = 0; _i < this.pages.length; _i++) {
                this.pages[_i].isActive = _i === this.index;
                this.pages[_i].isComplete = _i < this.index;
            }
            return this.index;
        }
    }, {
        key: 'NavigateNext',
        value: function NavigateNext() {
            this.UpdateIndex();
            if (this.index >= this.pages.length - 1) {
                return;
            }
            this.index = this.index + 1;
            this.NavigateToIndex();
        }
    }, {
        key: 'NavigateBack',
        value: function NavigateBack() {
            this.UpdateIndex();
            if (this.index == 0) {
                return;
            }
            this.index = this.index - 1;
            this.NavigateToIndex();
        }
    }, {
        key: 'JumpTo',
        value: function JumpTo(index) {
            this.index = index;
            this.NavigateToIndex();
        }
    }, {
        key: 'NavigateToIndex',
        value: function NavigateToIndex() {
            this.MS.DataStore.CurrentRoutePage = this.pages[this.index].RoutePageName.toLowerCase();
            this.MS.Router.navigate('#/' + this.pages[this.index].RoutePageName.toLowerCase());
            this.MS.Router.refreshNavigation();
            this.UpdateIndex();
            this.MS.LoggerService.TrackPageView(this.appName + '/' + this.pages[this.index].RoutePageName.toLowerCase(), window.location.href);
        }
    }, {
        key: 'getCurrentSelectedPage',
        value: function getCurrentSelectedPage() {
            return this.pages[this.index];
        }
    }, {
        key: 'getIndex',
        value: function getIndex() {
            return this.index;
        }
    }, {
        key: 'isLastPage',
        value: function isLastPage() {
            if (this.pages.length - 1 === this.getIndex()) {
                return true;
            }
            return false;
        }
    }, {
        key: 'isFirstPage',
        value: function isFirstPage() {
            return this.getIndex() === 0;
        }
    }]);
    return NavigationService;
}();

exports.NavigationService = NavigationService;
//# sourceMappingURL=navigationservice.js.map
