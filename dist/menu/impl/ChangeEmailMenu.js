"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeEmailMenu = void 0;
const ApplicationContext_1 = require("src/configs/ApplicationContext");
const MainMenu_1 = require("src/menu/impl/MainMenu");
const messages_en_json_1 = __importDefault(require("src/i18n/messages_en.json"));
// export interface ResourceBundle {
//   getString(key: string): string;
// }
//Stub for resource bundle loader function; implement based on your i18n solution
//declare function getResourceBundle(baseName: string): ResourceBundle;
class ChangeEmailMenu {
    //private rb: ResourceBundle;
    constructor() {
        this.context = ApplicationContext_1.ApplicationContext.getInstance();
        // this.rb = getResourceBundle(ExamConstants.RESOURCE_BUNDLE_BASE_NAME);
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
            //console.log(this.rb.getString("mail.changed.msg"));
            console.log(messages_en_json_1.default["mail.changed.msg"]);
            // Assuming MainMenu implements Menu interface
            new MainMenu_1.MainMenu().start();
        });
    }
    printMenuHeader() {
        console.log(messages_en_json_1.default["change.language.header"]);
        process.stdout.write(messages_en_json_1.default["enter.new.email.cta"]);
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
