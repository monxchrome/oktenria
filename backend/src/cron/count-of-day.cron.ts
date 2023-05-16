import { CronJob } from "cron";

import { User } from "../models";

const countOfDay = async (): Promise<void> => {
  await User.deleteMany({ count_of_day: { gte: 1 } }, { count_of_day: 0 });
};

export const countOfDayCRON = new CronJob("0 0 * * *", countOfDay);
