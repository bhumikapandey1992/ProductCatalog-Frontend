import { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import './App.css';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
  fetch('http://18.117.73.165/api/products/')
    .then(res => res.json())
    .then(data => setProducts(data))
    .catch(err => console.error('Failed to fetch products:', err));
}, []);

  // Handler to add a new product (local state only for now)
  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
  const res = await fetch('http://18.117.73.165/api/products/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });

  if (res.ok) {
    const newProduct = await res.json();
    setProducts(prev => [...prev, newProduct]);
  } else {
    console.error('Failed to add product');
  }
};


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mini Product Catalog</h1>
      
      {/* Product submission form */}
      <ProductForm onAdd={handleAddProduct} />

      {/* List of products */}
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <h3>{p.name} - ${p.price}</h3>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;