export type Customer = {
  id: number;
  name: string;
  email: string;
  company: string;
  city: string;
  joined: string;
  orders: number;
  spent: number;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
};

export type Order = {
  id: string;
  customerId: number;
  productId: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Pending' | 'Cancelled';
  quantity: number;
  total: number;
};

const names = [
  'Olivia Bennett', 'Noah Williams', 'Emma Carter', 'Liam Mitchell',
  'Ava Thompson', 'Ethan Parker', 'Sophia Turner', 'Lucas Cooper',
  'Isabella Reed', 'Mason Bailey', 'Mia Collins', 'Logan Brooks',
  'Amelia Kelly', 'James Howard', 'Harper Ward', 'Benjamin Cox',
  'Evelyn Diaz', 'Elijah Gray', 'Abigail James', 'Henry Price',
  'Ella Morris', 'Alexander Ross', 'Scarlett Evans', 'Michael Bell',
  'Grace Murphy', 'Daniel Cook', 'Chloe Rivera', 'Matthew Wood',
  'Lily Watson', 'Jackson Lee', 'Aria Hall', 'Sebastian Young',
  'Nora King', 'Jack Wright', 'Zoey Scott', 'Owen Green',
  'Hannah Adams', 'Samuel Baker', 'Layla Nelson', 'David Hill',
  'Violet Ramirez', 'Joseph Campbell', 'Aurora Mitchell',
  'John Roberts', 'Penelope Phillips', 'Wyatt Parker',
  'Stella Turner', 'Luke Edwards', 'Lucy Stewart', 'Julian Morris',
  'Paisley Rogers', 'Levi Morgan', 'Naomi Peterson',
  'Isaac Foster', 'Elena Simmons'
];

const companies = [
  'Northstar Labs', 'Vertex Studio', 'Bluebird Commerce',
  'Aster & Co.', 'Monument Digital', 'Everwell Group',
  'Lumen Works', 'Atlas Supply', 'Cedar Systems', 'Nova Retail'
];

export const customers: Customer[] = names.map((name, i) => ({
  id: i + 1,
  name,
  email: name.toLowerCase().replace(' ', '.') + '@example.com',
  company: companies[i % companies.length],
  city: ['New York', 'London', 'Berlin', 'Toronto', 'Amsterdam', 'Austin'][i % 6],
  joined: `2025-${String(i % 12 + 1).padStart(2, '0')}-${String(i % 27 + 1).padStart(2, '0')}`,
  orders: 0,
  spent: 0
}));

export const products: Product[] = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name: ['Studio Headphones', 'Everyday Backpack', 'Smart Desk Lamp', 'Minimal Watch', 'Cloud Notebook', 'Wireless Mouse', 'Ceramic Bottle', 'Travel Organizer', 'Desk Mat', 'Portable Speaker', 'Linen Tote', 'USB-C Hub'][i % 12] + (i >= 12 ? ` ${Math.floor(i / 12) + 1}` : ''),
  category: ['Electronics', 'Accessories', 'Office', 'Lifestyle'][i % 4],
  price: [129, 89, 74, 159, 18, 42, 32, 36, 28, 99, 24, 65][i % 12],
  stock: Math.max(4, 120 - i * 3),
  sold: 18 + (i * 17) % 96
}));

const statuses = ['Completed', 'Processing', 'Pending', 'Cancelled'] as const;

export const orders: Order[] = Array.from({ length: 150 }, (_, i) => {
  const customerId = (i * 13 + 7) % customers.length + 1;
  const productId = (i * 7 + 3) % products.length + 1;
  const quantity = i % 4 + 1;
  const product = products[productId - 1];
  const date = new Date(2025, i % 12, (i * 5) % 27 + 1);

  return {
    id: `BA-${String(2400 + i).padStart(5, '0')}`,
    customerId,
    productId,
    date: date.toISOString().slice(0, 10),
    status: statuses[i % 13 === 0 ? 3 : i % 4],
    quantity,
    total: quantity * product.price
  };
});

orders.forEach(o => {
  const c = customers[o.customerId - 1];
  c.orders++;
  if (o.status !== 'Cancelled') c.spent += o.total;
});

export const money = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(n);
