import { privatBankParserCRON } from "./privatbank.parser.cron";

export const cronRunner = () => {
  privatBankParserCRON.start();
};
