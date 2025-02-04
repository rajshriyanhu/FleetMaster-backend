export type LocalQuotation = {
  start_date_time: Date;
  end_date_time: string;
  package_type: string;
  time_limit: string;
  km_limit: string;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  cost_extra_hr: string;
  cost_extra_km: string;
  total: number;
  advance: number;
};

export type LocalBooking = {
  start_date_time: Date;
  end_date_time: string;
  package_type: string;
  time_limit: string;
  km_limit: string;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  cost_extra_hr: string;
  cost_extra_km: string;
  total: number;
  advance: number;
  balance: number;
}

export type LocalBilling = {
  start_date_time: Date;
  end_date_time: string;
  package_type: string;
  time_limit: string;
  km_limit: string;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  cost_per_extra_hr: string;
  cost_per_extra_km: string;
  cost_extra_hr: number;
  cost_extra_km: number;
  estimated_cost: number;
  extra_time: number;
  extra_km: number;
  toll: number;
  total: number;
  advance: number;
  balance: number;
}

// outstation - 

export type OutstationQuotation = {
  start_date_time: Date;
  end_date_time: Date;
  days: number;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  cost_per_km: string;
  billing_per_day: number;
  driver_allowance_per_day: number;
  total_billing: number;
  total_driver_allowance: number;
  toll: number;
  state_tax: number;
  total: number;
  advance: number;
};

export type OutstationBooking = {
  start_date_time: Date;
  end_date_time: Date;
  days: number;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  cost_per_km: string;
  billing_per_day: number;
  driver_allowance_per_day: number;
  total_billing: number;
  total_driver_allowance: number;
  toll: number;
  state_tax: number;
  total: number;
  advance: number;
  balance: number;
}

export type OutstationBilling = {
  start_date_time: Date;
  end_date_time: Date;
  days: number;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  cost_per_km: string;
  billing_per_day: number;
  driver_allowance_per_day: number;
  extra_km: number;
  total_billing: number;
  total_km_billing: number;
  total_driver_allowance: number;
  toll: number;
  state_tax: number;
  total: number;
  advance: number;
  balance: number;
}

// lumpsum 

export type LumpsumQuotation = {
  start_date_time: Date;
  end_date_time: Date;
  days: number;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  km_limit: number;
  cost_per_extra_km: number;
  cost_per_extra_hr: number;
  total: number;
};

export type LumpsumBooking = {
  start_date_time: Date;
  end_date_time: Date;
  days: number;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  km_limit: number;
  cost_per_extra_km: number;
  cost_per_extra_hr: number;
  total: number;
  advance: number;
  balance: number;
}

export type LumpsumBilling = {
  start_date_time: Date;
  end_date_time: Date;
  days: number;
  start_location: string;
  end_location: string;
  location_visit: string;
  passenger: string;
  vehicle: string;
  carrier: string;
  actual_km: number;
  cost_extra_km: number;
  cost_extra_hr: number;
  total: number;
  advance: number;
  balance: number;
}

