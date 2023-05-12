import axios from "axios";
import { CronJob } from "cron";

import { configs } from "../config/config";
import { Car } from "../models/Car.model";

const privatBankParser = async () => {
  const url = configs.PRIVAT_BANK_API;

  const response = await axios.get(url);
  const data = response.data;
  const usdRate = Number(data.find((item: any) => item.ccy === "USD").sale);
  const eurRate = Number(data.find((item: any) => item.ccy === "EUR").sale);

  await Car.updateMany({}, [{ $set: { price_uah: `$currency` } }]);

  await Car.updateMany({ price: "USD" }, { $mul: { price_uah: usdRate } });
  await Car.updateMany({ price: "EUR" }, { $mul: { price_uah: eurRate } });
};

export const privatBankParserCRON = new CronJob("0 0 * * * ", privatBankParser);
