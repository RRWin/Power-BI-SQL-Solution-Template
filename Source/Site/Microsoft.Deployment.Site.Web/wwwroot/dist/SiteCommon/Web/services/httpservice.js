"use strict";

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _promise = require('babel-runtime/core-js/promise');

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
var actionrequest_1 = require('./actionrequest');
var actionresponse_1 = require('./actionresponse');

var HttpService = function () {
    function HttpService(MainService, HttpClient) {
        (0, _classCallCheck3.default)(this, HttpService);

        this.baseUrl = 'http://localhost:42387/api/';
        this.isOnPremise = false;
        this.isServiceBusy = false;
        if (window.location.href.startsWith('http://localhost') || window.location.href.startsWith('https://localhost')) {
            this.baseUrl = 'http://localhost:2305/api/';
        } else {
            var url = window.location.href;
            if (url.includes('bpsolutiontemplates')) {
                this.baseUrl = 'https://bpstservice.azurewebsites.net/api/';
            } else {
                url = url.replace('bpst', 'bpstservice');
                var splitUrls = url.split('/');
                this.baseUrl = splitUrls[0] + '//' + splitUrls[2] + '/api/';
            }
        }
        this.MS = MainService;
        this.HttpClient = HttpClient;
        var $window = window;
        if ($window && $window.command) {
            this.command = $window.command;
            this.isOnPremise = true;
        }
    }

    (0, _createClass3.default)(HttpService, [{
        key: 'Close',
        value: function Close() {
            this.command.close(!this.MS.DeploymentService.hasError && this.MS.DeploymentService.isFinished);
        }
    }, {
        key: 'getApp',
        value: function getApp(name) {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var response, uniqueId, responseParsed;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                response = null;
                                uniqueId = this.MS.UtilityService.GetUniqueId(20);

                                this.MS.LoggerService.TrackStartRequest('GetApp-name', uniqueId);

                                if (!this.isOnPremise) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 6;
                                return this.command.gettemplate(this.MS.LoggerService.UserId, this.MS.LoggerService.UserGenId, '', this.MS.LoggerService.OperationId, uniqueId, name);

                            case 6:
                                response = _context.sent;
                                _context.next = 13;
                                break;

                            case 9:
                                _context.next = 11;
                                return this.getRequestObject('get', '/App/' + name).send();

                            case 11:
                                response = _context.sent;

                                response = response.response;

                            case 13:
                                if (!response) {
                                    response = '{}';
                                }
                                this.MS.LoggerService.TrackEndRequest('GetTemplate-name', uniqueId, true);
                                responseParsed = JSON.parse(response);
                                return _context.abrupt('return', responseParsed);

                            case 17:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'executeAsync',
        value: function executeAsync(method) {
            var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                var actionResponse, uniqueId, actionRequest, response, responseParsed;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.isServiceBusy = true;
                                actionResponse = null;

                                if (!content.isInvisible) {
                                    this.MS.ErrorService.Clear();
                                }
                                uniqueId = this.MS.UtilityService.GetUniqueId(20);
                                _context2.prev = 4;
                                actionRequest = new actionrequest_1.ActionRequest(content, this.MS.DataStore);

                                this.MS.LoggerService.TrackStartRequest(method, uniqueId);
                                response = null;

                                if (!this.isOnPremise) {
                                    _context2.next = 14;
                                    break;
                                }

                                _context2.next = 11;
                                return this.command.executeaction(this.MS.LoggerService.UserId, this.MS.LoggerService.UserGenId, '', this.MS.LoggerService.OperationId, uniqueId, this.MS.NavigationService.appName, method, (0, _stringify2.default)(actionRequest));

                            case 11:
                                response = _context2.sent;
                                _context2.next = 18;
                                break;

                            case 14:
                                _context2.next = 16;
                                return this.getRequestObject('post', '/action/' + method, actionRequest).send();

                            case 16:
                                response = _context2.sent;

                                response = response.response;

                            case 18:
                                responseParsed = JSON.parse(response);

                                actionResponse = responseParsed;
                                actionResponse.Status = actionresponse_1.ActionStatus[responseParsed.Status];
                                this.MS.LoggerService.TrackEndRequest(method, uniqueId, !actionResponse.IsSuccess);
                                this.MS.DataStore.loadDataStoreFromJson(actionResponse.DataStore);
                                if (actionResponse.Status === actionresponse_1.ActionStatus.Failure || actionResponse.Status === actionresponse_1.ActionStatus.FailureExpected) {
                                    this.MS.ErrorService.details = actionResponse.ExceptionDetail.AdditionalDetailsErrorMessage + ' --- Action Failed ' + method + ' --- Error ID:(' + this.MS.LoggerService.UserGenId + ')';
                                    this.MS.ErrorService.logLocation = actionResponse.ExceptionDetail.LogLocation;
                                    this.MS.ErrorService.message = actionResponse.ExceptionDetail.FriendlyErrorMessage;
                                    this.MS.ErrorService.showContactUs = actionResponse.Status === actionresponse_1.ActionStatus.Failure;
                                } else if (actionResponse.Status !== actionresponse_1.ActionStatus.Invisible) {
                                    this.MS.ErrorService.Clear();
                                }
                                _context2.next = 31;
                                break;

                            case 26:
                                _context2.prev = 26;
                                _context2.t0 = _context2['catch'](4);

                                this.MS.ErrorService.message = this.MS.Translate.COMMON_UNKNOWN_ERROR;
                                this.MS.ErrorService.showContactUs = true;
                                throw _context2.t0;

                            case 31:
                                _context2.prev = 31;

                                this.isServiceBusy = false;
                                return _context2.finish(31);

                            case 34:
                                return _context2.abrupt('return', actionResponse);

                            case 35:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[4, 26, 31, 34]]);
            }));
        }
    }, {
        key: 'executeAsyncWithImpersonation',
        value: function executeAsyncWithImpersonation(method, content) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
                var body;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                body = {};

                                if (content) {
                                    body = content;
                                }
                                body.useImpersonation = true;
                                return _context3.abrupt('return', this.executeAsync(method, content));

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: 'getRequestObject',
        value: function getRequestObject(method, relativeUrl) {
            var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            var uniqueId = this.MS.UtilityService.GetUniqueId(20);
            var request = this.HttpClient.createRequest(relativeUrl);
            request = request.withBaseUrl(this.baseUrl).withHeader('Content-Type', 'application/json; charset=utf-8').withHeader('UserGeneratedId', this.MS.LoggerService.UserGenId).withHeader('OperationId', this.MS.LoggerService.OperationId).withHeader('SessionId', this.MS.LoggerService.appInsights.context.session.id).withHeader('UserId', this.MS.LoggerService.UserId).withHeader('TemplateName', this.MS.NavigationService.appName).withHeader('UniqueId', uniqueId);
            if (method === 'get') {
                request = request.asGet();
            } else {
                request = request.asPost().withContent((0, _stringify2.default)(body));
            }
            return request;
        }
    }]);
    return HttpService;
}();

exports.HttpService = HttpService;
//# sourceMappingURL=httpservice.js.map
