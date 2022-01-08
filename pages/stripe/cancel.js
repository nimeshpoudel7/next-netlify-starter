import { FrownFilled } from "@ant-design/icons";
import UserRoute from "./../../components/routes/UserRoute";
import { Button } from "antd";
import { useRouter } from "next/router";
const Paymentcancel = () => {
  const router = useRouter();
  const homeHandler = () => {
    router.push("/");
  };
  return (
    <UserRoute NavShow={false}>
      <div className='row text-center'>
        <div className='col-md-9'>
          <FrownFilled className='display-1 text-danger pt-5' />
          <p className='lead'> Payment Failed. Try again</p>
          <Button
            type='primary'
            shape='round'
            size='large'
            onClick={homeHandler}>
            Home
          </Button>
        </div>
        <div className='col-md-3'></div>
      </div>
    </UserRoute>
  );
};

export default Paymentcancel;
