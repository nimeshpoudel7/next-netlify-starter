import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import InstructorNav from "../nav/InstructorNav";
const InstructorRoute = (props) => {
  // state
  const [protect, setProtect] = useState(false);
  // console.log(props);
  // router
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      console.log("aa", data);
      if (data.protect) setProtect(true);
    } catch (err) {
      console.log(err);
      setProtect(false);
      router.push("/user");
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
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-2'>
              <InstructorNav />
            </div>
            <div className='col-md-10'>{props.children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructorRoute;
