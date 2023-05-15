import { CronJob } from "cron";

import { User } from "../models";

const countOfMonth = async (): Promise<void> => {
  await User.deleteMany({ count_of_month: { gte: 1 } }, { count_of_month: 0 });
};

export const countOfMonthCRON = new CronJob("0 0 1 * *", countOfMonth);
