import React, { useEffect, useState } from "react";

import Products from "../Products/Products";

import { getProductIds, getProductItems, getFillteredIds } from "../../utils/api";
import { removeDuplicates } from "../../features/products";

const Home = () => {
  const pageLimit = 50;
  const title = "Product list";

  const [currentPage, setCurrentPage] = useState(0);
  const [productIds, setProductIds] = useState([]);
  const [filteredIds, setFilteredIds] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filterInitialState = {
    isActive: false,
    param: 'price',
    value: ''
  }

  const [productFilter, setProductFilter] = useState(filterInitialState);

  useEffect(() => {
    if (productIds.length > 0) return;

    setIsLoading(true);
    getProductIds()
      .then((res) => {
        if (res.data?.result) {
          setProductIds([...new Set(res.data.result)])
        }
      });
  }, []);

  useEffect(() => {
    if (!productFilter.isActive) return;
    
    setIsLoading(true);

    getFillteredIds(productFilter.param, productFilter.value)
      .then((res) => {
        if (res.data?.result) {
          setFilteredIds([...new Set(res.data.result)])
        }
      });
  }, [productFilter]);

  useEffect(() => {
    if ((productIds.length < 1 && !productFilter.isActive)
      || (filteredIds.length < 1 && productFilter.isActive)) {
        setProductItems([]);
        setIsLoading(false);
        return;
    }
      
    setIsLoading(true);

    let offsetStart = currentPage * pageLimit;
    let offsetEnd = offsetStart + pageLimit;

    let slicedIds = productFilter.isActive ? filteredIds.slice(offsetStart, offsetEnd) : productIds.slice(offsetStart, offsetEnd);

    getProductItems(slicedIds)
      .then((res) => {
        if (res.data?.result) {
          let items = removeDuplicates(res.data.result, 'id');
          setProductItems(items);
          setIsLoading(false);
        }
      });
  }, [productIds, filteredIds, currentPage, productFilter]);

  return (
    <>
      <Products
        items={ productItems }
        title={ title }
        isLoading={ isLoading }
        currentPage={ currentPage }
        setCurrentPage={ setCurrentPage }
        productFilter={ productFilter }
        setProductFilter={ setProductFilter }
        setFilteredIds={ setFilteredIds }
        offset={ currentPage * pageLimit + pageLimit }
        idsLength={ productFilter.isActive ? filteredIds.length : productIds.length }
      />
    </>
  );
};

export default Home;
