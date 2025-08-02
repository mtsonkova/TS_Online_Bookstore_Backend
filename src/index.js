"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainMenu_1 = require("@src/menu/impl/MainMenu");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function (args) {
        var mainMenu = new MainMenu_1.MainMenu();
        mainMenu.start(); // Call start on the instance
    };
    Main.EXIT_COMMAND = "exit";
    return Main;
}());
