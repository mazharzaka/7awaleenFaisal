import ProtectedComponent from "@/app/context/Protected";
import AddStores from "@/components/addStoers";

const AddStoersPage = () => {
  return (
    <ProtectedComponent>
      <AddStores />
    </ProtectedComponent>
  );
};

export default AddStoersPage;
