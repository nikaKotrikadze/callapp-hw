import React from "react";
import { Table } from "antd";
import { useDataStore } from "../../store/dataStore";
import { UserData } from "../../utils/UserData";
import DataFetching from "../DataFetching/DataFetching";

const UserTable = () => {
  const userData = useDataStore((state) => state.data);
  console.log(userData);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: UserData["address"]) =>
        address ? `${address.street}, ${address.city}` : "",
    },
  ];

  return (
    <div>
      <DataFetching />
      <Table dataSource={userData} columns={columns} />
    </div>
  );
};

export default UserTable;
