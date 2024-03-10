const Pagination = ({ currentPage = 0, setCurrentPage, idsLength, offset }) => {

    const paginationIncrement = () => {
        setCurrentPage(currentPage + 1);
    };

    const paginationDecrement = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className="pagination" style={ {justifyContent: 'center'} }>
            <div className="page-item">
                <button className="page-link" disabled={ currentPage == 0 } onClick={ paginationDecrement } >{`<`}</button>
            </div>
            <div className="page-item">
                <span className="page-link">{ currentPage + 1 }</span>
            </div>
            <div className="page-item">
                <button className="page-link" disabled={ offset >= idsLength ? true : false } onClick={ paginationIncrement } >{`>`}</button>
            </div>
        </div>
    );
};

export default Pagination;