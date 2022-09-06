import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { changePage } from "../features/allJobs/allJobsSlice";

const PageBtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.allJobs); // picking state available in the allJob Slice store
  const dispatch = useDispatch();

  const nextPage = () => {
    let newPage = page + 1; // adding to page
    if (newPage > numOfPages) {
      newPage = 1;
    } // if the newPage is bigger than the numOfPage from server the newPage should be 1
    dispatch(changePage(newPage));
  }; // handling changing of page to next page

  const prevPage = () => {
    let oldPage = page - 1; // subtracting to page
    if (oldPage < 1) {
      oldPage = numOfPages;
    } // if the oldPage is less than the 1 then the oldPage should be numOfPage from the server
    dispatch(changePage(oldPage));
  }; // handling changing of page to next page

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  }); // creating a array from another array, and the length is based on the numOfPage from the server

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
