import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/cart";
import OrderSummary from "@/components/cart/OrderSummary";
import { useRouter } from "next/navigation";

export default function Step2({ onNextStep, onPrevStep }) {
  const { data, status } = useSession();
  const { couponCode, setCouponCode, handleCoupon } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push(`/login?callbackUrl=${window.location.href}`);
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return null; // Render nothing or a loading spinner while redirecting
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <p className="alert alert-primary">Contact Details / Login</p>
          <div>
            <input
              type="text"
              value={data?.user?.name}
              className="form-control mb-2 px-2"
              placeholder="Your name"
              disabled
            />
            <input
              type="email"
              value={data?.user?.email}
              className="form-control mb-2 px-2"
              placeholder="Your email"
              disabled
            />
          </div>

          <div>
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="form-control mb-2 px-2 mt-4"
              placeholder="Enter your coupon code here"
            />

            <button
              className="btn btn-success btn-raised"
              onClick={() => handleCoupon(couponCode)}
              disabled={!couponCode?.trim()}
            >
              Apply Coupon
            </button>
          </div>

          <div className="d-flex justify-content-end my-4">
            <button
              className="btn btn-outline-danger btn-raised col-6"
              onClick={onPrevStep}
            >
              Previous
            </button>
            <button
              className="btn btn-primary btn-raised col-6"
              onClick={onNextStep}
            >
              Next
            </button>
          </div>
        </div>
        <div className="col-lg-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
