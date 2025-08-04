"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeEmailMenu = void 0;
const ApplicationContext_1 = require("src/configs/ApplicationContext");
const Menu_1 = require("src/menu/Menu");
const MainMenu_1 = require("src/menu/impl/MainMenu");
class ChangeEmailMenu {
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        this.rb = getResourceBundle(Menu_1.ExamConstants.RESOURCE_BUNDLE_BASE_NAME);
    }
    start() {
        this.printMenuHeader();
        this.readUserInput().then((userInput) => {
            const user = this.context.getLoggedInUser();
            if (user) {
                user.setEmail(userInput);
            }
            else {
                console.error("No logged-in user found.");
                // You could also handle this case as appropriate, e.g., show an error message or exit.
            }
            console.log(this.rb.getString("mail.changed.msg"));
            // Assuming MainMenu implements Menu interface
            new MainMenu_1.MainMenu().start();
        });
    }
    printMenuHeader() {
        console.log(this.rb.getString("change.language.header"));
        process.stdout.write(this.rb.getString("enter.new.email.cta"));
    }
    readUserInput() {
        return new Promise((resolve) => {
            const readline = require("readline");
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question("", (answer) => {
                rl.close();
                resolve(answer.trim());
            });
        });
    }
}
exports.ChangeEmailMenu = ChangeEmailMenu;
