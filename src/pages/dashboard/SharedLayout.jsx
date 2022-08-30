import React from "react";
import { Outlet } from "react-router-dom";
import { SmallSidebar, Navbar, BigSidebar, Footer } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";

const SharedLayout = () => {
  return (
    <>
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
      </Wrapper>
    </>
  );
};

export default SharedLayout;
