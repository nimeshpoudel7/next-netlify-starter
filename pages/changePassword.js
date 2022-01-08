import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import UserRoute from "./../components/routes/UserRoute";
import { useContext } from "react";
import { Context } from "../context";

const ChangePassword = () => {
  const { state } = useContext(Context);
  const { user } = state;

  const [oldpassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (user != null) {
      setEmail(user.email);
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (oldpassword === newPassword) {
      toast.error("please put different new password");
      setLoading(false);
    } else {
      try {
        const { data } = await axios.post("/api/change-password", {
          oldpassword,
          newPassword,
          email,
        });
        toast.success("Password Changed");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error(err.response.data);
      }
    }
  };
  return (
    <UserRoute>
      <h1 className='jumbotron text-center bg-primary square p-4 shadow-4 rounded-3'>
        hello Want to Change Password?
      </h1>

      <div className='container col-md-4 offset-md-4 pb-5'>
        <form onSubmit={handleSubmit}>
          <input
            type='password'
            className='form-control mb-4 p-4'
            value={oldpassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder='Enter current Password'
            required
          />
          <input
            type='password'
            className='form-control mb-4 p-4'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='Enter New Password'
            required
          />
          <br />
          <button
            type='submit'
            className='btn btn-primary btn-block p-2'
            disabled={loading || !newPassword || !oldpassword}>
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </UserRoute>
  );
};

export default ChangePassword;
