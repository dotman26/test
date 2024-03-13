import React, { useContext } from "react";

import { ContextApp } from "../../reducers/products.js";
import Pagination from "../Pagination/Pagination";
import ProductsFilter from "./ProductsFilter";

import 'bootstrap/dist/css/bootstrap.min.css';

const Products = ({
  title,
  pageLimit,
}) => {

  const { state } = useContext(ContextApp);
  
  return (
    <section className="products px-4 py-5 justify-content-center text-center" style={ {background: '#222'} }>
      <div className="container justify-content-center text-center">
        
        {title && 
          <div className="row w-100">
            <h2 style={ {color: 'white'} }>{ title }</h2>
          </div>
        }

        <div className="row w-100">
          <ProductsFilter />
        </div>

        <div className="row w-100 justify-content-center text-center">

          {state.items.length > 0 ? (
            <>
            {state.items.map(({ id, brand, price, product }) => (
              <div key={ id } className="py-3 mx-2 my-2" style={ {background: '#dbdbdb', width: '18%'} }>
                <div  className="card-body">
                  <h3 className="h5">{ product }</h3>
                  <div className="card-text">Brand: { brand || '-' }</div>
                  <div className="card-text">Id: { id }</div>
                  <div className="product-price">Price: { price }</div>
                </div>
              </div>
            ))}
            </>
            ) : state.isLoading ? (
              <div style={ {color: 'white'} }>Loading...</div>
            ) : (
              <div style={ {color: 'white'} }>No items</div>
            )
          }

        </div>
        <div className="row w-100">
          <Pagination pageLimit={ pageLimit } />
        </div>
      </div>
    </section>
  );
};

export default Products;
