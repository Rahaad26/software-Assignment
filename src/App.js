import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductFormModal from './ProductFormModal';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setModalIsOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setModalIsOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (product) => {
    try {
      if (currentProduct) {
        await axios.put(`http://localhost:5000/api/products/${currentProduct.id}`, product);
      } else {
        await axios.post('http://localhost:5000/api/products', product);
      }
      setModalIsOpen(false);
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <button onClick={handleAddProduct}>Add Product</button>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
      <ProductFormModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        onSubmit={handleSubmit}
        product={currentProduct}
      />
    </div>
  );
};

export default App;
