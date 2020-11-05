import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProductAction } from "../Actions/saveProductAction";
import { searchAction } from "../Actions/searchAction";
import { deleteProductAction } from "../Actions/deleteProductAction";

function ProductsScreen(props) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [count, setCount] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const data = useSelector((state) => state.productSave);
  const { productSearch } = useSelector((state) => state.search);

  const { saveSuccess } = data;
  const { deleteSuccess } = useSelector((state) => state.deleteProduct);

  const dispatch = useDispatch();

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo.isAdmin) {
      dispatch(
        saveProductAction({ id, name, brand, price, image, rating, count })
      );
    } else {
      alert("You are not Admin!");
    }
    setOpenModal(false);
  };

  const handleEdit = (product) => {
    setOpenModal(true);
    setId(product._id);
    setName(product.name);
    setBrand(product.brand);
    setPrice(product.price);
    setImage(product.image);
    setRating(product.rating);
    setCount(product.count);
  };

  const handleDelete = (e, _id) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo.isAdmin) {
      dispatch(deleteProductAction(_id));
    } else {
      alert("You are not Admin!");
    }
  };

  useEffect(() => {
    dispatch(searchAction('',0,800));
    return () => {};
  }, [deleteSuccess, saveSuccess]);

  
   

  return (
    <div>
      <div className="update-product">
        <div className="product-header">
          <h3>Products</h3>
          <button onClick={() => setOpenModal(true)}>Create product</button>
        </div>
        {openModal === false ? (
          <div className="product-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Rating</th>
                  <th>Count</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {productSearch ? (
                  productSearch.map((product) => (
                    <tr key={product.name}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.price}</td>
                      <td>{product.image}</td>
                      <td>{product.rating}</td>
                      <td>{product.count}</td>
                      <td className="btn-edit-delete">
                        <button onClick={() => handleEdit(product)}>
                          Edit
                        </button>
                        <button onClick={(e) => handleDelete(e, product._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td>loading...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          ""
        )}
      </div>
      {openModal ? (
        <div className="form">
          <form>
            {/* {saveSuccess?<div className="sign-in-success"><p>SAVE NEW PRODUCT SUCCESS!</p></div>:""}
        {deleteSuccess?<div className="sign-in-success"><p>DELETE PRODUCT SUCCESS!</p></div>:""} */}
            <div className="form-container">
              <li>
                <h3>Create Product</h3>
              </li>
              <li>
                <label>Name:</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                ></input>
              </li>
              <li>
                <label>Brand:</label>
                <input
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                ></input>
              </li>
              <li>
                <label>Price:</label>
                <input
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                ></input>
              </li>
              <li>
                <label>Image:</label>
                <input
                  value={image}
                  onChange={(event) => setImage(event.target.value)}
                ></input>
              </li>
              <li>
                <label>Rating:</label>
                <input
                  value={rating}
                  onChange={(event) => setRating(event.target.value)}
                ></input>
              </li>
              <li>
                <label>Count:</label>
                <input
                  value={count}
                  onChange={(event) => setCount(event.target.value)}
                ></input>
              </li>
              <button className="sign-in-btn" onClick={handleSaveProduct}>
                Create New Product
              </button>
              <button
                className="create-account-btn"
                onClick={() => setOpenModal(false)}
              >
                BACK
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ProductsScreen;
