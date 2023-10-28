import { Checkbox, Divider } from "antd";
import { useState } from "react";
const CheckboxGroup = Checkbox.Group;

const TeamCheckBoxGroup = ({ team, onChecked }) => {
  const onChange = (list) => {
    setCheckedList(list);
  };

  const [checkedList, setCheckedList] = useState([]);
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
  };

  const plainOptions = team?.athletes?.map((athlete) => athlete?.fullName);

  const checkAll = plainOptions.length === checkedList.length;

  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptions.length;

  return (
    <div key={team._id}>
      <Checkbox
        indeterminate={indeterminate}
        onChange={onCheckAllChange}
        checked={checkAll}
      >
        {team?.teamDetails?.teamName}
      </Checkbox>
      <CheckboxGroup
        options={plainOptions}
        value={checkedList}
        onChange={onChange}
        className="ml-5 mt-5"
      />
      <Divider />
    </div>
  );
};

export default TeamCheckBoxGroup;
