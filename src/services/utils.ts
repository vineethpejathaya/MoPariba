import {RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET} from '@env';

export function GetInitialLetterOfString(str: string) {
  if (str) {
    const strArr = str.split(' ');
    if (strArr.length == 0) return '';
    const result = strArr?.map(item => item[0]).join('');
    return result;
  }

  return '';
}

export const createRazorpayOrder = async (
  total: number,
  showErrorToast: (title: string, message: string) => void,
): Promise<any> => {
  try {
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(
          `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`,
        )}`,
      },
      body: JSON.stringify({
        amount: total * 100,
        currency: 'INR',
        receipt: 'receipt#1',
        payment_capture: 1,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    showErrorToast(
      'Error in placing order',
      'Facing issue while placing your order please try after some time',
    );
  }
};
