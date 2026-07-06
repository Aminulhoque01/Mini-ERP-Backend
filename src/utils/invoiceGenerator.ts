const pad = (num: number) => {
  return num.toString().padStart(5, "0");
};

export const generateInvoiceNumber = async (
  count: number
) => {
  const today = new Date();

  const date =
    today.getFullYear().toString() +
    (today.getMonth() + 1)
      .toString()
      .padStart(2, "0") +
    today
      .getDate()
      .toString()
      .padStart(2, "0");

  return `INV-${date}-${pad(count + 1)}`;
};