// Test data สำหรับ Step 2 - Product Selection
export interface Product {
  name: string;
  price: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
}

// รายการสินค้า (ชื่อ + ราคาต่อหน่วยบนเว็บ)
export const products = {
  dior: { name: "Dior J'adore", price: 89.99 },
  gucci: { name: 'Gucci Bloom Eau de', price: 79.99 },
} satisfies Record<string, Product>;

// ออเดอร์ตามโจทย์: Dior 2 ชิ้น + Gucci 3 ชิ้น
export const assignmentOrder: OrderItem[] = [
  { name: products.dior.name, quantity: 2 },
  { name: products.gucci.name, quantity: 3 },
];

// ยอดรวมที่คาดหวัง = (89.99 x 2) + (79.99 x 3) = 419.95
export const expectedOrderTotal =
  products.dior.price * 2 + products.gucci.price * 3;
