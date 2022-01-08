import { useState, useContext, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { MailOutlined, SyncOutlined } from "@ant-design/icons";
import Link from "next/Link";
import { Context } from "../context";
import { Spin, Modal } from "antd";
import { useRouter } from "next/router";

const login = () => {
  const [email, setemail] = useState("nimesh@gmail.com");
  const [password, setpassword] = useState("1234");
  const [Loading, setLoading] = useState(false);

  //destructure access to state
  const { state, dispatch } = useContext(Context);

  //accessing context
  // console.log("state", state);

  //router to redirect
  const routerRedirect = useRouter();
  const { user } = state;
  // const her = JSON.parse(window.localStorage.getItem("user"));
  // console.log(her);
  //to creload after logged and goes to login
  useEffect(() => {
    if (user !== null) routerRedirect.push("/");
  }, []);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.post(`/api/login`, {
  //       email,
  //       password,
  //     });
  //     // console.table(name, email, password);
  //     // console.log("data", data);
  //     dispatch({
  //       type: "LOGIN",
  //       payload: data,
  //     });
  //     //save in local storage in json format
  //     window.localStorage.setItem("user", JSON.stringify(data));
  //     routerRedirect.push("/user");
  //     toast.success("login Sucessful");
  //     // setLoading(false);
  //   } catch (err) {
  //     toast.error(err.response.data);
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({ name, email, password });
    try {
      setLoading(true);
      let { data } = await axios.post(`/api/login`, {
        email,
        password,
      });
      // console.log("LOGIN RESPONSE", data);
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));

      // redirect
      routerRedirect.push("/user");
      // setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className='contain'>
      {/* <div className='jumbotron  text-center p-4 shadow-4 rounded-3'>
        <h1 className='display-4'>Login</h1>
      </div> */}
      <div className='container'>
        <div className='divModal  col-md-9 offset-md-2 pt-4'>
          <div className='lefImg pt-4'>
            <div className='textLogin mb-4'>
              Welcome to Vidhalaya Online Learning Platform
            </div>
            <div className='mb-4'>
              <img src={"/image.png"} />
            </div>
          </div>
          <div className='loginLine'></div>
          <div className='mt-4 pt-4'>
            <form className='form mt-1 pt-1' onSubmit={handleSubmit}>
              <label className='labelLoging'>Email</label>
              <div className='inputWrapper'>
                <input
                  type='text'
                  className='form-control mb-3 pl-5 pt-4 pb-4 pt-4 inputText'
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                  required
                  placeholder='Enter email'
                />
                <img className='iconUser' src={"/mail.png"} />
              </div>
              <label className='labelLoging'>Password</label>
              <div className='inputWrapper'>
                <input
                  type='text'
                  className='form-control inputText mb-5 mb-3 pl-5 pt-4 pb-4 pt-4'
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                  required
                  placeholder='Enter password'
                />
                <img className='iconUser' src={"/password.png"} />
              </div>
              <button
                type='submit'
                className=' btnlogin btn-text btn btn-block'
                disabled={!email || !password || Loading}>
                {Loading ? <SyncOutlined spin /> : "Login"}
              </button>
            </form>
            <div className='footLogin mb-4'>
              <div className=' text-center mt-3'>
                <Link href='/forget-password'>
                  <a className='footTxt'>Forget Password</a>
                </Link>
              </div>
              <div className='text-center mt-3'>
                <Link href='/register'>
                  <a className='footTxt2'>Register</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;
