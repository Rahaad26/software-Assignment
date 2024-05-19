import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.productName}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;
