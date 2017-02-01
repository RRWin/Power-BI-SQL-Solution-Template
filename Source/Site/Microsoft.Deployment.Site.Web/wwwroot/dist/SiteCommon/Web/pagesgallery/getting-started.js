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
var viewmodelbase_1 = require('../services/viewmodelbase');

var Gettingstarted = function (_viewmodelbase_1$View) {
    (0, _inherits3.default)(Gettingstarted, _viewmodelbase_1$View);

    function Gettingstarted() {
        (0, _classCallCheck3.default)(this, Gettingstarted);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Gettingstarted.__proto__ || (0, _getPrototypeOf2.default)(Gettingstarted)).call(this));

        _this.architectureDiagram = '';
        _this.downloadLink = '';
        _this.isDownload = false;
        _this.list1 = [];
        _this.list2 = [];
        _this.list1Title = _this.MS.Translate.GETTING_STARTED_LIST_1;
        _this.list2Title = _this.MS.Translate.GETTING_STARTED_LIST_2;
        _this.prerequisiteDescription = '';
        _this.prerequisiteLink = '';
        _this.prerequisiteLinkText = '';
        _this.registration = '';
        _this.registrationAccepted = false;
        _this.registrationAction = '';
        _this.registrationCompany = '';
        _this.registrationDownload = '';
        _this.registrationEmail = '';
        _this.registrationEmailConfirmation = '';
        _this.registrationEmailsToBlock = '';
        _this.registrationError = '';
        _this.registrationLink = '';
        _this.registrationNameFirst = '';
        _this.registrationNameLast = '';
        _this.registrationPrivacy = '';
        _this.registrationPrivacyTitle = '';
        _this.registrationValidation = '';
        _this.showPrivacy = true;
        _this.subtitle = '';
        _this.templateName = '';
        return _this;
    }

    (0, _createClass3.default)(Gettingstarted, [{
        key: 'GetDownloadLink',
        value: function GetDownloadLink() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee() {
                var response;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.MS.HttpService.executeAsync('Microsoft-GetMsiDownloadLink');

                            case 2:
                                response = _context.sent;

                                if (this.registration) {
                                    this.registrationDownload = response.Body.value;
                                } else {
                                    this.downloadLink = response.Body.value;
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
    }, {
        key: 'OnLoaded',
        value: function OnLoaded() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee2() {
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                this.isValidated = true;
                                if (this.isDownload) {
                                    this.GetDownloadLink();
                                } else {
                                    this.registration = '';
                                }

                            case 2:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: 'Register',
        value: function Register() {
            return __awaiter(this, void 0, void 0, _regenerator2.default.mark(function _callee3() {
                var emailsToBlock, i, emailToBlock, pattern;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                this.registrationError = '';
                                this.registrationNameFirst = this.registrationNameFirst.trim();
                                this.registrationNameLast = this.registrationNameLast.trim();
                                this.registrationCompany = this.registrationCompany.trim();
                                this.registrationEmail = this.registrationEmail.trim();
                                this.registrationEmailConfirmation = this.registrationEmailConfirmation.trim();
                                if (this.registrationNameFirst.length === 0 || this.registrationNameLast.length === 0 || this.registrationCompany.length === 0 || this.registrationEmail.length === 0 || this.registrationEmail !== this.registrationEmailConfirmation || this.registrationEmail.indexOf('@') === -1) {
                                    this.registrationError = this.MS.Translate.GETTING_STARTED_REGISTRATION_ERROR;
                                }
                                if (!this.registrationError) {
                                    emailsToBlock = this.registrationEmailsToBlock.split(',');

                                    for (i = 0; i < emailsToBlock.length && !this.registrationError; i++) {
                                        emailToBlock = emailsToBlock[i].replace('.', '\\.');
                                        pattern = new RegExp('.*' + emailToBlock);

                                        if (pattern.test(this.registrationEmail)) {
                                            this.registrationError = this.MS.Translate.GETTING_STARTED_REGISTRATION_ERROR_EMAIL;
                                        }
                                    }
                                }

                                if (this.registrationError) {
                                    _context3.next = 13;
                                    break;
                                }

                                _context3.next = 11;
                                return this.MS.HttpService.executeAsync(this.registrationAction, { isInvisible: true });

                            case 11:
                                this.registration = '';
                                this.downloadLink = this.registrationDownload;

                            case 13:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
    }]);
    return Gettingstarted;
}(viewmodelbase_1.ViewModelBase);

exports.Gettingstarted = Gettingstarted;
//# sourceMappingURL=getting-started.js.map
