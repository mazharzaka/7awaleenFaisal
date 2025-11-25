import ProtectedComponent from "@/app/context/Protected";
import Orders from "@/components/Orders";

const OrdersPage = () => {
  return (
    <ProtectedComponent>
      <Orders />
    </ProtectedComponent>
  );
};

export default OrdersPage;
