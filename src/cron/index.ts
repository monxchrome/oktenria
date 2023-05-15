import { countOfDayCRON } from "./count-of-day.cron";
import { countOfMonthCRON } from "./count-of-month.cron";
import { premiumCRON } from "./premium.cron";
import { privatBankParserCRON } from "./privatbank.parser.cron";

export const cronRunner = () => {
  privatBankParserCRON.start();
  premiumCRON.start();
  countOfDayCRON.start();
  countOfMonthCRON.start();
};
