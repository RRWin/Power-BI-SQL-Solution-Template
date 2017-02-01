"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

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
var actionresponse_1 = require('./actionresponse');
var datastore_1 = require("./datastore");
var ExperienceType_1 = require('../base/ExperienceType');

var DeploymentService = function () {
    function DeploymentService(MainService) {
        (0, _classCallCheck3.default)(this, DeploymentService);

        this.actions = [];
        this.executingIndex = -1;
        this.executingAction = {};
        this.hasError = false;
        this.isFinished = false;
        this.message = '';
        this.MS = MainService;
    }

    (0, _createClass3.default)(DeploymentService, [{
        key: "ExecuteActions",
        value: function ExecuteActions() {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                var lastActionStatus, i, param, response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.experienceType === ExperienceType_1.ExperienceType.uninstall) {
                                    this.MS.LoggerService.TrackUninstallStart();
                                }
                                if (this.experienceType === ExperienceType_1.ExperienceType.install) {
                                    this.MS.LoggerService.TrackDeploymentStart();
                                }
                                lastActionStatus = actionresponse_1.ActionStatus.Success;

                                this.MS.DataStore.DeploymentIndex = '';
                                i = 0;

                            case 5:
                                if (!(i < this.actions.length && !this.hasError)) {
                                    _context.next = 26;
                                    break;
                                }

                                this.MS.DataStore.DeploymentIndex = i.toString();
                                this.executingIndex = i;
                                this.executingAction = this.actions[i];
                                param = {};

                                if (lastActionStatus !== actionresponse_1.ActionStatus.BatchWithState) {
                                    param = this.actions[i].AdditionalParameters;
                                }
                                this.MS.LoggerService.TrackDeploymentStepStartEvent(i, this.actions[i].OperationName);
                                _context.next = 14;
                                return this.MS.HttpService.executeAsync(this.actions[i].OperationName, param);

                            case 14:
                                response = _context.sent;

                                this.message = '';
                                this.MS.LoggerService.TrackDeploymentStepStoptEvent(i, this.actions[i].OperationName, response.IsSuccess);

                                if (response.IsSuccess) {
                                    _context.next = 20;
                                    break;
                                }

                                this.hasError = true;
                                return _context.abrupt("break", 26);

                            case 20:
                                this.MS.DataStore.addObjectToDataStore(response.Body, datastore_1.DataStoreType.Private);
                                if (response.Status === actionresponse_1.ActionStatus.BatchWithState || response.Status === actionresponse_1.ActionStatus.BatchNoState) {
                                    i = i - 1;
                                }
                                lastActionStatus = response.Status;

                            case 23:
                                i++;
                                _context.next = 5;
                                break;

                            case 26:
                                this.MS.DataStore.DeploymentIndex = '';
                                if (!this.hasError) {
                                    this.executingAction = {};
                                    this.executingIndex++;
                                    this.message = 'Success';
                                } else {
                                    this.message = 'Error';
                                }
                                if (this.experienceType === ExperienceType_1.ExperienceType.uninstall) {
                                    this.MS.LoggerService.TrackUninstallEnd(!this.hasError);
                                }
                                if (this.experienceType === ExperienceType_1.ExperienceType.install) {
                                    this.MS.LoggerService.TrackDeploymentEnd(!this.hasError);
                                }
                                this.isFinished = true;
                                if (this.experienceType === ExperienceType_1.ExperienceType.uninstall && !this.hasError) {
                                    this.MS.HttpService.Close();
                                }
                                return _context.abrupt("return", !this.hasError);

                            case 33:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }]);
    return DeploymentService;
}();

exports.DeploymentService = DeploymentService;
//# sourceMappingURL=deploymentservice.js.map
