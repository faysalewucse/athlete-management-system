import { Table } from "antd";

const ArchivedFormsTable = ({ forms, columns }) => {
  const data = forms?.map((form) => {
    return {
      key: form._id,
      formName: form.formName,
      formFile: form.formFile,
      teamName: form.teamName,
      // organization: form.organization,
      email: form?.addedBy?.email,
      isArchived: form?.isArchived,
    };
  });

  console.log(data);

  return (
    <div className="flex-1">
      <p className="font-bold text-gradient text-lg">PDF Archived Forms</p>

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

export default ArchivedFormsTable;
