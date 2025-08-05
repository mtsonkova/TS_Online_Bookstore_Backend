import { Menu } from "src/menu/Menu";
import { MainMenu } from "src/menu/impl/MainMenu";

export class Main {
    public static readonly EXIT_COMMAND: string = "exit";

    public static main(args: string[]): void {
        const mainMenu: Menu = new MainMenu();
        mainMenu.start();
    }
}

// Call the main method (equivalent to Java's automatic main execution)
Main.main(process.argv.slice(2));