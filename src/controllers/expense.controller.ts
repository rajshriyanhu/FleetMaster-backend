import { NextFunction, Request, Response } from "express";
import prismaClient from "../db/db.config";

export const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newExpense = await prismaClient.expense.create({
    data: {...req.body, tenant_id: req.tenantId},
  });
  res.status(201).json({ success: true, expense: newExpense });
};

export const getAllExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vehicleId = req.params.id;
  const expenses = await prismaClient.expense.findMany({
    where: {
        vehicle_id: vehicleId,
        tenant_id: req.tenantId,
        deleted: false,
    },
  });
  res.status(200).json({ success: true, expenses: expenses });
};

export const getExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expenseId = req.params.id;
  const expense = await prismaClient.expense.findFirst({
    where: { id: expenseId },
  });

  if (!expense) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found" });
  }
  if (expense.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Expense has been deleted" });
  }
  res.status(200).json({ success: true, expense: expense });
};

export const updateExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expenseId = req.params.id;
  const expense = await prismaClient.expense.findFirst({
    where: { id: expenseId },
  });

  if (!expense) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found" });
  }
  if (expense.deleted) {
    return res
      .status(404)
      .json({ success: false, message: "Expense has been deleted" });
  }
  const updatedExpense = await prismaClient.expense.update({
    where: { id: expenseId },
    data: req.body,
  });

  res.status(200).json({ success: true, expense: updatedExpense });
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const expenseId = req.params.id;
  const expense = await prismaClient.expense.findFirst({
    where: { id: expenseId },
  });

  if (!expense) {
    return res
      .status(404)
      .json({ success: false, message: "Expense not found" });
  }
  if (expense.deleted) {
    return res
      .status(200)
      .json({ success: false, message: "Expense has been already deleted" });
  }
  await prismaClient.expense.update({
    where: { id: expenseId },
    data: { deleted: true },
  });
  res.status(200).json({ success: true, expense: expense });
};

