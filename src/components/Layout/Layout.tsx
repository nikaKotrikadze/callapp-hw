import React from "react";
import DataFetching from "../DataFetching/DataFetching";
import { useDataStore } from "../../store/dataStore";
const Layout = () => {
  return (
    <div>
      <h1>hahaha Layout</h1>
      <DataFetching />
    </div>
  );
};

export default Layout;
