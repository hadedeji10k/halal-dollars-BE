import { getMonth, startOfMonth, subMonths } from "date-fns";

export const dateInterval = (date: string | Date) => {
  date = new Date(date);
  const thisMonth = getMonth(date);
  const lastMonth = subMonths(date, 1);
  const startOfThisMonth = startOfMonth(date);
  const startOfLastMonth = startOfMonth(lastMonth);

  return {
    thisMonth,
    lastMonth,
    startOfThisMonth,
    startOfLastMonth,
  };
};
