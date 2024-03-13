import React, { useState } from "react";
import Select from "react-select";

const ProductsFilter = ({ dispatch, state }) => {

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

    if (state.filter.value != filterValue || state.filter.param !== filterParam) {
      dispatch({
        type: 'products/change_page',
        currentPage: 0
      });

      dispatch({
        type: 'products/get_filtered_ids.success',
        payload: []
      });
    } else {
      if (state.filter.isActive === true) return
    }

    dispatch({
      type: 'products/filter.change',
      payload: {
        isActive: true,
        param: filterParam || state.filter.param,
        value: filterParam === 'price' && filterValue ? parseFloat(filterValue) : filterValue
      }
    });
  };

  const resetFilter = (e) => {
    e.preventDefault();

    if (state.filter.isActive === false && state.filter.value === '') return

    dispatch({
      type: 'products/change_page',
      currentPage: 0
    });

    dispatch({
      type: 'products/get_filtered_ids.success',
      payload: []
    });

    setFilterValue('');

    dispatch({
      type: 'products/filter.change',
      payload: {
        isActive: false,
        param: state.filter.param,
        value: ''
      }
    });
  };

  return (
    <div className="container">
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
