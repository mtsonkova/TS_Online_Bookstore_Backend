
import {Cart} from '@src/entities/entitiesInterfaces/Cart';
import {User} from '@src/entities/entitiesInterfaces/User';
import { DefaultCart } from '@src/entities/impl/DefaultCart';
import{Menu} from '@src/menu/Menu';

export class ApplicationContext {
	
	private static instance: ApplicationContext;
	
	private loggedInUser: User | null = null;
	private mainMenu: Menu | null = null;
	private sessionCart: Cart | null = null;
	
   constructor(loggedInUser: User | null = null, mainMenu: Menu | null = null, sessionCart: Cart | null = null) {
	this.loggedInUser = loggedInUser;
	this.mainMenu = mainMenu;
	this.sessionCart = sessionCart;
}

	
	public setLoggedInUser(user: User): void {
		if (this.sessionCart != null) {
			this.sessionCart.clear(); // we have to clear session cart when new user is logged in
		}
		this.loggedInUser = user;
	}
	
	public getLoggedInUser(): User | null{
		return this.loggedInUser;
	}
	
	public setMainMenu(menu: Menu): void {
		this.mainMenu = menu;
	}
	
	public getMainMenu(): Menu | null{
		return this.mainMenu;
	}

	public static getInstance(): ApplicationContext {
	if (!this.instance) {
		throw new Error("ApplicationContext has not been initialized.");
	}
	return this.instance;
}

public static initialize(loggedInUser: User, mainMenu: Menu, sessionCart: Cart): void {
	if (!this.instance) {
		this.instance = new ApplicationContext(loggedInUser, mainMenu, sessionCart);
	}
}
	public getSessionCart(): Cart {
		if (this.sessionCart == null) {
			this.sessionCart = new DefaultCart();
		}
		return this.sessionCart;
	}

}
