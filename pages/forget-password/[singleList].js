import React from "react";
import UserRoute from "./../../components/routes/UserRoute";
import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, List } from "antd";

import { Row, Input, Button, Col, Card, Modal, Form } from "antd";
import Item from "antd/lib/list/Item";
import Resizer from "react-image-file-resizer";
import {
  DeleteFilled,
  LoadingOutlined,
  SaveOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import InstructorRoute from "./../../../../components/routes/InstructorRoute";
import { useContext } from "react";
import { Context } from "../../context";
import BrokenPage from "../../components/BrokenPage";
const TokenCheck = () => {
  const {
    state: { user },
  } = useContext(Context);
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);
  const router = useRouter();
  const { singleList } = router.query;
  // console.log(singleList);
  // get everything after last dash
  // const id = singleList.split("?").pop(); // 2020
  // console.log(id);
  // let tokenData = singleList;
  // tokenData = tokenData.split("?")[0];
  // console.log(tokenData);

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    stripe_seller: {},
  });
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState({
    email: "",
    token: "",
  });
  useEffect(() => {
    getTokenCheck();
  }, [singleList]);
  useEffect(() => {
    if (values != null) {
      setList({
        ...list,
        email: values.email,
        token: values.passwordResetCode,
      });
    }
  }, [values]);
  const getTokenCheck = async () => {
    const { data } = await axios.get(`/api/forgotpassword/${singleList}`);
    setValues(data);
  };
  // console.log(values);

  const handlerResetPassword = async (e) => {
    e.preventDefault();
    // console.log(newPassword, code, email);
    // return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        newPassword,
        ...list,
      });
      setNewPassword("");
      setLoading(false);
      toast("password reset");
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
      console.log(err);
    }
  };
  console.log(list);
  return (
    <>
      {!values ? (
        <BrokenPage />
      ) : (
        <div className='contain'>
          <div className='container'>
            <div className='divModal  col-md-9 offset-md-2 pt-4'>
              <div className='lefImg pt-4'>
                <div className='textLogin mb-4'>Enter a new password</div>
                <div className='mb-4'>
                  <img src={"/image.png"} />
                </div>
              </div>
              <div className='loginLine'></div>
              <div className='mt-4 pt-4'>
                <form
                  className='form mt-1 pt-1'
                  onSubmit={handlerResetPassword}>
                  <label className='labelLoging'>Email</label>
                  <div className='inputWrapper'>
                    <input
                      type='password'
                      className='form-control inputText mb-5 mb-3 pl-5 pt-4 pb-4 pt-4'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder='Enter New Password'
                      required
                    />
                    <img className='iconUser' src={"/password.png"} />
                  </div>
                  <button
                    type='submit'
                    className=' btnlogin btn-text btn btn-block'
                    disabled={loading}>
                    {loading ? <SyncOutlined spin /> : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TokenCheck;
