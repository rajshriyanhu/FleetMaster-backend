import { LocalBilling, LocalBooking, LocalQuotation, LumpsumBilling, LumpsumBooking, LumpsumQuotation, OutstationBilling, OutstationBooking, OutstationQuotation } from "../types";

function formatDate(isoDate: Date): string {
    const date = new Date(isoDate);

    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getUTCFullYear();

    const dayWithSuffix = day + (['th', 'st', 'nd', 'rd'][(day % 10 > 3 || Math.floor((day % 100) / 10) === 1) ? 0 : day % 10] || 'th');

    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} Hrs`;

    return `${month} ${dayWithSuffix}, ${year}, ${formattedTime}`;
}

export const getDataForLocalQuotation = (data: LocalQuotation) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'Package Type': data.package_type,
        'Time Limit': data.time_limit,
        'KMs Limit': data.km_limit,
        'End Date & Time': `${data.end_date_time} Hrs`,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'Cost Per Extra Hr': `₹${data.cost_extra_hr}`,
        'Cost Per Extra KM': `₹${data.cost_extra_km}`,
        'Total Approx Cost': `₹${data.total}`,
        'Pay 50% in Advance to confirm trip': `₹${data.advance}`,
    }
}


export const getDataForLocalBooking = (data: LocalBooking) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'Package Type': data.package_type,
        'Time Limit': data.time_limit,
        'KMs Limit': data.km_limit,
        'End Date & Time': `${data.end_date_time} Hrs`,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'Cost Per Extra Hr': `₹${data.cost_extra_hr}`,
        'Cost Per Extra KM': `₹${data.cost_extra_km}`,
        'Total Approx Cost': `₹${data.total}`,
        'Advance Received': `₹${data.advance}`,
        'Balance (Pay one day before trip)': `₹${data.balance}`,
    }
}


export const getDataForLocalBilling = (data: LocalBilling) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'Package Type': data.package_type,
        'Time Limit': data.time_limit,
        'KMs Limit': data.km_limit,
        'End Date & Time': `${data.end_date_time} Hrs`,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'Cost Per Extra Hr': `₹${data.cost_extra_hr}`,
        'Cost Per Extra KM': `₹${data.cost_extra_km}`,
        'Estimated Cost': `₹${data.estimated_cost}`,
        'Extra Time': `${data.extra_time}`,
        'Cost for Extra Hr': `₹${data.cost_extra_hr}`,
        'Extra KM': `${data.extra_km}`,
        'Cost for Extra KMs': `₹${data.cost_extra_km}`,
        'Toll / State Tax / Permit': `₹${data.toll}`,
        'Total Approx Cost': `₹${data.total}`,
        'Advance Received': `₹${data.advance}`,
        'Payment Balance': `₹${data.balance}`,
    }
}


// -------------------------------Outstation ----------------------------------


export const getDataForOutstationQuotation = (data: OutstationQuotation) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'End Date & Time': formatDate(data.end_date_time),
        'Number of Days': data.days,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'Cost Per KM': `₹${data.cost_per_km}`,
        'Minimun / Average KMs Billing Per Date': data.billing_per_day,
        'Driver Allowance Per Day': `₹${data.driver_allowance_per_day}`,
        'Total Minimun / Average KMs Billing': `₹${data.total_billing}`,
        'Total Driver Allowance': `₹${data.total_driver_allowance}`,
        'Approc Toll' : `₹${data.toll}`,
        'Approc State Tax / Permit' : `₹${data.state_tax}`,
        'Total Approx Cost': `₹${data.total}`,
        'Pay 10% in Advance to confirm trip': `₹${data.advance}`,
    }
}


export const getDataForOutstationBooking = (data: OutstationBooking) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'End Date & Time': formatDate(data.end_date_time),
        'Number of Days': data.days,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'Cost Per KM': `₹${data.cost_per_km}`,
        'Minimun / Average KMs Billing Per Date': data.billing_per_day,
        'Driver Allowance Per Day': `₹${data.driver_allowance_per_day}`,
        'Total Minimun / Average KMs Billing': `₹${data.total_billing}`,
        'Total Driver Allowance': `₹${data.total_driver_allowance}`,
        'Approc Toll' : `₹${data.toll}`,
        'Approc State Tax / Permit' : `₹${data.state_tax}`,
        'Total Approx Cost': `₹${data.total}`,
        'Advance Received': `₹${data.advance}`,
        'Approx Balance': `₹${data.balance}`,
        'Pay 50% advance one day before the trip date': `₹${data.balance/2}`,
    }
}


export const getDataForOutstationBilling = (data: OutstationBilling) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'End Date & Time': formatDate(data.end_date_time),
        'Number of Days': data.days,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'Cost Per KM': `₹${data.cost_per_km}`,
        'Minimun / Average KMs Billing Per Date': data.billing_per_day,
        'Driver Allowance Per Day': `₹${data.driver_allowance_per_day}`,
        'Total Minimun / Average KMs Billing': `₹${data.total_billing}`,
        'Extra KMs': `₹${data.extra_km}`,
        'Total KMs billing': `₹${data.total_km_billing}`,
        'Total Driver Allowance': `₹${data.total_driver_allowance}`,
        'Toll' : `₹${data.toll}`,
        'State Tax / Permit' : `₹${data.state_tax}`,
        'Total Cost': `₹${data.total}`,
        'Payment Received': `₹${data.advance}`,
        'Balance': `₹${data.balance}`,
    }
}



// ----------------------------Lumpsum ----------------------

export const getDataForLumpsumQuotation = (data: LumpsumQuotation) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'End Date & Time': formatDate(data.end_date_time),
        'Number of Days': data.days,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'KMs Limit': `₹${data.km_limit}`,
        'Cost Per Extra KM': data.cost_per_extra_km,
        'Cost Per Extra Hr': data.cost_per_extra_hr,
        'Total Approx Cost': `₹${data.total}`,
        'Pay 10% in Advance to confirm trip': `₹${data.total * 0.1}`,
    }
}


export const getDataForLumpsumBooking = (data: LumpsumBooking) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'End Date & Time': formatDate(data.end_date_time),
        'Number of Days': data.days,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'KMs Limit': `₹${data.km_limit}`,
        'Cost Per Extra KM': data.cost_per_extra_km,
        'Cost Per Extra Hr': data.cost_per_extra_hr,
        'Total Approx Cost': `₹${data.total}`,
        'Advance Received': `₹${data.advance}`,
        'Balance': `₹${data.balance}`,
        'Pay 50% one day before the trip date': `₹${data.balance * 0.5}`,
    }
}


export const getDataForLumpsumBilling = (data: LumpsumBilling) => {
    return {
        'Start Date & Time': formatDate(data.start_date_time),
        'End Date & Time': formatDate(data.end_date_time),
        'Number of Days': data.days,
        'Pick Up City': data.start_location,
        'Drop Off City': data.end_location,
        'Locations to visit': data.location_visit,
        'Passengers Capacity': data.passenger,
        'Vehicle': data.vehicle,
        'Carrier Required': data.carrier === 'true' ? 'Yes' : 'No',
        'Actual KMs': `₹${data.actual_km}`,
        'Cost For Extra KM': data.cost_extra_km,
        'Cost For Extra Hr': data.cost_extra_hr,
        'Total Cost': `₹${data.total}`,
        'Payment Received': `₹${data.advance}`,
        'Balance': `₹${data.balance}`,
    }
}