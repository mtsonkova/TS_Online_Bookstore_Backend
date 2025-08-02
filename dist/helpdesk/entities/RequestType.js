"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTypePriority = exports.RequestType = void 0;
// RequestType.ts
const Priority_1 = require("@src/helpdesk/entities/Priority");
var RequestType;
(function (RequestType) {
    RequestType["OTHER"] = "OTHER";
    RequestType["CHANGE_ACCOUNT_DETAILS"] = "CHANGE_ACCOUNT_DETAILS";
    RequestType["CAN_NOT_LOGIN"] = "CAN_NOT_LOGIN";
    RequestType["ACCOUNT_IS_BLOCKED"] = "ACCOUNT_IS_BLOCKED";
    RequestType["COOPERATION"] = "COOPERATION";
    RequestType["ACCOUNT_IS_HACKED"] = "ACCOUNT_IS_HACKED";
    RequestType["CAN_NOT_COMPLETE_PURCHASE"] = "CAN_NOT_COMPLETE_PURCHASE";
    RequestType["ORDER_IS_NOT_RECEIVED"] = "ORDER_IS_NOT_RECEIVED";
})(RequestType || (exports.RequestType = RequestType = {}));
exports.RequestTypePriority = {
    [RequestType.OTHER]: Priority_1.Priority.LOW,
    [RequestType.CHANGE_ACCOUNT_DETAILS]: Priority_1.Priority.LOW,
    [RequestType.CAN_NOT_LOGIN]: Priority_1.Priority.MEDIUM,
    [RequestType.ACCOUNT_IS_BLOCKED]: Priority_1.Priority.MEDIUM,
    [RequestType.COOPERATION]: Priority_1.Priority.MEDIUM,
    [RequestType.ACCOUNT_IS_HACKED]: Priority_1.Priority.HIGH,
    [RequestType.CAN_NOT_COMPLETE_PURCHASE]: Priority_1.Priority.HIGH,
    [RequestType.ORDER_IS_NOT_RECEIVED]: Priority_1.Priority.HIGH,
};
// Usage example
function getPriority(type) {
    return exports.RequestTypePriority[type];
}
