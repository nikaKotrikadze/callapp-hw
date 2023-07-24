import React, { useState } from "react";
import { useDataStore } from "../../store/dataStore";
import { UserData } from "../../utils/UserData";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import DataFetching from "../DataFetching/DataFetching";

const { Option } = Select;

const UserTable = () => {
  const userData = useDataStore((state) => state.data);
  const addUser = useDataStore((state) => state.addUser);
  const removeUser = useDataStore((state) => state.removeUser);
  const updateUser = useDataStore((state) => state.updateUser);

  const [selectedRecord, setSelectedRecord] = useState<UserData | null>(null);
  const [formMode, setFormMode] = useState<"add" | "edit">("add");
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        address ? `${address.street}, ${address.city}` : "N/A",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_: any, record: UserData) => (
        <a onClick={() => record.id !== undefined && handleRemove(record.id)}>
          Delete
        </a>
      ),
    },
  ];

  const sortedUserData = [...userData].sort((a, b) => b.id - a.id);

  const handleRemove = (id: number) => {
    console.log(`removed item with id: ${id}`);
    removeUser(id);
  };

  const handleAdd = () => {
    setFormMode("add");
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleModalOk = () => {
    form.submit();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values: any) => {
    try {
      const { city, street, ...rest } = values;
      const updatedData: UserData = {
        ...rest,
        address: {
          city,
          street,
        },
      };

      if (formMode === "add") {
        await addUser(updatedData);
      } else if (formMode === "edit" && selectedRecord) {
        await updateUser(selectedRecord.id, updatedData);
      }

      setIsModalVisible(false);
    } catch (error) {
      console.error("Error adding/editing user:", error);
    }
  };

  const handleRowDoubleClick = (record: UserData) => {
    setSelectedRecord(record);
    setFormMode("edit");
    setIsModalVisible(true);
    form.setFieldsValue({
      name: record.name,
      email: record.email,
      phone: record.phone,
      gender: record.gender,
      city: record.address?.city || "",
      street: record.address?.street || "",
    });
  };

  const [form] = Form.useForm();

  return (
    <div>
      <DataFetching />
      <Button onClick={handleAdd}>Add</Button>
      <Table
        dataSource={sortedUserData}
        columns={columns}
        onRow={(record: UserData) => {
          return {
            onDoubleClick: () => handleRowDoubleClick(record),
          };
        }}
      />

      <Modal
        title={formMode === "add" ? "Add New User" : "Edit User"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form form={form} onFinish={handleFormSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter name" },
              { min: 2, message: "Name must be at least 2 characters long" },
              { max: 50, message: "Name can have a maximum of 50 characters" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter phone number" },
              {
                pattern: /^\+995\d{9}$/,
                message:
                  "Phone number must start with '+995' and have 9 digits after that",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter your City" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true, message: "Please enter your Street" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserTable;
