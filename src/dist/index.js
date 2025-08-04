"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MainMenu_1 = require("src/menu/impl/MainMenu");
class Main {
    static main(args) {
        const mainMenu = new MainMenu_1.MainMenu();
        mainMenu.start(); // Call start on the instance
    }
}
Main.EXIT_COMMAND = "exit";
