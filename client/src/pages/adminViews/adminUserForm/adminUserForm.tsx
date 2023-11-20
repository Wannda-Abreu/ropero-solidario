import UserFormComponent from "../../../components/UserForm/UserForm";

interface UserFormPageProps {
  buttonLink: string;
}

const AdminUserForm: React.FC<UserFormPageProps> = ({ buttonLink }) => {
  return (
    <div>
      <UserFormComponent onSubmit={console.log} buttonLink={buttonLink} />
    </div>
  );
};

export default AdminUserForm;