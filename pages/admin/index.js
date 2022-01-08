import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import AdminRoute from "../../components/routes/AdminRoute";

const { TabPane } = Tabs;

const AdminPanel = () => {
  const [users, setUsers] = useState([
    {
      name: "",
      email: "",
      email_verified: Boolean,
      role: [],
      // courses: [],
      stripe_account_id: "",
      stripe_seller: {},
      stripeSession: {},
      createdAt: "",
      updatedAt: "",
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    const { data } = await axios.get("/api/admin/users");
    setUsers(data);
  };

  console.log(users);

  return (
    <AdminRoute>
      <p>hey admin</p>
      <pre>{JSON.stringify(users, null, 4)}</pre>
    </AdminRoute>
  );
};

export default AdminPanel;
