import { Priority } from './helpdesk/entities/Priority';
import { RequestType } from './helpdesk/entities/RequestType';
import { RequestTypePriority } from './helpdesk/entities/RequestType';
import { SupportTicket } from './helpdesk/entities/SupportTicket';

export class DefaultSupportTicket implements SupportTicket {
  private static counter = 0;

  private readonly sequentialNumber: number;

  constructor(private readonly requestType: RequestType) {
    this.sequentialNumber = ++DefaultSupportTicket.counter;
  }

  public getPriority(): Priority {
    return RequestTypePriority[this.requestType];
  }

  public getSequentialNumber(): number {
    return this.sequentialNumber;
  }

  public getRequestType(): RequestType {
    return this.requestType;
  }
}
