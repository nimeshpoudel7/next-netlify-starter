import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/Link";
import { Context } from "../../context";
import { useRouter } from "next/router";

const register = () => {
  const [name, setname] = useState("nimeshj");
  const [email, setemail] = useState("nimesh@gmail.com");
  const [password, setpassword] = useState("1234");
  const [Loading, setLoading] = useState(false);
  //destructure access to state
  const { state } = useContext(Context);
  //accessing context
  // console.log("state", state);

  //router to redirect
  const routerRedirect = useRouter();
  const { user } = state;
  //to creload after logged and goes to login
  useEffect(() => {
    //effect
    if (user !== null) {
      const timer = setTimeout(() => {
        routerRedirect.push("/");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`/api/register`, {
        name,
        email,
        password,
      });
      // console.table(name, email, password);
      console.log(data, "from front and data from back");
      toast.success("Please Check Your Mail to active acount");
      setemail("");
      setname("");
      setpassword("");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <div className='contain'>
      {/* <div className='jumbotron p-4 shadow-4 rounded-3  text-center'>
        <h1 className='display-4'>Register</h1>
      </div> */}

      <div className='container'>
        {user ? (
          <center>
            <h3>
              Redirecting <Spin size='large' />
            </h3>
          </center>
        ) : (
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
              <form className='form  pt-1' onSubmit={handleSubmit}>
                <label className='labelLoging'>Name</label>
                <div className='inputWrapper'>
                  <input
                    type='text'
                    className='form-control inputText mb-2  pl-5 pt-4 pb-4 pt-4'
                    name='name'
                    value={name}
                    onChange={(e) => {
                      setname(e.target.value);
                    }}
                    required
                    placeholder='Enter Name'
                  />
                  <img className='iconUser' src={"/user.png"} />
                </div>
                <label className='labelLoging'>Email</label>
                <div className='inputWrapper'>
                  <input
                    type='text'
                    className='form-control inputText mb-2  pl-5 pt-4 pb-4 pt-4'
                    name='email'
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
                    className='form-control inputText mb-4  pl-5 pt-4 pb-4 pt-4'
                    name='password'
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
                  disabled={!name || !email || !password || Loading}>
                  {Loading ? <SyncOutlined spin /> : "Submit"}
                </button>
              </form>
              <div className='footLogin mb-4'>
                <div className=' text-center mt-3'>
                  <a className='footTxt'>Alreaady register?</a>
                </div>
                <div className='text-center mt-3'>
                  <Link href='/login'>
                    <a className='footTxt2'>Login</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default register;
