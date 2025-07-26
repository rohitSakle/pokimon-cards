export const Footer = ({ currentPage, totalPages, pageHandler }) => {
  const handlePageChange = (value) => {
    pageHandler(value);
  };
  return (
    <div className="footer">
      <div className="pagination">
        <button
          onClick={() => handlePageChange(-1)}
          disabled={currentPage <= 0}
        >
          {"<< Prev"}
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(+1)}
          disabled={currentPage >= totalPages}
        >
          {"Next >>"}
        </button>
      </div>
    </div>
  );
};
