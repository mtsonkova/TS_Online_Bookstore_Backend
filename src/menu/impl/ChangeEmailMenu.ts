import { ApplicationContext } from "src/configs/ApplicationContext";
import { Menu, ExamConstants } from "src/menu/Menu";
import {MainMenu} from "src/menu/impl/MainMenu";
import messages  from 'src/i18n/messages_en.json';

export class ChangeEmailMenu implements Menu {
  private context: ApplicationContext;
 
  constructor() {
    this.context = ApplicationContext.getInstance();
  }

  public start(): void {
    this.printMenuHeader();

    this.readUserInput().then((userInput) => {
     const user = this.context.getLoggedInUser();
if (user) {
  user.setEmail(userInput);
} else {
  console.error("No logged-in user found.");
}
    
  console.log(messages["mail.changed.msg"]);
      new MainMenu().start();
    });
  }

  public printMenuHeader(): void {
    console.log(messages["change.language.header"]);
    process.stdout.write(messages["enter.new.email.cta"]);
  }

  private readUserInput(): Promise<string> {
    return new Promise((resolve) => {
      const readline = require("readline");
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question("", (answer: string) => {
        rl.close();
        resolve(answer.trim());
      });
    });
  }
}