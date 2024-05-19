import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ProductFormModal = ({ isOpen, onRequestClose, onSubmit, product }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setDescription(product.description);
      setPrice(product.price);
      setImgUrl(product.imgUrl);
    } else {
      setProductName('');
      setDescription('');
      setPrice('');
      setImgUrl('');
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productName,
      description,
      price,
      imgUrl,
    };
    onSubmit(productData);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
      <h2>{product ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
          required
        />
        <button type="submit">{product ? 'Update Product' : 'Add Product'}</button>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
