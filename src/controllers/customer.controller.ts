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
      tenant_id: req.tenantId,
    },
  });
  res.status(201).json({ success: true, customer: newCustomer });
};

export const getAllCustomers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;
  const searchQuery = (req.query.search as string) || "";
  const sortBy = (req.query.sortBy as string) || "name";

  const [customers, total] = await Promise.all([
    prismaClient.customer.findMany({
      where: {
        tenant_id: req.tenantId,
        deleted: false,
        OR: [
          { name: { contains: searchQuery} },
          { email: { contains: searchQuery} },
          { phone_number: { contains: searchQuery} },
        ],
      },
      include: {
        address: true,
      },
      skip,
      take: limit,
      orderBy: {
        [sortBy]: "asc",
      },
    }),
    prismaClient.customer.count({
      where: {
        deleted: false,
        tenant_id: req.tenantId,
        OR: [
          { name: { contains: searchQuery } },
          { email: { contains: searchQuery} },
          { phone_number: { contains: searchQuery } },
        ],
      },
    }),
  ]);

  res.status(200).json({
    success: true,
    data: customers,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  });
};

export const getCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerId = req.params.id;
  const customer = await prismaClient.customer.findFirst({
    where: { id: customerId },
    include: {
      address: true,
    }
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
    prefix,
    name,
    email,
    phone_number,
    street,
    city,
    state,
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
      prefix,
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
    where: { phone_number: phoneNumber, tenant_id: req.tenantId },
  });

  if (!customer || customer.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Customer not found" });
  }
  res.status(200).json({ success: true, customer: customer });
};
