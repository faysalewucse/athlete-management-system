import { Table } from "antd";

const CustomFormsTable = ({ forms, columns }) => {
  const data = forms?.map((form) => {
    return {
      key: form._id,
      formName: form?.formName,
      fields: form?.fields,
      team: form?.team,
      adminEmail: form?.addedBy?.email,
    };
  });

  return (
    <div>
      <Table
        size="small"
        className="mt-5"
        dataSource={data}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default CustomFormsTable;
