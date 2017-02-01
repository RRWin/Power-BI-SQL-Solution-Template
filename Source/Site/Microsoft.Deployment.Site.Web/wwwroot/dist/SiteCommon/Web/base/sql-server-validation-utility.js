"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SqlServerValidationUtility = function () {
    function SqlServerValidationUtility() {
        (0, _classCallCheck3.default)(this, SqlServerValidationUtility);
    }

    (0, _createClass3.default)(SqlServerValidationUtility, null, [{
        key: 'validateAzureSQLCreate',
        value: function validateAzureSQLCreate(server, username, password, password2) {
            var passwordError = SqlServerValidationUtility.validatePassword(password, password2, 8);
            var servernameError = SqlServerValidationUtility.validateUsername(server, SqlServerValidationUtility.invalidServerNames, 'Server name');
            var usernameError = SqlServerValidationUtility.validateUsername(username, SqlServerValidationUtility.invalidUsernames, 'Username');
            return passwordError || servernameError || usernameError || '';
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword(pwd, pwd2, length) {
            var passwordError = '';
            if (pwd !== pwd2) {
                passwordError = 'Passwords do not match.';
            } else if (length && pwd.length < length) {
                passwordError = 'Password must be at least eight characters long.';
            } else if (/\s/g.test(pwd)) {
                passwordError = 'Password should not contain spaces.';
            } else if (!/[A-Z]/.test(pwd) || /^[a-zA-Z0-9]*$/.test(pwd)) {
                passwordError = 'Password must contain at least one uppercase character and at least one special character.';
            }
            return passwordError;
        }
    }, {
        key: 'validateUsername',
        value: function validateUsername(username, invalidUsernames, usernameText) {
            var usernameError = '';
            if (/\s/g.test(username)) {
                usernameError = usernameText + ' should not contain spaces.';
            } else if (username.length > 63) {
                usernameError = usernameText + ' must not be longer than 63 characters.';
            } else if (invalidUsernames.indexOf(username.toLowerCase()) > -1) {
                usernameError = usernameText + ' cannot be a reserved SQL system name.';
            } else if (!/^[a-zA-Z0-9\-]+$/.test(username)) {
                usernameError = usernameText + ' must only contain alphanumeric characters or hyphens.';
            } else if (username[0] === '-' || username[username.length - 1] === '-') {
                usernameError = usernameText + ' must not start or end with a hyphen.';
            }
            return usernameError;
        }
    }]);
    return SqlServerValidationUtility;
}();

SqlServerValidationUtility.invalidUsernames = ['admin', 'administrator', 'dbmanager', 'dbo', 'guest', 'loginmanager', 'public', 'root', 'sa'];
SqlServerValidationUtility.invalidServerNames = [];
exports.SqlServerValidationUtility = SqlServerValidationUtility;
//# sourceMappingURL=sql-server-validation-utility.js.map
