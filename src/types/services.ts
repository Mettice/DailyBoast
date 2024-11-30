export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface NotificationConfig {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
} 