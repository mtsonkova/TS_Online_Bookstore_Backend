import { Menu } from "@src/menu/Menu";
import { MainMenu } from "@src/menu/impl/MainMenu"; // adjust path if needed
import * as readline from "readline";

const RESOURCE_BUNDLE = {
  "change.language.header": {
    en: "Change Language",
    ru: "Сменить язык",
  },
  "select.language.cta": {
    en: "Select language (1 - English, 2 - Russian): ",
    ru: "Выберите язык (1 - Английский, 2 - Русский): ",
  },
};

type Language = "en" | "ru";

export class ChangeLanguageMenu implements Menu {
  private static ENGLISH_ID = 1;
  private static RUSSIAN_ID = 2;

  private currentLanguage: Language = "en";

  private getString(key: keyof typeof RESOURCE_BUNDLE): string {
  return RESOURCE_BUNDLE[key][this.currentLanguage] || key;
}


  async start() {
    this.printMenuHeader();
    const languageId = await this.getUserInput();

    switch (languageId) {
      case ChangeLanguageMenu.ENGLISH_ID:
        this.currentLanguage = "en";
        break;
      case ChangeLanguageMenu.RUSSIAN_ID:
        this.currentLanguage = "ru";
        break;
    }

    // Set language globally if needed
    // For example, you can store it in some global state or context

    // Start MainMenu after language change
    const mainMenu = new MainMenu();
    mainMenu.start();
  }

  printMenuHeader() {
    console.log(this.getString("change.language.header"));
    process.stdout.write(this.getString("select.language.cta"));
  }

  private getUserInput(): Promise<number> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    return new Promise((resolve) => {
      rl.question("", (answer) => {
        rl.close();
        const num = parseInt(answer.trim(), 10);
        resolve(num);
      });
    });
  }
}
