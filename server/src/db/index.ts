interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
}

interface WalletBalance {
  currencyCode: string;
  currencyName: string;
  amount: number;
  isBase: boolean;
}

interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'buy' | 'sell';
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rateUsed: number;
  rateDate: string;
  createdAt: string;
}

class Database {
  private users: Map<string, User> = new Map();
  private wallets: Map<string, WalletBalance[]> = new Map();
  private transactions: Map<string, Transaction[]> = new Map();

  createUser(user: User): void {
    this.users.set(user.id, user);
    this.wallets.set(user.id, [
      { currencyCode: 'PLN', currencyName: 'Polish Zloty', amount: 0, isBase: true }
    ]);
    this.transactions.set(user.id, []);
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): User | undefined {
    for (const user of this.users.values()) {
      if (user.email === email) return user;
    }
    return undefined;
  }

  getWallet(userId: string): WalletBalance[] {
    return this.wallets.get(userId) || [];
  }

  updateWallet(userId: string, balances: WalletBalance[]): void {
    this.wallets.set(userId, balances);
  }

  addTransaction(userId: string, transaction: Transaction): void {
    const userTransactions = this.transactions.get(userId) || [];
    userTransactions.unshift(transaction);
    this.transactions.set(userId, userTransactions);
  }

  getTransactions(userId: string): Transaction[] {
    return this.transactions.get(userId) || [];
  }
}

export const db = new Database();
export type { User, WalletBalance, Transaction };
