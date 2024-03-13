const Pagination = ({ dispatch, state, pageLimit }) => {
    const offset = state.currentPage * pageLimit + pageLimit;
    const idsLength = state.filter.isActive ? state.filteredIds.length : state.productIds.length;

    const paginationIncrement = () => {
        dispatch({
            type: 'products/change_page',
            currentPage: state.currentPage + 1
        });
    };

    const paginationDecrement = () => {
        dispatch({
            type: 'products/change_page',
            currentPage: state.currentPage - 1
        });
    };

    return (
        <div className="pagination" style={ {justifyContent: 'center'} }>
            <div className="page-item">
                <button className="page-link" disabled={ state.currentPage == 0 } onClick={ paginationDecrement } >{`<`}</button>
            </div>
            <div className="page-item">
                <span className="page-link">{ state.currentPage + 1 }</span>
            </div>
            <div className="page-item">
                <button className="page-link" disabled={ offset >= idsLength ? true : false } onClick={ paginationIncrement } >{`>`}</button>
            </div>
        </div>
    );
};

export default Pagination;