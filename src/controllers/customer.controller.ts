import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    prefix,
    name,
    email,
    phone_number,
    street,
    city,
    state,
    postal_code,
  } = req.body;
  const address = await prismaClient.address.create({
    data: {
      street,
      city,
      state,
      postal_code,
    },
  });
  const newCustomer = await prismaClient.customer.create({
    data: {
      prefix,
      name,
      email,
      phone_number,
      address_id: address.id,
    },
  });
  res.status(201).json({ success: true, customer: newCustomer });
};

export const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customers = await prismaClient.customer.findMany({
    where: {
      deleted: false,
    },
    include: {
      address: true,
    },
  });
  res.status(200).json({ success: true, customers: customers });
};

export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerId = req.params.id;
  const customer = await prismaClient.customer.findFirst({
    where: { id: customerId },
  });

  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }
  if (customer.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Customer has been deleted" });
  }
  res.status(200).json({ success: true, customer: customer });
};

export const updateCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerId = req.params.id;
  const {
    name,
    email,
    phone_number,
    street,
    city,
    state,
    country,
    postal_code,
  } = req.body;
  const customer = await prismaClient.customer.findFirst({
    where: { id: customerId },
    include: {
      address: true,
    },
  });
  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }
  if (customer.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Customer has been deleted" });
  }
  await prismaClient.address.update({
    where: {
      id: customer.address_id!,
    },
    data: {
      street,
      city,
      state,
      postal_code,
    },
  });
  const updatedCustomer = await prismaClient.customer.update({
    where: { id: customerId },
    data: {
      name,
      email,
      phone_number,
    },
  });
  res.status(200).json({ success: true, customer: updatedCustomer });
};

export const deleteCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerId = req.params.id;
  const customer = await prismaClient.customer.findFirst({
    where: { id: customerId },
  });
  if (!customer) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found" });
  }
  if (customer.deleted) {
    return res
      .status(200)
      .json({ success: false, message: "Expense has been already deleted" });
  }
  await prismaClient.customer.update({
    where: { id: customerId },
    data: { deleted: true },
  });
  res.status(200).json({ success: true, customer: customer });
};

export const findCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const phoneNumber = req.params.phone;
  const customer = await prismaClient.customer.findFirst({
    where: { phone_number: phoneNumber },
  });

  if (!customer || customer.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }
  res.status(200).json({ success: true, customer: customer });
};
