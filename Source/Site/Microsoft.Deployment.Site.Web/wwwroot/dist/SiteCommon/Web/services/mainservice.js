"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _metadata = require("babel-runtime/core-js/reflect/metadata");

var _metadata2 = _interopRequireDefault(_metadata);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = (0, _getOwnPropertyDescriptor2.default)(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && (0, _defineProperty2.default)(target, key, r), r;
};
var __metadata = undefined && undefined.__metadata || function (k, v) {
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof _metadata2.default === "function") return (0, _metadata2.default)(k, v);
};
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
var aurelia_framework_1 = require('aurelia-framework');
var aurelia_router_1 = require('aurelia-router');
var aurelia_http_client_1 = require('aurelia-http-client');
var datastore_1 = require('./datastore');
var deploymentservice_1 = require('./deploymentservice');
var errorservice_1 = require('./errorservice');
var httpservice_1 = require('./httpservice');
var loggerservice_1 = require('./loggerservice');
var navigationservice_1 = require('./navigationservice');
var translate_service_1 = require('./translate-service');
var utilityservice_1 = require('./utilityservice');
var ExperienceType_1 = require('../base/ExperienceType');
var query_parameter_1 = require('../base/query-parameter');
var MainService = function () {
    function MainService(router, httpClient) {
        (0, _classCallCheck3.default)(this, MainService);

        this.Router = router;
        window.MainService = this;
        this.UtilityService = new utilityservice_1.UtilityService(this);
        this.appName = this.UtilityService.GetQueryParameter(query_parameter_1.QueryParameter.NAME);
        var experienceTypeString = this.UtilityService.GetQueryParameter(query_parameter_1.QueryParameter.TYPE);
        this.experienceType = ExperienceType_1.ExperienceType[experienceTypeString];
        this.ErrorService = new errorservice_1.ErrorService(this);
        this.HttpService = new httpservice_1.HttpService(this, httpClient);
        this.NavigationService = new navigationservice_1.NavigationService(this);
        this.NavigationService.appName = this.appName;
        this.DataStore = new datastore_1.DataStore(this);
        var translate = new translate_service_1.TranslateService(this, this.UtilityService.GetQueryParameter(query_parameter_1.QueryParameter.LANG));
        this.Translate = translate.language;
        if (this.UtilityService.GetItem('App Name') !== this.appName) {
            this.UtilityService.ClearSessionStorage();
        }
        this.UtilityService.SaveItem('App Name', this.appName);
        if (!this.UtilityService.GetItem('UserGeneratedId')) {
            this.UtilityService.SaveItem('UserGeneratedId', this.UtilityService.GetUniqueId(15));
        }
        this.LoggerService = new loggerservice_1.LoggerService(this);
        this.DeploymentService = new deploymentservice_1.DeploymentService(this);
    }

    (0, _createClass3.default)(MainService, [{
        key: "init",
        value: function init() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var pages, actions;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                pages = '';
                                actions = '';

                                if (!(this.appName && this.appName !== '')) {
                                    _context.next = 22;
                                    break;
                                }

                                _context.t0 = this.experienceType;
                                _context.next = _context.t0 === ExperienceType_1.ExperienceType.install ? 6 : _context.t0 === ExperienceType_1.ExperienceType.uninstall ? 9 : 13;
                                break;

                            case 6:
                                pages = 'Pages';
                                actions = 'Actions';
                                return _context.abrupt("break", 17);

                            case 9:
                                pages = 'UninstallPages';
                                actions = 'UninstallActions';
                                this.DeploymentService.experienceType = this.experienceType;
                                return _context.abrupt("break", 17);

                            case 13:
                                pages = 'Pages';
                                actions = 'Actions';
                                this.DeploymentService.experienceType = ExperienceType_1.ExperienceType.install;
                                return _context.abrupt("break", 17);

                            case 17:
                                _context.next = 19;
                                return this.HttpService.getApp(this.appName);

                            case 19:
                                this.templateData = _context.sent;

                                if (this.templateData && this.templateData[pages]) {
                                    this.NavigationService.init(this.templateData[pages]);
                                }
                                if (this.templateData && this.templateData[actions]) {
                                    this.DeploymentService.actions = this.templateData[actions];
                                }

                            case 22:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);
    return MainService;
}();
MainService = __decorate([aurelia_framework_1.inject(aurelia_router_1.Router, aurelia_http_client_1.HttpClient), __metadata('design:paramtypes', [Object, Object])], MainService);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MainService;
//# sourceMappingURL=mainservice.js.map
