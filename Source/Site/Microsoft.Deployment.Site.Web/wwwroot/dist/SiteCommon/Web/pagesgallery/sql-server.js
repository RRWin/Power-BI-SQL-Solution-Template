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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

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
var sql_server_validation_utility_1 = require('../base/sql-server-validation-utility');
var datastore_1 = require('../services/datastore');
var viewmodelbase_1 = require('../services/viewmodelbase');

var SqlServer = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(SqlServer, _viewmodelbase_1$View);

    function SqlServer() {
        (0, _classCallCheck3.default)(this, SqlServer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SqlServer.__proto__ || (0, _getPrototypeOf2.default)(SqlServer)).call(this));

        _this.subtitle = '';
        _this.title = '';
        _this.auth = 'Windows';
        _this.azureSqlSuffix = '.database.windows.net';
        _this.checkSqlVersion = false;
        _this.database = null;
        _this.databases = [];
        _this.hideSqlAuth = false;
        _this.isAzureSql = false;
        _this.isWindowsAuth = true;
        _this.newSqlDatabase = null;
        _this.password = '';
        _this.passwordConfirmation = '';
        _this.showAllWriteableDatabases = true;
        _this.showAzureSql = true;
        _this.showDatabases = false;
        _this.showNewSqlOption = false;
        _this.showSkuS1 = true;
        _this.sqlInstance = 'ExistingSql';
        _this.sqlServer = '';
        _this.sqlSku = 'S1';
        _this.username = '';
        _this.validateWindowsCredentials = false;
        _this.validationTextBox = '';
        _this.useImpersonation = false;
        _this.isValidated = false;
        return _this;
    }

    (0, _createClass3.default)(SqlServer, [{
        key: 'Invalidate',
        value: function Invalidate() {
            (0, _get3.default)(SqlServer.prototype.__proto__ || (0, _getPrototypeOf2.default)(SqlServer.prototype), 'Invalidate', this).call(this);
            this.database = null;
            this.databases = [];
            this.onAuthChange();
            this.showDatabases = false;
        }
    }, {
        key: 'onAuthChange',
        value: function onAuthChange() {
            this.isWindowsAuth = this.auth.toLowerCase() === 'windows';
        }
    }, {
        key: 'OnValidate',
        value: function OnValidate() {
            var _this2 = this;

            var _super = function _super(name) {
                return (0, _get3.default)(SqlServer.prototype.__proto__ || (0, _getPrototypeOf2.default)(SqlServer.prototype), name, _this2);
            };
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                var databasesResponse, newSqlError, _databasesResponse, isInitValid;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.isValidated = false;
                                this.sqlServer = this.sqlServer.toLowerCase();

                                if (!(this.sqlInstance === 'ExistingSql')) {
                                    _context.next = 9;
                                    break;
                                }

                                _context.next = 5;
                                return this.GetDatabases();

                            case 5:
                                databasesResponse = _context.sent;

                                if (databasesResponse.IsSuccess) {
                                    this.databases = databasesResponse.Body.value;
                                    this.isValidated = true;
                                    this.showDatabases = true;
                                } else {
                                    this.isValidated = false;
                                    this.showDatabases = false;
                                }
                                _context.next = 19;
                                break;

                            case 9:
                                if (!(this.sqlInstance === 'NewSql')) {
                                    _context.next = 19;
                                    break;
                                }

                                newSqlError = sql_server_validation_utility_1.SqlServerValidationUtility.validateAzureSQLCreate(this.sqlServer, this.username, this.password, this.passwordConfirmation);

                                if (!newSqlError) {
                                    _context.next = 15;
                                    break;
                                }

                                this.MS.ErrorService.message = newSqlError;
                                _context.next = 19;
                                break;

                            case 15:
                                _context.next = 17;
                                return this.ValidateAzureServerIsAvailable();

                            case 17:
                                _databasesResponse = _context.sent;

                                if (_databasesResponse.IsSuccess) {
                                    this.isValidated = true;
                                } else {
                                    this.isValidated = false;
                                }

                            case 19:
                                _context.next = 21;
                                return _super("OnValidate").call(this);

                            case 21:
                                isInitValid = _context.sent;

                                this.isValidated = this.isValidated && isInitValid;
                                return _context.abrupt('return', this.isValidated);

                            case 24:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'NavigatingNext',
        value: function NavigatingNext() {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                var body, response, responseVersion, _responseVersion;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                body = this.GetBody(true);
                                response = null;

                                if (!(this.sqlInstance === 'ExistingSql')) {
                                    _context2.next = 8;
                                    break;
                                }

                                _context2.next = 5;
                                return this.MS.HttpService.executeAsync('Microsoft-GetSqlConnectionString', body);

                            case 5:
                                response = _context2.sent;
                                _context2.next = 12;
                                break;

                            case 8:
                                if (!(this.sqlInstance === 'NewSql')) {
                                    _context2.next = 12;
                                    break;
                                }

                                _context2.next = 11;
                                return this.CreateDatabaseServer();

                            case 11:
                                response = _context2.sent;

                            case 12:
                                if (!(!response || !response.IsSuccess)) {
                                    _context2.next = 14;
                                    break;
                                }

                                return _context2.abrupt('return', false);

                            case 14:
                                this.MS.DataStore.addToDataStore('SqlConnectionString', response.Body.value, datastore_1.DataStoreType.Private);
                                this.MS.DataStore.addToDataStore('Server', this.getSqlServer(), datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('Database', this.database, datastore_1.DataStoreType.Public);
                                this.MS.DataStore.addToDataStore('Username', this.username, datastore_1.DataStoreType.Public);

                                if (!this.checkSqlVersion) {
                                    _context2.next = 24;
                                    break;
                                }

                                _context2.next = 21;
                                return this.MS.HttpService.executeAsync('Microsoft-CheckSQLVersion', body);

                            case 21:
                                responseVersion = _context2.sent;

                                if (responseVersion.IsSuccess) {
                                    _context2.next = 24;
                                    break;
                                }

                                return _context2.abrupt('return', false);

                            case 24:
                                if (!this.useImpersonation) {
                                    _context2.next = 36;
                                    break;
                                }

                                this.MS.DataStore.addToDataStore('CredentialTarget', 'pbi_sccm', datastore_1.DataStoreType.Private);
                                this.MS.DataStore.addToDataStore('CredentialUsername', this.username, datastore_1.DataStoreType.Private);
                                this.MS.DataStore.addToDataStore('CredentialPassword', this.password, datastore_1.DataStoreType.Private);
                                body.CredentialTarget = 'pbi_sccm';
                                body.CredentialUsername = this.username;
                                body.CredentialPassword = this.password;
                                _context2.next = 33;
                                return this.MS.HttpService.executeAsync('Microsoft-CredentialManagerWrite', body);

                            case 33:
                                _responseVersion = _context2.sent;

                                if (_responseVersion.IsSuccess) {
                                    _context2.next = 36;
                                    break;
                                }

                                return _context2.abrupt('return', false);

                            case 36:
                                return _context2.abrupt('return', true);

                            case 37:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: 'GetDatabases',
        value: function GetDatabases() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
                var body;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                body = this.GetBody(true);

                                if (!this.showAllWriteableDatabases) {
                                    _context3.next = 7;
                                    break;
                                }

                                _context3.next = 4;
                                return this.MS.HttpService.executeAsync('Microsoft-ValidateAndGetWritableDatabases', body);

                            case 4:
                                _context3.t0 = _context3.sent;
                                _context3.next = 10;
                                break;

                            case 7:
                                _context3.next = 9;
                                return this.MS.HttpService.executeAsync('Microsoft-ValidateAndGetAllDatabases', body);

                            case 9:
                                _context3.t0 = _context3.sent;

                            case 10:
                                return _context3.abrupt('return', _context3.t0);

                            case 11:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }, {
        key: 'GetBody',
        value: function GetBody(withDatabase) {
            var body = {};
            body.useImpersonation = this.useImpersonation;
            body['SqlCredentials'] = {};
            body['SqlCredentials']['Server'] = this.getSqlServer();
            body['SqlCredentials']['User'] = this.username;
            body['SqlCredentials']['Password'] = this.password;
            body['SqlCredentials']['AuthType'] = this.isWindowsAuth && !this.isAzureSql ? 'windows' : 'sql';
            if (this.isAzureSql) {
                body['SqlCredentials']['AuthType'] = 'sql';
            }
            if (withDatabase) {
                body['SqlCredentials']['Database'] = this.database;
            }
            return body;
        }
    }, {
        key: 'getSqlServer',
        value: function getSqlServer() {
            var sqlServer = this.sqlServer;
            if (this.isAzureSql && !sqlServer.includes(this.azureSqlSuffix)) {
                sqlServer += this.azureSqlSuffix;
            }
            return sqlServer;
        }
    }, {
        key: 'CreateDatabaseServer',
        value: function CreateDatabaseServer() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee4() {
                var body;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                this.navigationMessage = this.MS.Translate.SQL_SERVER_CREATING_NEW;
                                body = this.GetBody(true);

                                body['SqlCredentials']['Database'] = this.newSqlDatabase;
                                this.MS.DataStore.addToDataStore('SqlSku', this.sqlSku, datastore_1.DataStoreType.Public);
                                _context4.next = 6;
                                return this.MS.HttpService.executeAsync('Microsoft-CreateAzureSql', body);

                            case 6:
                                return _context4.abrupt('return', _context4.sent);

                            case 7:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: 'ValidateAzureServerIsAvailable',
        value: function ValidateAzureServerIsAvailable() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee5() {
                var body;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                body = this.GetBody(false);
                                _context5.next = 3;
                                return this.MS.HttpService.executeAsync('Microsoft-ValidateAzureSqlExists', body);

                            case 3:
                                return _context5.abrupt('return', _context5.sent);

                            case 4:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: 'OnLoaded',
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee6() {
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
    }]);
    return SqlServer;
}(viewmodelbase_1.ViewModelBase);

exports.SqlServer = SqlServer;
//# sourceMappingURL=sql-server.js.map
