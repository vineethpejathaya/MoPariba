export const debounce = (func: any, delay: any) => {
  let timeoutId: any;
  return (...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
