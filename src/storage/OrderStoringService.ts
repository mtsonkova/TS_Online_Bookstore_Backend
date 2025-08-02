import { Order } from "@src/entities/entitiesInterfaces/Order";

export interface OrderStoringService {
	
	saveOrders(order: Order[]): void;
	
	loadOrders(): Order[] | null;
}
