export const getNextTwoWeeksDates = (): { startDate: Date; endDate: Date } => {
  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  const startDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0,
  );
  const endDate = new Date(
    twoWeeksLater.getFullYear(),
    twoWeeksLater.getMonth(),
    twoWeeksLater.getDate(),
    23,
    59,
    59,
  );

  return { startDate, endDate };
};
