import React, { useState } from 'react';

interface ProductFormProps {
  onAdd: (product: { name: string; price: number; description: string }) => void;
}

export default function ProductForm({ onAdd }: ProductFormProps) {
  const [form, setForm] = useState({ name: '', price: 0, description: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: '', price: 0, description: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input
        placeholder="Product Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
      />
      <input
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button type="submit">Add Product</button>
    </form>
  );
}