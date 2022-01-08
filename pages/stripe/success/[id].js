import { CheckCircleFilled } from "@ant-design/icons";
import React from "react";
import { useEffect } from "react";
import axios from "axios";

import { Button } from "antd";
import { useRouter } from "next/router";
import UserRoute from "../../../components/routes/UserRoute";
const Paymentsuccess = () => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (id) successReq();
  }, [id]);
  const successReq = async () => {
    const { data } = await axios.get(`/api/stripe-success/${id}`);
    router.push(`/user/course/${data.course.subTitle}`);
  };
  return (
    <UserRoute NavShow={false}>
      <div className='row text-center'>
        <div className='col-md-9'>
          <CheckCircleFilled className='display-1 text-success pt-5' />
          <p className='lead'>
            {" "}
            Payment success. You will be redirected to home page
          </p>
        </div>
        <div className='col-md-3'></div>
      </div>
    </UserRoute>
  );
};

export default Paymentsuccess;
