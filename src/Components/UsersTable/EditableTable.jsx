import React, { useEffect, useState } from "react";
import EditableCell from "./EditableCell";
import { Table, Typography } from "antd";
import "antd/dist/antd.css";
import Avatar from "antd/lib/avatar/avatar";
import { useSelector } from "react-redux";

const Editabletable = (props) => {
  const [editingKey, setEditingKey] = useState("");
  const [editableRowData, setEditableRowData] = useState({});

  const isEditing = (record) => record.id === editingKey;

  const cancel = () => {
    setEditingKey("");
  };

  const edit = (record) => {
    setEditableRowData(record);
    setEditingKey(record.id);
  };

  const save = () => {
    props.onSave(editableRowData);
    setEditingKey("");
  };

  const deleteUser = (userId) => {
    props.onDelete(userId);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avtar",
      width: "3%",
      editable: false,
      render: (_, record) => {
        return <Avatar size={45} src={record.avatar} />;
      },
      align: "center",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      width: "20%",
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      width: "20%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: true,
    },
    {
      title: "Actions",
      width: "5%",
      align: "center",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Typography.Link title="Sure to cancel?" onClick={cancel}>
              Cancel
            </Typography.Link>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              style={{
                marginRight: 8,
              }}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => deleteUser(record.id)}
            >
              Delete
            </Typography.Link>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        onCellEdit: (dataIndex, value) => {
          setEditableRowData((prev) => {
            const newState = { ...prev };
            newState[dataIndex] = value;
            return newState;
          });
        },
      }),
    };
  });

  return (
    <Table
      rowKey={(record) => record.id}
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      bordered
      dataSource={props.data}
      columns={mergedColumns}
      rowClassName="editable-row"
      pagination={{
        onChange: cancel,
      }}
    />
  );
};

export default Editabletable;
