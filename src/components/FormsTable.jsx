import { Table } from "antd";

const FormsTable = ({ forms, columns }) => {
  const data = forms?.map((form) => {
    return {
      key: form._id,
      formName: form.formName,
      formFile: form.formFile,
      teamName: form.teamName,
      organization: form.organization,
      email: form.addedBy.email,
      isArchived: form?.isArchived,
    };
  });
  console.log(data);
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

export default FormsTable;
