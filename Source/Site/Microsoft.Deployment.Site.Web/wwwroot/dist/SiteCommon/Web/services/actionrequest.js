"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var datastore_1 = require('./datastore');

var ActionRequest = function ActionRequest(parameters, datastore) {
    (0, _classCallCheck3.default)(this, ActionRequest);

    this.DataStore = datastore;
    this.DataStore.PrivateDataStore.remove('RequestParameters');
    this.DataStore.addObjectToDataStoreWithCustomRoute('RequestParameters', parameters, datastore_1.DataStoreType.Private);
};

exports.ActionRequest = ActionRequest;
//# sourceMappingURL=actionrequest.js.map
