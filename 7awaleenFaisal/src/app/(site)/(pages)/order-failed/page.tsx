import { Suspense } from "react";
import OrderFailed from "@/components/OrderFailed";

export default function OrderFailedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderFailed />
    </Suspense>
  );
}
