import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";

import { Context } from "../../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  // state
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(code);
  // context
  const {
    state: { user },
  } = useContext(Context);
  // router
  const router = useRouter();

  // redirect if user is logged in
  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`/api/forgotpassword`, {
        email,
      });
      setSuccess(true);
      toast("Check your email fro the secret code");
      setLoading(false);
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <div className='contain'>
        <div className='container'>
          <div className='divModal  col-md-9 offset-md-2 pt-4'>
            <div className='lefImg pt-4'>
              <div className='textLogin mb-4'>
                Forget Your Password ? You can reset Here
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
                    type='email'
                    className='form-control inputText mb-5 mb-3 pl-5 pt-4 pb-4 pt-4'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter email'
                    required
                  />
                  <img className='iconUser' src={"/mail.png"} />
                </div>

                <button
                  type='submit'
                  className=' btnlogin btn-text btn btn-block'
                  disabled={loading || !email}>
                  {loading ? <SyncOutlined spin /> : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
