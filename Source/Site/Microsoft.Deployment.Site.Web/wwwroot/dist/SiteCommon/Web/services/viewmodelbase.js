"use strict";

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require("babel-runtime/core-js/json/stringify");

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var JsonCustomParser_1 = require("../base/JsonCustomParser");
var datastore_1 = require("./datastore");
var aurelia_router_1 = require('aurelia-router');

var ViewModelBase = function () {
    function ViewModelBase() {
        (0, _classCallCheck3.default)(this, ViewModelBase);

        this.isActivated = false;
        this.isValidated = true;
        this.showValidation = false;
        this.showValidationDetails = false;
        this.textNext = 'Next';
        this.showBack = true;
        this.showNext = true;
        this.onNext = [];
        this.onValidate = [];
        this.navigationMessage = '';
        this.useDefaultValidateButton = false;
        this.parametersLoaded = false;
        this.MS = window.MainService;
        this.viewmodel = this;
    }

    (0, _createClass3.default)(ViewModelBase, [{
        key: "loadParameters",
        value: function loadParameters() {
            if (!this.parametersLoaded) {
                var parameters = this.MS.NavigationService.getCurrentSelectedPage().Parameters;
                this.loadVariables(this, parameters);
            }
            this.parametersLoaded = true;
        }
    }, {
        key: "NavigateNext",
        value: function NavigateNext() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var isNavigationSuccessful, isExtendedNavigationSuccessful, currentRoute, viewmodelPreviousSave;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!this.MS.NavigationService.isCurrentlyNavigating) {
                                    _context.next = 2;
                                    break;
                                }

                                return _context.abrupt("return");

                            case 2:
                                _context.prev = 2;

                                this.MS.NavigationService.isCurrentlyNavigating = true;
                                _context.next = 6;
                                return this.NavigatingNext();

                            case 6:
                                isNavigationSuccessful = _context.sent;
                                _context.next = 9;
                                return this.executeActions(this.onNext);

                            case 9:
                                isExtendedNavigationSuccessful = _context.sent;

                                this.navigationMessage = '';
                                if (isNavigationSuccessful && isExtendedNavigationSuccessful) {
                                    currentRoute = this.MS.NavigationService.getCurrentSelectedPage().RoutePageName.toLowerCase();
                                    viewmodelPreviousSave = window.sessionStorage.getItem(currentRoute);

                                    if (viewmodelPreviousSave) {
                                        window.sessionStorage.removeItem(currentRoute);
                                    }
                                    this.viewmodel = null;
                                    this.MS = null;
                                    window.sessionStorage.setItem(currentRoute, (0, _stringify2.default)(this));
                                    this.viewmodel = this;
                                    this.MS = window.MainService;
                                    this.MS.NavigationService.NavigateNext();
                                    this.NavigatedNext();
                                }
                                _context.next = 16;
                                break;

                            case 14:
                                _context.prev = 14;
                                _context.t0 = _context["catch"](2);

                            case 16:
                                _context.prev = 16;

                                this.MS.NavigationService.isCurrentlyNavigating = false;
                                return _context.finish(16);

                            case 19:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[2, 14, 16, 19]]);
            }));
        }
    }, {
        key: "NavigateBack",
        value: function NavigateBack() {
            if (this.MS.NavigationService.isCurrentlyNavigating) {
                return;
            }
            this.MS.NavigationService.isCurrentlyNavigating = true;
            var currentRoute = this.MS.NavigationService.getCurrentSelectedPage().RoutePageName.toLowerCase();
            var viewmodelPreviousSave = window.sessionStorage.getItem(currentRoute);
            if (viewmodelPreviousSave) {
                window.sessionStorage.removeItem(currentRoute);
            }
            this.viewmodel = null;
            this.MS = null;
            window.sessionStorage.setItem(currentRoute, (0, _stringify2.default)(this));
            this.viewmodel = this;
            this.MS = window.MainService;
            this.MS.NavigationService.NavigateBack();
            this.MS.DeploymentService.hasError = false;
            this.MS.ErrorService.Clear();
            this.MS.NavigationService.isCurrentlyNavigating = false;
        }
    }, {
        key: "activate",
        value: function activate(params, navigationInstruction) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
                var currentRoute, viewmodelPreviousSave, jsonParsed, propertyName;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.isActivated = false;
                                this.MS.UtilityService.SaveItem('Current Page', window.location.href);
                                currentRoute = this.MS.NavigationService.getCurrentSelectedPage().RoutePageName.toLowerCase();

                                this.MS.UtilityService.SaveItem('Current Route', currentRoute);
                                viewmodelPreviousSave = window.sessionStorage.getItem(currentRoute);

                                if (viewmodelPreviousSave) {
                                    jsonParsed = JSON.parse(viewmodelPreviousSave);

                                    for (propertyName in jsonParsed) {
                                        this[propertyName] = jsonParsed[propertyName];
                                    }
                                    this.viewmodel = this;
                                    this.viewmodel.MS = window.MainService;
                                } else {
                                    this.loadParameters();
                                }
                                this.MS.NavigationService.currentViewModel = this;
                                this.isActivated = true;

                            case 8:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "NavigatedNext",
        value: function NavigatedNext() {}
    }, {
        key: "attached",
        value: function attached() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.OnLoaded();

                            case 2:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: "determineActivationStrategy",
        value: function determineActivationStrategy() {
            return aurelia_router_1.activationStrategy.replace;
        }
    }, {
        key: "Invalidate",
        value: function Invalidate() {
            this.isValidated = false;
            this.showValidation = false;
            this.validationText = null;
            this.MS.ErrorService.details = '';
            this.MS.ErrorService.message = '';
        }
    }, {
        key: "OnValidate",
        value: function OnValidate() {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (this.isValidated) {
                                    _context4.next = 3;
                                    break;
                                }

                                this.showValidation = true;
                                return _context4.abrupt("return", false);

                            case 3:
                                this.isValidated = false;
                                this.showValidation = false;
                                this.MS.ErrorService.Clear();
                                _context4.next = 8;
                                return this.executeActions(this.onValidate);

                            case 8:
                                this.isValidated = _context4.sent;

                                this.showValidation = true;
                                return _context4.abrupt("return", this.isValidated);

                            case 11:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "NavigatingNext",
        value: function NavigatingNext() {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee5() {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                return _context5.abrupt("return", true);

                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: "OnLoaded",
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
    }, {
        key: "executeActions",
        value: function executeActions(actions) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee7() {
                var index, actionToExecute, name, body, response;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.t0 = _regenerator2.default.keys(actions);

                            case 1:
                                if ((_context7.t1 = _context7.t0()).done) {
                                    _context7.next = 16;
                                    break;
                                }

                                index = _context7.t1.value;
                                actionToExecute = actions[index];
                                name = actionToExecute.name;

                                if (!name) {
                                    _context7.next = 14;
                                    break;
                                }

                                body = {};

                                this.loadVariables(body, actionToExecute);
                                _context7.next = 10;
                                return this.MS.HttpService.executeAsync(name, body);

                            case 10:
                                response = _context7.sent;

                                if (response.IsSuccess) {
                                    _context7.next = 13;
                                    break;
                                }

                                return _context7.abrupt("return", false);

                            case 13:
                                this.MS.DataStore.addObjectToDataStore(response, datastore_1.DataStoreType.Private);

                            case 14:
                                _context7.next = 1;
                                break;

                            case 16:
                                return _context7.abrupt("return", true);

                            case 17:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));
        }
    }, {
        key: "loadVariables",
        value: function loadVariables(objToChange, obj) {
            for (var propertyName in obj) {
                var val = obj[propertyName];
                if (JsonCustomParser_1.JsonCustomParser.isVariable(val)) {
                    var codeToRun = JsonCustomParser_1.JsonCustomParser.extractVariable(val);
                    val = eval(codeToRun);
                    if (JsonCustomParser_1.JsonCustomParser.isPermenantEntryIntoDataStore(obj[propertyName])) {
                        this.MS.DataStore.addToDataStore(propertyName, val, datastore_1.DataStoreType.Private);
                    }
                }
                objToChange[propertyName] = val;
                if (val && (typeof val === "undefined" ? "undefined" : (0, _typeof3.default)(val)) === 'object' && propertyName !== 'onNext' && propertyName !== 'onValidate') {
                    this.loadVariables(objToChange[propertyName], val);
                }
            }
        }
    }]);
    return ViewModelBase;
}();

exports.ViewModelBase = ViewModelBase;
//# sourceMappingURL=viewmodelbase.js.map
