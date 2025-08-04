// RequestType.ts
import { Priority } from 'src/helpdesk/entities/Priority';

export enum RequestType {
  OTHER = 'OTHER',
  CHANGE_ACCOUNT_DETAILS = 'CHANGE_ACCOUNT_DETAILS',
  CAN_NOT_LOGIN = 'CAN_NOT_LOGIN',
  ACCOUNT_IS_BLOCKED = 'ACCOUNT_IS_BLOCKED',
  COOPERATION = 'COOPERATION',
  ACCOUNT_IS_HACKED = 'ACCOUNT_IS_HACKED',
  CAN_NOT_COMPLETE_PURCHASE = 'CAN_NOT_COMPLETE_PURCHASE',
  ORDER_IS_NOT_RECEIVED = 'ORDER_IS_NOT_RECEIVED',
}

export const RequestTypePriority: Record<RequestType, Priority> = {
  [RequestType.OTHER]: Priority.LOW,
  [RequestType.CHANGE_ACCOUNT_DETAILS]: Priority.LOW,
  [RequestType.CAN_NOT_LOGIN]: Priority.MEDIUM,
  [RequestType.ACCOUNT_IS_BLOCKED]: Priority.MEDIUM,
  [RequestType.COOPERATION]: Priority.MEDIUM,
  [RequestType.ACCOUNT_IS_HACKED]: Priority.HIGH,
  [RequestType.CAN_NOT_COMPLETE_PURCHASE]: Priority.HIGH,
  [RequestType.ORDER_IS_NOT_RECEIVED]: Priority.HIGH,
};

// Usage example
function getPriority(type: RequestType): Priority {
  return RequestTypePriority[type];
}
