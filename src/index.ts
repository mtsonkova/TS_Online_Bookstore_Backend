import { Menu } from "src/menu/Menu";
import { MainMenu } from "src/menu/impl/MainMenu";

class Main {

  public static readonly EXIT_COMMAND = "exit";

  
  public static main(args: string[]): void {
    const mainMenu: Menu = new MainMenu();
    mainMenu.start();   // Call start on the instance
  }
}
