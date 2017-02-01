"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionResponse = function ActionResponse() {
    (0, _classCallCheck3.default)(this, ActionResponse);
};

exports.ActionResponse = ActionResponse;
(function (ActionStatus) {
    ActionStatus[ActionStatus["Failure"] = 0] = "Failure";
    ActionStatus[ActionStatus["FailureExpected"] = 1] = "FailureExpected";
    ActionStatus[ActionStatus["BatchNoState"] = 2] = "BatchNoState";
    ActionStatus[ActionStatus["BatchWithState"] = 3] = "BatchWithState";
    ActionStatus[ActionStatus["UserInteractionRequired"] = 4] = "UserInteractionRequired";
    ActionStatus[ActionStatus["Success"] = 5] = "Success";
    ActionStatus[ActionStatus["Invisible"] = 6] = "Invisible";
})(exports.ActionStatus || (exports.ActionStatus = {}));
var ActionStatus = exports.ActionStatus;

var ActionResponseExceptionDetail = function ActionResponseExceptionDetail() {
    (0, _classCallCheck3.default)(this, ActionResponseExceptionDetail);
};

exports.ActionResponseExceptionDetail = ActionResponseExceptionDetail;
//# sourceMappingURL=actionresponse.js.map
