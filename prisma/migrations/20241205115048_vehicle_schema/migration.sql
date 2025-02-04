-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "chassis_no" TEXT NOT NULL,
    "engine_no" TEXT NOT NULL,
    "registration_no" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "transmission_type" TEXT NOT NULL,
    "fuel_type" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "asset_no" TEXT NOT NULL,
    "manufacturing_date" TIMESTAMP(3) NOT NULL,
    "insurance_validity" TIMESTAMP(3) NOT NULL,
    "puc_validity" TIMESTAMP(3) NOT NULL,
    "rc_validity" TIMESTAMP(3) NOT NULL,
    "fitness_validity" TIMESTAMP(3) NOT NULL,
    "last_battery_change" TIMESTAMP(3),
    "insurance_url" TEXT,
    "puc_url" TEXT,
    "rc_url" TEXT,
    "fitness_url" TEXT,
    "last_service" TIMESTAMP(3),
    "last_service_kms" DOUBLE PRECISION NOT NULL,
    "next_service_due_kms" DOUBLE PRECISION NOT NULL,
    "next_service_due" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_chassis_no_key" ON "Vehicle"("chassis_no");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_engine_no_key" ON "Vehicle"("engine_no");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_registration_no_key" ON "Vehicle"("registration_no");
