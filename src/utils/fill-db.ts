import prismaClient from "../db/db.config";

export async function initializeAdminUser() {
  try {
    const adminEmail = "admin@gmail.com";
    const adminPassword = "password";

    const existingAdmin = await prismaClient.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!existingAdmin) {
      console.log("No admin user found. Creating default admin...");

      await prismaClient.user.create({
        data: {
          name: "admin",
          email: adminEmail,
          password: adminPassword,
          role: "ADMIN", // Admin role
          permissions: {
            vehicle: { read: true, write: true },
            trip: { read: true, write: true },
            customer: { read: true, write: true },
            driver: { read: true, write: true },
          },
        },
      });

      console.log(`Admin user created with email: ${adminEmail}`);
    } else {
      console.log("Admin user already exists. Skipping initialization.");
    }
  } catch (error) {
    console.error("Error during admin initialization:", error);
  }
}

function getRandomDateWithinMonth() {
  const today = new Date();
  const end = new Date();
  end.setMonth(end.getMonth() + 1);
  return new Date(
    today.getTime() + Math.random() * (end.getTime() - today.getTime())
  );
}

export async function addInitialVehicles() {
  try {
    const vehicles = [
      {
        asset_no: 101,
        region: "North",
        state: "Delhi",
        city: "New Delhi",
        registration_no: "DL01AB1234",
        make: "Toyota",
        model: "Ertiga",
        variant: "ZX",
        transmission_type: "MT",
        fuel_type: "diesel",
        capacity: 7,
        km_run: 50000,
        color: "White",
        chassis_no: "CHS101DL",
        engine_no: "ENG101DL",
        manufacturing_date: getRandomDateWithinMonth(),
        registration_date: getRandomDateWithinMonth(),
        rc_url: "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
        insurance_validity: getRandomDateWithinMonth(),
        insurance_url:
          "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
        puc_validity: getRandomDateWithinMonth(),
        puc_url: "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
        fitness_validity: getRandomDateWithinMonth(),
        fitness_url:
          "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
        last_battery_change: getRandomDateWithinMonth(),
        last_service: getRandomDateWithinMonth(),
        last_service_kms: 48000,
        next_service_due: getRandomDateWithinMonth(),
        next_service_due_kms: 55000,
        gps_renewal_due: getRandomDateWithinMonth(),
      },
      {
        asset_no: 102,
        region: "West",
        state: "Maharashtra",
        city: "Mumbai",
        registration_no: "MH01XY5678",
        make: "Honda",
        model: "Dzire",
        variant: "VX",
        transmission_type: "MT",
        fuel_type: "Petrol",
        capacity: 5,
        km_run: 30000,
        color: "Black",
        chassis_no: "CHS102MH",
        engine_no: "ENG102MH",
        manufacturing_date: getRandomDateWithinMonth(),
        registration_date: getRandomDateWithinMonth(),
        rc_url: "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
        insurance_validity: getRandomDateWithinMonth(),
        insurance_url:
          "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
        puc_validity: getRandomDateWithinMonth(),
        puc_url: "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
        fitness_validity: getRandomDateWithinMonth(),
        fitness_url:
          "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
        last_battery_change: getRandomDateWithinMonth(),
        last_service: getRandomDateWithinMonth(),
        last_service_kms: 29000,
        next_service_due: getRandomDateWithinMonth(),
        next_service_due_kms: 35000,
        gps_renewal_due: getRandomDateWithinMonth(),
      },
    ];

    for (const vehicle of vehicles) {
      const existingVehicle = await prismaClient.vehicle.findUnique({
        where: { registration_no: vehicle.registration_no },
      });

      if (!existingVehicle) {
        await prismaClient.vehicle.create({ data: vehicle });
        console.log(`Vehicle ${vehicle.registration_no} added.`);
      } else {
        console.log(`Vehicle ${vehicle.registration_no} already exists.`);
      }
    }
  } catch (error) {
    console.error("Error adding vehicles:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

export async function addCustomerAndDriver() {
  try {
    const addresses = await Promise.all([
      (async () => {
        const existingAddress = await prismaClient.address.findFirst({
          where: { postal_code: 110001 },
        });
        return (
          existingAddress ||
          prismaClient.address.create({
            data: {
              street: "123 Main St",
              city: "Delhi",
              state: "Delhi",
              postal_code: 110001,
            },
          })
        );
      })(),
      (async () => {
        const existingAddress = await prismaClient.address.findFirst({
          where: { postal_code: 400001 },
        });
        return (
          existingAddress ||
          prismaClient.address.create({
            data: {
              street: "456 Park Ave",
              city: "Mumbai",
              state: "Maharashtra",
              postal_code: 400001,
            },
          })
        );
      })(),
    ]);

    const customers = [
      {
        prefix: "Mr.",
        name: "John Doe",
        email: "johndoe@example.com",
        phone_number: "9876543210",
        address_id: addresses[0].id,
      },
      {
        prefix: "Ms.",
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone_number: "8765432109",
        address_id: addresses[1].id,
      },
    ];

    for (const customer of customers) {
      const existingUser = await prismaClient.customer.findFirst({
        where: { email: customer.email },
      });
      if (!existingUser) {
        await prismaClient.customer.create({
          data: customer,
        });
      }
    }

    const drivers = [
      {
        name: "David Mishra",
        email: "davidmishra@example.com",
        phone_number: "9988776655",
        alt_phone_number: "9876543210",
        emg_name: "Amit Kumar",
        emg_relation: "Brother",
        emg_phone_number: "9876501234",
        insurance_valid_upto: getRandomDateWithinMonth(),
        joining_date: getRandomDateWithinMonth(),
        employment_status: "Active",
        address_id: addresses[0].id,
        dl_number: "DL123456789",
        experience: 5,
        expertise: "SUVs, Sedans",
        working_region: "North",
        working_state: "Delhi",
        working_city: "New Delhi",
        document_url:
          "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
      },
      {
        name: "Aman Verma",
        email: "amanverma@example.com",
        phone_number: "8877665544",
        alt_phone_number: "9876504321",
        emg_name: "Vikas Verma",
        emg_relation: "Father",
        emg_phone_number: "9988776655",
        insurance_valid_upto: getRandomDateWithinMonth(),
        joining_date: getRandomDateWithinMonth(),
        employment_status: "Active",
        address_id: addresses[1].id,
        dl_number: "MH987654321",
        experience: 8,
        expertise: "Trucks, Buses",
        working_region: "West",
        working_state: "Maharashtra",
        working_city: "Mumbai",
        document_url:
          "14dda106-0108-46e7-9cf1-b86e58c4f484_Abhishek_resume_2.pdf",
      },
    ];

    for (const driver of drivers) {
      const existingDriver = await prismaClient.driver.findFirst({
        where: { email: driver.email },
      });
      if (!existingDriver) {
        await prismaClient.driver.create({ data: driver });
      }
    }

    console.log("Initial customers and drivers added successfully.");
  } catch (error) {
    console.error("Error adding initial data:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

export async function addTrips() {
  try {
    const drivers = await prismaClient.driver.findMany();
    const customers = await prismaClient.customer.findMany();
    const vehicles = await prismaClient.vehicle.findMany();
    const trips = [
      {
        trip_type: "Outstation",
        vehicle_id: vehicles[0].id,
        driver_id: drivers[0].id,
        customer_id: customers[0].id,
        start_date: getRandomDateWithinMonth(),
        end_date: getRandomDateWithinMonth(),
        days: 5,
        start_location: "New Delhi",
        end_location: "Jaipur",
        location_visited: "Agra, Udaipur",
        start_km: 10000,
        end_km: 10500,
        total_km: 500,
        total_fuel_cost: 5000,
        average_fuel_cost: 10,
        vehicle_average: 15,
        state_tax: 500,
        toll_tax: 300,
        permit: 200,
        maintainance: 1000,
        profit: 3000,
      },
      {
        trip_type: "Local",
        vehicle_id: vehicles[1].id,
        driver_id: drivers[1].id,
        customer_id: customers[1].id,
        start_date: getRandomDateWithinMonth(),
        end_date: getRandomDateWithinMonth(),
        days: 3,
        start_location: "Mumbai",
        end_location: "Pune",
        location_visited: "Lonavala, Khandala",
        start_km: 20000,
        end_km: 20250,
        total_km: 250,
        total_fuel_cost: 2500,
        average_fuel_cost: 10,
        vehicle_average: 14,
        state_tax: 400,
        toll_tax: 200,
        permit: 150,
        maintainance: 800,
        profit: 2000,
      },
    ];

    for (const trip of trips) {
      const existingTrip = await prismaClient.trip.findFirst({
        where: { trip_type: trip.trip_type },
      });
      if (!existingTrip) {
        await prismaClient.trip.create({ data: trip });
      }
    }
    console.log("Initial trips added successfully.");
  } catch (error) {
    console.error("Error adding trips:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}
