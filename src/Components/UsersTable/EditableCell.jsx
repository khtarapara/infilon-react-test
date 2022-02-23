import { Form, Input } from "antd";
import React from "react";

const Editablecell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  onCellEdit,
  ...restProps
}) => {
  const cellValue = record ? record[dataIndex] : null;

  const inputNode = cellValue && (
    <Input
      onChange={(event) => {
        onCellEdit(dataIndex, event.target.value);
      }}
      defaultValue={cellValue}
    />
  );
  return <td {...restProps}>{editing ? inputNode : children}</td>;
};

export default Editablecell;
