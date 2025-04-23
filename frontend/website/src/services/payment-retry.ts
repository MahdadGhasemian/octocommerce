import basicService, { Payment } from '@/services/basic.service';

export const retryCreatePayment = async (
  paymentData: Partial<Payment>,
  retries = 3,
  delay = 1000
) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const payment = await basicService.createPayment(paymentData);
      return payment;
    } catch (error) {
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
};
