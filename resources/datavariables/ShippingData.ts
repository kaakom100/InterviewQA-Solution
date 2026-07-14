import { ShippingDetails } from '../../support/world';

// Test data สำหรับ Step 3-4 - Checkout & Confirmation
export const validShipping: ShippingDetails = {
  phone: '0812345678',
  street: '5876 Little Streets',
  city: 'London',
  country: 'Australia',
};

// format ที่อยู่ที่คาดหวัง: "Street, City - Country"
export const expectedAddress =
  `${validShipping.street}, ${validShipping.city} - ${validShipping.country}`;
