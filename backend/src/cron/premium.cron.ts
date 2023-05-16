import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { User } from "../models";

dayjs.extend(utc);

const premiumCron = async (): Promise<void> => {
  const users = await User.find({
    account: "premium",
    premiumExpiration: { $lte: new Date() },
  });

  // Забираем роль "premium" у найденных пользователей
  await User.updateMany(
    { _id: { $in: users.map((user) => user._id) } },
    { account: "base", premiumExpiration: null }
  );
};

export const premiumCRON = new CronJob("0 0 0 1 * *", premiumCron);
