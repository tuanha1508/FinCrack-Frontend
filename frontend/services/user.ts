import { useApi } from './api';
import { User } from '@/composables/useAuth';

export interface UserData {
  id: string;
  name: string;
  email: string;
  accountInfo: {
    createdAt: string;
    lastLogin: string;
    status: string;
  };
  financialPreferences?: {
    riskTolerance?: string;
    investmentGoals?: string[];
    preferredSectors?: string[];
  };
  dashboardData?: {
    accountBalance?: number;
    savingsGoal?: number;
    recentTransactions?: {
      id: string;
      date: string;
      description: string;
      amount: number;
      category: string;
    }[];
    investmentPerformance?: {
      totalValue: number;
      changePercent: number;
      changeAmount: number;
    };
  };
}

/**
 * User service for handling user data related API requests
 */
export const useUserService = () => {
  const api = useApi();

  // Get user dashboard data
  const getUserDashboardData = async () => {
    const response = await api.get<UserData>('/users/me');
    return response;
  };

  // Get user profile data
  const getUserProfile = () => 
    api.get<User>('/user/profile');

  // Update user profile data
  const updateUserProfile = (userData: Partial<User>) => 
    api.put<User>('/user/profile', userData);

  // Update financial preferences
  const updateFinancialPreferences = (preferences: UserData['financialPreferences']) => 
    api.put<UserData>('/user/preferences', preferences);

  return {
    getUserDashboardData,
    getUserProfile,
    updateUserProfile,
    updateFinancialPreferences
  };
}; 