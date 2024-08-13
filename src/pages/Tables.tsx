import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import TableThree from '../components/TableThree';

const Tables = () => {
  const navigate = useNavigate()
  return (
    <>
      <Breadcrumb pageName="Users Management" />
      <div className="flex justify-end items-center mb-4">
        {/* <h1 className="text-lg font-medium">Users Management</h1> */}
        <button className="flex rounded bg-primary p-3 font-medium text-gray" onClick={() => navigate("/forms/form-layout")}>
         + Add User
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
