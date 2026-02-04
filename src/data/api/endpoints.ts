import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 to access host machine's localhost
// iOS simulator and web can use localhost directly
const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3001/api';
  }
  return 'http://localhost:3001/api';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  TIMEOUT: 10000,
};

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  RATES: {
    CURRENT: '/rates/current',
    CURRENCY: (code: string) => `/rates/${code}`,
    HISTORICAL: (code: string) => `/rates/${code}/historical`,
  },
  WALLET: {
    BALANCES: '/wallet/balances',
    TOTAL: '/wallet/total',
    FUND: '/wallet/fund',
  },
  TRANSACTIONS: {
    TRADE: '/transactions/trade',
    HISTORY: '/transactions/history',
    DETAIL: (id: string) => `/transactions/${id}`,
  },
};
