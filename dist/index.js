"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const MainMenu_1 = require("src/menu/impl/MainMenu");
class Main {
    static main(args) {
        const mainMenu = new MainMenu_1.MainMenu();
        mainMenu.start();
    }
}
exports.Main = Main;
Main.EXIT_COMMAND = "exit";
// Call the main method (equivalent to Java's automatic main execution)
Main.main(process.argv.slice(2));
