import React from "react";

export const ContextApp = React.createContext();

export const initialState = {
    isLoading: false,
    currentPage: 0,
    productIds: [],
    filteredIds: [],
    items: [],
    filter: {
      isActive: false,
      param: 'price',
      value: ''
    }
  };

export const productsReducer = (state, action) => {
    switch (action.type) {
      case 'products/loading_start': {
        return {
          ...state,
          isLoading: true
        };
      }
      case 'products/loading_end': {
        return {
          ...state,
          isLoading: false
        };
      }
      case 'products/get_ids.success': {
        return {
          ...state,
          productIds: action.payload
        };
      }
      case 'products/get_filtered_ids.success': {
        return {
          ...state,
          filteredIds: action.payload
        };
      }
      case 'products/get_items.success': {
        return {
          ...state,
          items: action.payload
        };
      }
      case 'products/change_page': {
        return {
          ...state,
          currentPage: action.currentPage
        };
      }
      case 'products/filter.change': {
        return {
          ...state,
          filter: action.payload
        };
      }
      default:
        return state;
    }
  };