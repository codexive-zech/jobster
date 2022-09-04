import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { changePage } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = 1;
    }
    dispatch(changePage(newPage));
  };

  const prevPage = () => {
    let oldPage = page - 1;
    if (oldPage < 1) {
      oldPage = numOfPages;
    }
    dispatch(changePage(oldPage));
  };

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">
        {pages.map((pageNumb) => {
          return (
            <button
              type="button"
              key={pageNumb}
              className={pageNumb === page ? "pageBtn active" : "pageBtn"}
              onClick={() => dispatch(changePage(pageNumb))}
            >
              {pageNumb}
            </button>
          );
        })}
      </div>
      <button type="button" className="next-btn" onClick={nextPage}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
