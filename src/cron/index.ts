import { premiumCRON } from "./premium.cron";
import { privatBankParserCRON } from "./privatbank.parser.cron";

export const cronRunner = () => {
  privatBankParserCRON.start();
  premiumCRON.start();
};
