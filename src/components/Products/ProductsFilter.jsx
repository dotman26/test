import React, { useState } from "react";
import Select from "react-select";

const ProductsFilter = ({ productFilter, setProductFilter, currentPage, setCurrentPage, setFilteredIds }) => {

  const [filterParam, setFilterParam] = useState('price');
  const [filterValue, setFilterValue] = useState('');

  const selectOptions = [
    { value: 'product', label: 'Product' },
    { value: 'price', label: 'Price'},
    { value: 'brand', label: 'Brand' }
  ]

  const handleOnChange = (e) => {
    e.preventDefault();

    setFilterValue(e.target.value);
  };

  const handleChangeSelect = (option) => {
    setFilterParam(option.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    
    if (productFilter.value !== filterValue || productFilter.param !== filterParam) {
      setCurrentPage(0);
      setFilteredIds([]);
    }

    const params = {
      isActive: true,
      param: filterParam || productFilter.param,
      value: filterParam == 'price' && filterValue ? parseFloat(filterValue) : filterValue
    }

    setProductFilter(params);
  };

  const resetFilter = (e) => {
    e.preventDefault();

    const params = {
      isActive: false,
      param: productFilter.param,
      value: ''
    };

    setCurrentPage(0);
    setFilterValue('');
    setFilteredIds([]);
    setProductFilter(params);
  };

  return (
    <div class="container">
    <form className="row g-3 justify-content-center text-center">
      <div className="col-auto">
        <Select onChange={ handleChangeSelect } options={ selectOptions } defaultValue={ selectOptions[1] } />
      </div>
      <div className="col-auto">
        <input className="form-control" name="param" type="text" placeholder="Filter text..." onChange={ handleOnChange } value={ filterValue } />
      </div>
      <div className="col-auto">
         <button className="btn btn-primary mb-3" onClick={ handleFilter } >OK</button>
         <button className="btn btn-danger mb-3" onClick={ resetFilter } >X</button>
      </div>
    </form>
    </div>
  );
};

export default ProductsFilter;
