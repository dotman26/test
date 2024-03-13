import React, { useEffect, useReducer } from "react";

import Products from "../Products/Products";

import { getProductIds, getProductItems, getFillteredIds } from "../../utils/api";
import { removeDuplicates } from "../../features/products";

import { initialState, productsReducer } from "../../reducers/products.js";

const Home = () => {
  const pageLimit = 50;
  const title = "Product list";

  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(() => {
    if (state.productIds.length > 0) return;

    dispatch({type: 'products/loading_start'});

    getProductIds()
      .then((res) => {
        if (res.data?.result) {
          dispatch({
            type: 'products/get_ids.success',
            payload: [...new Set(res.data.result)]
          });
        }
      });
  }, []);

  useEffect(() => {
    if (!state.filter.isActive) return;

    dispatch({type: 'products/loading_start'});

    getFillteredIds(state.filter.param, state.filter.value)
      .then((res) => {
        if (res.data?.result) {
          dispatch({
            type: 'products/get_filtered_ids.success',
            payload: [...new Set(res.data.result)]
          });
        }
      });
  }, [state.filter]);

  useEffect(() => {
    if ((state.productIds.length < 1 && !state.filter.isActive)
      || (state.filteredIds.length < 1 && state.filter.isActive)) {
        dispatch({
          type: 'products/get_items.success',
          payload: []
        });

        dispatch({type: 'products/loading_end'});

        return;
    }
      
    dispatch({type: 'products/loading_start'});

    const offsetStart = state.currentPage * pageLimit;
    const offsetEnd = offsetStart + pageLimit;

    const slicedIds = state.filter.isActive ? state.filteredIds.slice(offsetStart, offsetEnd) : state.productIds.slice(offsetStart, offsetEnd);

    getProductItems(slicedIds)
      .then((res) => {
        if (res.data?.result) {
          const items = removeDuplicates(res.data.result, 'id');

          dispatch({
            type: 'products/get_items.success',
            payload: items
          });

          dispatch({type: 'products/loading_end'});
        }
      })
      .catch((error) => {
        dispatch({type: 'products/loading_end'});
      });
  }, [state.productIds, state.filteredIds, state.currentPage, state.filter]);

  return (
    <>
      <Products
        dispatch={ dispatch }
        title={ title }
        state={ state }
        pageLimit={ pageLimit }
      />
    </>
  );
};

export default Home;
