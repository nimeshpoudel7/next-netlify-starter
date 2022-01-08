import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, List, Badge } from "antd";

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

import React from "react";
import UserRoute from "./../../components/routes/UserRoute";

const Profile = () => {
  const { state } = useContext(Context);
  const { user } = state;
  const router = useRouter();
  const { singleList } = router.query;
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [upoadlImage, setUpoadlImage] = useState({});
  const [highLightImage, setHighLightImage] = useState("");
  const [captionText, setCaptionText] = useState("Update Image");
  const [stateUser, setStateUser] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkUser, setCheckUser] = useState("");
  useEffect(() => {
    if (user != null) {
      setStateUser(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (values != null) {
      setCheckUser(values._id);
      // console.log("aa", list.createdAt);
    }
  }, [values]);
  useEffect(() => {
    getProfile();
  }, [singleList]);
  const getProfile = async () => {
    const { data } = await axios.get(`/api/profile/${singleList}`);
    setValues(data);
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    setHighLightImage(window.URL.createObjectURL(file));
    setCaptionText(file.name);
    setValues({ ...values, loading: true });
    // resize
    Resizer.imageFileResizer(
      file,
      720,
      500,
      "JPEG",
      100,
      0,
      async (details) => {
        try {
          let { data } = await axios.post("/api/profile/uploadimage", {
            upoadlImage: details,
          });
          console.log("upload", data);
          // set image in the state
          setUpoadlImage(data);
          setDisableBtn(true);
          setValues({ ...values, loading: false });
        } catch (err) {
          console.log(err);
          setValues({ ...values, loading: false });
          toast.error(" upload Image failed. Try later.");
        }
      },
    );
  };
  const handleDelete = async () => {
    try {
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/profile/removeimage", { upoadlImage });
      setUpoadlImage({});
      setHighLightImage("");
      setCaptionText("Image Upload");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast.error(" upload Image failed. Try later.");
    }
  };
  // console.log(values);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setDisableBtn(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.put(`/api/profile/${singleList}`, {
        ...values,
        upoadlImage,
      });
      setValues(data);
      toast.success("updated");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  console.log(values);

  return (
    <UserRoute>
      {values && (
        <div className='content'>
          {stateUser != checkUser ? (
            <BrokenPage />
          ) : (
            <Card title='My Profle' className='mt-2' hoverable>
              <Row className=' '>
                <Col span={12}>Edit Profile</Col>
              </Row>
              <Row className=' pb-1 offset-md-4'>
                <Col className='  p-2 '>
                  {highLightImage ? null : (
                    <div className='col'>
                      <div className='form-group'>
                        <label className='btn btn-outline-secondary btn-block text-left'>
                          {captionText}
                          <input
                            type='file'
                            name='image'
                            onChange={handleImage}
                            accept='image/*'
                            hidden
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </Col>
                <Col className='  p-2 '>
                  {highLightImage ? (
                    <Badge count='X' onClick={handleDelete} className='pointer'>
                      <Avatar width={200} size={80} src={highLightImage} />
                    </Badge>
                  ) : values.upoadlImage ? (
                    <Avatar
                      width={200}
                      size={80}
                      src={values.upoadlImage.Location}
                    />
                  ) : (
                    <Avatar size={80} src='/noimg.png' />
                  )}
                </Col>

                {/* <Badge count='X' className='pointer'>
                <Avatar width={200} size={80} />
              </Badge> */}
              </Row>
              <Row span={5} className=' p-3  ' justify='center'>
                <Col span={12} className='pb-5  '>
                  <form onSubmit={handleSubmit}>
                    <input
                      type='text'
                      className='form-control mb-4 p-4'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                      placeholder='Enter Name'
                    />
                    <input
                      type='text'
                      className='form-control mb-4 p-4'
                      name='email'
                      disabled
                      value={values.email ? values.email : ""}
                      onChange={handleChange}
                      placeholder='Enter Name'
                    />
                    <input
                      type='text'
                      className='form-control mb-4 p-4'
                      name='address'
                      value={values.address ? values.address : ""}
                      onChange={handleChange}
                      placeholder='Enter Address'
                    />
                    <input
                      type='text'
                      className='form-control mb-4 p-4'
                      name='phone'
                      value={values.phone ? values.phone : ""}
                      onChange={handleChange}
                      placeholder='Enter phone'
                    />
                    <button
                      type='submit'
                      span={4}
                      className='btn btn-primary  pl-3'
                      disabled={
                        loading ||
                        !values.phone ||
                        !values.address ||
                        !disableBtn
                      }>
                      {values.loading ? "Saving..." : "Update"}
                    </button>
                  </form>
                </Col>
                <Col span={12} className='pl-3'>
                  <button
                    type='submit'
                    className='btn btn-primary  pl-3 col-sm-5 offset-md-4'
                    onClick={() => router.push("/changePassword")}>
                    Change password
                  </button>
                </Col>
              </Row>
            </Card>
          )}
        </div>
      )}
    </UserRoute>
  );
};

export default Profile;
