import React, { useEffect } from "react";
import axios from "axios";
import BASE from "../../utils/API";
import { useDataStore } from "../../store/dataStore";
import { UserData } from "../../utils/UserData";

const DataFetching = () => {
  const setData = useDataStore((state) => state.setData);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<UserData>(`${BASE}/api/data`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);

  return null;
};

export default DataFetching;
