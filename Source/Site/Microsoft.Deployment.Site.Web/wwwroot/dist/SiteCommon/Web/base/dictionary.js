"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Dictionary = function () {
    function Dictionary() {
        (0, _classCallCheck3.default)(this, Dictionary);

        this.internalKeys = new Array();
        this.internalValues = new Array();
    }

    (0, _createClass3.default)(Dictionary, [{
        key: "length",
        value: function length() {
            return this.internalKeys.length;
        }
    }, {
        key: "keys",
        value: function keys() {
            return this.internalKeys;
        }
    }, {
        key: "values",
        value: function values() {
            return this.internalValues;
        }
    }, {
        key: "get",
        value: function get(key) {
            var index = this.internalKeys.indexOf(key);
            return this.internalValues[index];
        }
    }, {
        key: "getItem",
        value: function getItem(index) {
            var key = this.internalKeys[index];
            var value = this.internalValues[index];
            return [key, value];
        }
    }, {
        key: "add",
        value: function add(key, value) {
            if (this.internalKeys.indexOf(key) > -1) {
                throw new Error("Key is already inside dictionary");
            }
            this.internalKeys.push(key);
            this.internalValues.push(value);
        }
    }, {
        key: "modify",
        value: function modify(key, value) {
            var index = this.internalKeys.indexOf(key);
            if (index === -1) {
                throw new Error("Key is not found inside dictionary");
            }
            this.internalValues[index] = value;
        }
    }, {
        key: "remove",
        value: function remove(key) {
            var index = this.internalKeys.indexOf(key, 0);
            if (index > -1) {
                this.internalKeys.splice(index, 1);
                this.internalValues.splice(index, 1);
            }
        }
    }, {
        key: "containsKey",
        value: function containsKey(key) {
            if (this.internalKeys.indexOf(key) === -1) {
                return false;
            }
            return true;
        }
    }, {
        key: "toJSON",
        value: function toJSON() {
            var toConvert = {};
            for (var i = 0; i < this.length(); i++) {
                toConvert[this.internalKeys[i]] = this.internalValues[i];
            }
            return toConvert;
        }
    }]);
    return Dictionary;
}();

exports.Dictionary = Dictionary;
//# sourceMappingURL=dictionary.js.map
