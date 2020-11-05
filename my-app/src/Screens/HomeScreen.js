import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchAction } from "../Actions/searchAction";
import Rating from "../Component/Rating";

function HomeScreen(props) {

  const dispatch = useDispatch();
  const { productSearch } = useSelector((state) => state.search);
  const [numPage,setNumPage]=useState(1);
  let maxPage;
  if(productSearch){
    console.log(productSearch);
    console.log(productSearch.length);
    maxPage=(Math.round(productSearch.length/24+numPage-1));
    if(maxPage<1) maxPage=1;
  }

  const nextPageHandler=(e)=>{
    e.preventDefault();
    setNumPage(maxPage);
  }

  const backPageHandler=(e)=>{
    e.preventDefault();
    for(let i=4;i>=0;i--){
      if(numPage-i>=1){
        setNumPage(numPage-i);
        break;
      }
    }
  }

  useEffect(() => {
    dispatch(searchAction('',24*(numPage-1),120));
    return () => {};
  }, [numPage]);
  


  return productSearch?<div className="content">
  <ul className="products">
    {productSearch.map((product,indexProduct) => {
      if(indexProduct>=0&&indexProduct<24){
        return <li key={product._id}>
        <div className="product">
          <Link to={"/product/" + product._id}>
            <img
              className="product-image"
              src={product.image}
              alt="product"
            />
          </Link>
          <div className="product-name">{product.name}</div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-price">{product.price}đ</div>
          <div className="product-rating">
            <Rating
              value={product.rating}
              text={product.reviews.length + " reviews"}
            />
          </div>
        </div>
      </li>
      }
    }
    )}
  </ul>

  {maxPage-numPage<=4?<div className="list-page-container">
    <div  className="back-page" onClick={e=>backPageHandler(e)}><img/></div>
    <div className="detail-list-page current-page" onClick={()=>setNumPage(numPage)}><p>{numPage}</p></div>
    {maxPage-numPage>0?[...Array(maxPage-numPage).keys()].map(x=><div className="detail-list-page" onClick={()=>setNumPage(numPage+x+1)}><p>{numPage+x+1}</p></div>):""}
    <div  className="next-page" onClick={e=>nextPageHandler(e)}><img/></div>
  </div>:""}
  {maxPage-numPage>4?<div class="list-page-container">
    <div  className="back-page" onClick={e=>backPageHandler(e)}><img/></div>
    <div className="detail-list-page current-page" onClick={()=>setNumPage(numPage)}><p>{numPage}</p></div>
    {maxPage-numPage>0?[...Array(4).keys()].map(x=><div className="detail-list-page" onClick={()=>setNumPage(numPage+x+1)}><p>{numPage+x+1}</p></div>):""}
    <div  className="next-page" onClick={e=>nextPageHandler(e)}><img/></div>
  </div>:""}
</div>:""
 
}

export default HomeScreen;
