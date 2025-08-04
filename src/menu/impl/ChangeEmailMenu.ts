import { ApplicationContext } from "src/configs/ApplicationContext";
import { Menu, ExamConstants } from "src/menu/Menu";
import {MainMenu} from "src/menu/impl/MainMenu";

export interface ResourceBundle {
  getString(key: string): string;
}

// Stub for resource bundle loader function; implement based on your i18n solution
declare function getResourceBundle(baseName: string): ResourceBundle;

export class ChangeEmailMenu implements Menu {
  private context: ApplicationContext;
  private rb: ResourceBundle;

  constructor() {
    this.context = ApplicationContext.getInstance();
    this.rb = getResourceBundle(ExamConstants.RESOURCE_BUNDLE_BASE_NAME);
  }

  public start(): void {
    this.printMenuHeader();

    this.readUserInput().then((userInput) => {
     const user = this.context.getLoggedInUser();
if (user) {
  user.setEmail(userInput);
} else {
  console.error("No logged-in user found.");
  // You could also handle this case as appropriate, e.g., show an error message or exit.
}


      console.log(this.rb.getString("mail.changed.msg"));

      // Assuming MainMenu implements Menu interface
      new MainMenu().start();
    });
  }

  public printMenuHeader(): void {
    console.log(this.rb.getString("change.language.header"));
    process.stdout.write(this.rb.getString("enter.new.email.cta"));
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
