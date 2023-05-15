import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [deleteProduct, setDeleteProduct] = useState(null);

  useEffect(() => {
    axios
      .get("https://rfcd65-4000.csb.app/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteProduct]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct(product);
    setEditFormVisible(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    axios
      .put(
        `https://rfcd65-4000.csb.app/products/${selectedProduct.id}`,
        updatedProduct
      )
      .then((response) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? updatedProduct : product
          )
        );
        setSelectedProduct(null);
        setUpdatedProduct({});
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteClick = (product) => {
    axios
      .delete(`https://rfcd65-4000.csb.app/products/${product.id}`)
      .then((response) => {
        setDeleteProduct(product.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => handleEditClick(product)}>Edit</button>
                <button onClick={() => handleDeleteClick(product)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editFormVisible && (
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={updatedProduct.quantity}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
}

export default Products;
