import {Order} from './entities/entitiesInterfaces/Order';

export interface OrderManagementService {

	addOrder(order: Order): void;

	getOrdersByUserId(userId: number): Order[];
	
	getOrders(): Order[];

}
