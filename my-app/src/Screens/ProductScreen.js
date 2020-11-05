import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDetailProduct } from "../Actions/productListAction";
import { cartAction } from "../Actions/cartAction";
import { saveReviewAction } from "../Actions/saveProductAction";

import Rating from "../Component/Rating";

function ProductScreen(props) {
  const productDetail = useSelector((state) => state.productDetail);
  const [comment, setComment] = useState();
  const [tableRating, setTableRating] = useState(false);
  const { successSaveReview } = useSelector((state) => state.saveReview);
  const { product, loading, error } = productDetail;
  const [rating, setRating] = useState();
  const [qty, setQty] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.signin);

  const dispatch = useDispatch();
  const handleAddToCart = async (e) => {
    e.preventDefault();
    const item = {
      id: props.match.params.id,
      qty: qty,
    };
    await dispatch(cartAction(item.id, item.qty));
    props.history.push("/cart");
  };

  const submitRatingHandler = (e) => {
    e.preventDefault();
    if (rating) {
      setTableRating(false);
      const name = userInfo.name;
      const _id = props.match.params.id;
      dispatch(saveReviewAction({ comment, rating, name, _id }));
      setComment("");
      alert("Write comment successful");
    }
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (!userInfo) props.history.push("/signin");
    else {
      setTableRating(true);
    }
  };
  useEffect(() => {
    dispatch(getDetailProduct(props.match.params.id));
    return () => {};
  }, [successSaveReview,props.match.params.id]);

  return (
    <div>
      {tableRating === true ? (
        <div className="table-rating">
          <div className="content-rating">
            <div>
              <input
                type="radio"
                name="rating"
                value="1"
                onChange={(e) => setRating(e.target.value)}
              />
              <label>Quá tệ</label>
            </div>
            <div>
              <input
                type="radio"
                name="rating"
                value="2"
                onChange={(e) => setRating(e.target.value)}
              />
              <label>Không Hài Lòng</label>
            </div>
            <div>
              <input
                type="radio"
                name="rating"
                value="3"
                onChange={(e) => setRating(e.target.value)}
              />
              <label>Tạm chấp nhận</label>
            </div>
            <div>
              <input
                type="radio"
                name="rating"
                value="4"
                onChange={(e) => setRating(e.target.value)}
              />
              <label>Ổn</label>
            </div>
            <div>
              <input
                type="radio"
                name="rating"
                value="5"
                onChange={(e) => setRating(e.target.value)}
              />
              <label>Tuyệt vời</label>
            </div>
            <button
              className="btn-submit-rating"
              onClick={(e) => submitRatingHandler(e)}
            >
              Submit Rating
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div id="product">
          <div className="back-to-result">
            <Link to="/">Back To Result</Link>
          </div>
          <div className="detail">
            <div className="detail-image">
              <img src={product.image} alt="product" />
            </div>
            <div className="detail-info">
              <div className="product-name">{product.name}</div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-rating">
                <Rating
                  value={product.rating}
                  text={product.reviews.length + " reviews"}
                />
              </div>
            </div>
            <div className="detail-action">
              <div className="product-price">Price:{product.price}đ</div>
              <div className="product-status">
                Status:{product.count > 0 ? "In Stock" : "Unavailable"}
              </div>
              <div className="quantity">
                Quantity:
                <select
                  value={qty}
                  onChange={(event) => setQty(event.target.value)}
                >
                  {[...Array(parseInt(product.count)).keys()].map((x) => (
                    <option key={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
              <div className="button">
                {product.count > 0 ? (
                  <button onClick={(e) => handleAddToCart(e)}>
                    ADD TO CART
                  </button>
                ) : (
                  "NOOOOOOOOOOO"
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <ul className="user-comment">
        {product
          ? product.reviews.map((item, index) => (
              <li key={index}>
                <div className="user">
                  <img />
                  <div>{item.user}</div>
                  <div id="user-rating">
                    <Rating value={item.rating} />
                  </div>
                </div>
                <div className="comment">{item.comment}</div>
                <div className="time">{item.time}</div>
              </li>
            ))
          : ""}
      </ul>
      {successSaveReview === true ? successSaveReview === false : ""}
      {
        <div className="write-comment">
          <textarea
            className="text-area-comment"
            value={comment}
            placeholder="Write Comment"
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="btn-submit-comment"
            onClick={(e) => handleComment(e)}
          >
            Submit Comment
          </button>
        </div>
      }
    </div>
  );
}

export default ProductScreen;
