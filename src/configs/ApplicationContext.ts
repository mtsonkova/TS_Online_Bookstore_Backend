import { Cart } from 'src/entities/entitiesInterfaces/Cart';
import { User } from 'src/entities/entitiesInterfaces/User';
import { DefaultCart } from 'src/entities/impl/DefaultCart';
import { Menu } from 'src/menu/Menu';

export class ApplicationContext {
    private static instance: ApplicationContext;

    private loggedInUser: User | null = null;
    private mainMenu: Menu | null = null;
    private sessionCart: Cart | null = null;

    // Private constructor (like Java)
    private constructor() {
    }

    public setLoggedInUser(user: User | null): void {
        if (this.sessionCart != null) {
            this.sessionCart.clear(); // we have to clear session cart when new user is logged in
        }
        this.loggedInUser = user;
    }

    public getLoggedInUser(): User | null {
        return this.loggedInUser;
    }

    public setMainMenu(menu: Menu): void {
        this.mainMenu = menu;
    }

    public getMainMenu(): Menu | null {
        return this.mainMenu;
    }

    // This matches the Java behavior exactly
    public static getInstance(): ApplicationContext {
        if (ApplicationContext.instance == null) {
            ApplicationContext.instance = new ApplicationContext();
        }
        return ApplicationContext.instance;
    }

    public getSessionCart(): Cart {
        if (this.sessionCart == null) {
            this.sessionCart = new DefaultCart();
        }
        return this.sessionCart;
    }
}