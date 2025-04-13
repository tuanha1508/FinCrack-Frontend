import { useApi } from './api';
import { User } from '@/composables/useAuth';

export interface BankRecommendation {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  digitalInterfaceRank: number;
  numberOfBranches: number;
  greenInitiativesRank: number;
  feeLevelRank: number;
  internationalSupportRank: number;
  interestRateRangeRank: number;
  customerServiceQualityRank: number;
  capitalAdequacyRank: number;
  autoLoans: boolean;
  creditCards: boolean;
  globalBanking: boolean;
  investments: boolean;
  loans: boolean;
  mortgages: boolean;
  savingsAccounts: boolean;
  globalCustomers: boolean;
  professionals: boolean;
  smes: boolean;
  seniors: boolean;
  students: boolean;
  techSavvy: boolean;
  recommendedBank: string;
}

export interface UserData {
  id: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  firstName: string;
  lastName: string;
  wishlist: string[];
  bankRecommendations: BankRecommendation[];
}

/**
 * User service for handling user data related API requests
 */
export const useUserService = () => {
  const api = useApi();

  // Get user dashboard data
  const getUserData = async () => {
    return api.get<UserData>('/users/me');
  }
  
  // Update user wishlist
  const updateWishlist = (wishlist: string[]) =>
    api.put<UserData>('/users/wishlist', { wishlist });
    
  // Get bank recommendations
  const getBankRecommendations = () =>
    api.get<BankRecommendation[]>('/users/bank-recommendations');

  return {
    getUserData,
    updateWishlist,
    getBankRecommendations
  };
}; 