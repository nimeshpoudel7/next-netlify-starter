import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";

const StudentRoute = ({ children, NavShow = true }) => {
  // state
  const [protect, setProtect] = useState(false);
  // console.log(props);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
      if (data.protect) setProtect(true);
    } catch (err) {
      console.log(err);
      setProtect(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!protect ? (
        <SyncOutlined
          spin
          className='d-flex justify-content-center display-1 text-primary p-5'
        />
      ) : (
        <div className='container-fluid'>{children}</div>
      )}
    </>
  );
};

export default StudentRoute;
