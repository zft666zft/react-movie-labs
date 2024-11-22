import React, { useState } from "react";
import "../../App.css"; // 引入自定义样式

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [tempPage, setTempPage] = useState(currentPage);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (value === "" || (!isNaN(value) && value >= 1 && value <= totalPages)) {
      setTempPage(value);
    }
  };

  const handleInputBlur = () => {
    if (tempPage === "" || Number(tempPage) < 1 || Number(tempPage) > totalPages) {
      setTempPage(currentPage); // 恢复为当前页
    } else {
      onPageChange(Number(tempPage)); // 更新到用户输入的页
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="pagination-info">
        Page{" "}
        <input
          type="text"
          value={tempPage}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="pagination-input"
        />{" "}
        of {totalPages}
      </span>
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
