// types.ts
export type LogEntry = {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
};

export type BotStatus = 'idle' | 'running' | 'paused' | 'error';

export type ProxyConfig = {
  enable: boolean;
  list: string[];
  rotationInterval: number;
  currentProxy?: string;
};

export type CaptchaConfig = {
  enable: boolean;
  apiKey: string;
};

export type NotificationConfig = {
  email: string;
  whatsapp: string;
};

export type AppointmentConfig = {
  location: string;
  visaType: string;
  visaSubType: string;
  categories: string[];
  retryInterval: number;
};

export type BotConfig = {
  credentials: {
    email: string;
    password: string;
  };
  notification: NotificationConfig;
  appointment: AppointmentConfig;
  proxy: ProxyConfig;
  captcha: CaptchaConfig;
};

export type AppointmentDetails = {
  date: string;
  time: string;
  category: string;
  confirmed: boolean;
};