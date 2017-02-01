"use strict";

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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
var datastore_1 = require('../services/datastore');
var viewmodelbase_1 = require('../services/viewmodelbase');

var ProgressViewModel = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(ProgressViewModel, _viewmodelbase_1$View);

    function ProgressViewModel() {
        (0, _classCallCheck3.default)(this, ProgressViewModel);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProgressViewModel.__proto__ || (0, _getPrototypeOf2.default)(ProgressViewModel)).call(this));

        _this.emailAddress = '';
        _this.finishedActionName = '';
        _this.isDataPullDone = false;
        _this.isPbixReady = false;
        _this.nameFirst = '';
        _this.nameLast = '';
        _this.pbixDownloadLink = '';
        _this.recordCounts = [];
        _this.showCounts = false;
        _this.showEmailSubmission = true;
        _this.sliceStatus = [];
        _this.sqlServerIndex = 0;
        _this.successMessage = _this.MS.Translate.PROGRESS_ALL_DONE;
        _this.targetSchema = '';
        _this.filename = 'report.pbix';
        _this.isUninstall = false;
        _this.showNext = false;
        return _this;
    }

    (0, _createClass3.default)(ProgressViewModel, [{
        key: 'OnLoaded',
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var success, body, response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (this.MS.DeploymentService.isFinished) {
                                    _context.next = 15;
                                    break;
                                }

                                _context.next = 3;
                                return this.MS.DeploymentService.ExecuteActions();

                            case 3:
                                success = _context.sent;

                                if (success) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return');

                            case 6:
                                if (this.isUninstall) {
                                    _context.next = 15;
                                    break;
                                }

                                body = {};

                                body.FileName = this.filename;
                                body.SqlServerIndex = this.sqlServerIndex;
                                _context.next = 12;
                                return this.MS.HttpService.executeAsync('Microsoft-WranglePBI', body);

                            case 12:
                                response = _context.sent;

                                if (response.IsSuccess) {
                                    this.pbixDownloadLink = response.Body.value;
                                    this.isPbixReady = true;
                                }
                                this.QueryRecordCounts();

                            case 15:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'QueryRecordCounts',
        value: function QueryRecordCounts() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
                var body, response;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (!(this.showCounts && !this.isDataPullDone && !this.MS.DeploymentService.hasError)) {
                                    _context2.next = 10;
                                    break;
                                }

                                body = {};

                                body.FinishedActionName = this.finishedActionName;
                                body.IsWaiting = false;
                                body.SqlServerIndex = this.sqlServerIndex;
                                body.TargetSchema = this.targetSchema;
                                _context2.next = 8;
                                return this.MS.HttpService.executeAsync('Microsoft-GetDataPullStatus', body);

                            case 8:
                                response = _context2.sent;

                                if (response.IsSuccess) {
                                    this.recordCounts = response.Body.status;
                                    this.sliceStatus = response.Body.slices;
                                    this.isDataPullDone = response.Body.isFinished;
                                    this.QueryRecordCounts();
                                } else {
                                    this.MS.DeploymentService.hasError = true;
                                }

                            case 10:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: 'SubmitEmailAddress',
        value: function SubmitEmailAddress() {
            if (this.emailAddress && this.emailAddress.length > 0 && this.emailAddress.indexOf('@') !== -1) {
                this.showEmailSubmission = false;
                try {
                    this.MS.DataStore.addToDataStore('EmailAddress', this.emailAddress, datastore_1.DataStoreType.Public);
                    this.MS.DataStore.addToDataStore('NameFirst', this.nameFirst, datastore_1.DataStoreType.Public);
                    this.MS.DataStore.addToDataStore('NameLast', this.nameLast, datastore_1.DataStoreType.Public);
                    this.MS.HttpService.executeAsync('Microsoft-EmailSubscription', {
                        isInvisible: true
                    });
                } catch (emailSubscriptionException) {}
            }
        }
    }, {
        key: 'SubmitEmailLink',
        value: function SubmitEmailLink() {
            window.open('https://www.microsoft.com/en-us/privacystatement/OnlineServices/Default.aspx', '_blank');
        }
    }]);
    return ProgressViewModel;
}(viewmodelbase_1.ViewModelBase);

exports.ProgressViewModel = ProgressViewModel;
//# sourceMappingURL=progress.js.map
