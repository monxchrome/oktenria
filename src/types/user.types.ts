export interface IUser {
  _id?: string;
  count: number;
  firstName: string;
  surname: string;
  patronymic: string;
  age: number;
  email: string;
  phone: string;
  password: string;
  status: string;
  account: string;
  role: string;
  premiumExpiration: Date;
}
