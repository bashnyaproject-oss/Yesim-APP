export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: string;
}

export interface Plan {
  id: string;
  countryId: string;
  name: string;
  data: string; // e.g., "5GB", "Unlimited"
  validity: number; // days
  price: number;
  currency: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface Order {
  id: string;
  planId: string;
  plan: Plan;
  country: Country;
  purchaseDate: Date;
  activationDate?: Date;
  expiryDate: Date;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  qrCode?: string;
  iccid?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

export interface DeviceInfo {
  model: string;
  os: 'ios' | 'android';
  eSIMSupported: boolean;
}

