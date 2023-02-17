export type Bank = {
  id: number;
  name: string;
  phone: string;
  location: string;
};

export type Account = {
  id: number;
  name: string;
  bank: Bank;
  accountNumber: string;
  startDate: Date;
  endDate: Date;
  interest: number;
  interestRate: string;
  tax: number;
  taxRate: string;
  totalAmount: number;
  maturityAmount: number;
  createdAt: Date;
};

export type User = {
  id: number;
  image: string | null;
  name: string;
  password: string;
  role: 'ADMIN' | 'MEMBER';
  accounts: Account[];
};
