import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const StripeCallback = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  useEffect(() => {
    try {
      if (user) {
        axios
          .post("/api/get-account-status")
          .then((res) => {
            dispatch({
              type: "LOGIN",
              payload: res.data,
            });
            window.localStorage.setItem("user", JSON.stringify(res.data));
            window.location.href = "/instructor";
          })
          .catch((res) => {
            toast.error("failed try again with proper bank details");
            const timer = setTimeout(() => {
              window.location.href = "/";
            }, 1000);
            return () => clearTimeout(timer);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  return (
    <SyncOutlined
      spin
      className='d-flex justify-content-center display-1 text-danger p-5'
    />
  );
};

export default StripeCallback;
