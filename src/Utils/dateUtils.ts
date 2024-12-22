export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

export const getMonthName = (month: number): string => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
};

export const getYearRange = (startYear: number, endYear: number): number[] => {
  const years: number[] = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};
