import { useState, useEffect } from "react";
import axios from "axios";
import { Select, Button, Avatar, Badge } from "antd";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import Resizer from "react-image-file-resizer";
import { SaveOutlined } from "@ant-design/icons";
import Formcourse from "./../../../components/forms/coursecreate";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const CourseCreate = () => {
  // state
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "5",
    uploading: false,
    paid: true,
    loading: false,
    CategoryType: "",
  });
  const [upoadlImage, setUpoadlImage] = useState({});
  const [highLightImage, setHighLightImage] = useState("");
  const [captionText, setCaptionText] = useState("Image Upload");
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
          let { data } = await axios.post("/api/course/uploadimage", {
            upoadlImage: details,
          });
          console.log("upload", data);
          // set image in the state
          setUpoadlImage(data);
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
      const res = await axios.post("/api/course/removeimage", { upoadlImage });
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.post("/api/course", {
        ...values,
        upoadlImage,
      });
      toast.success(" you can start adding lessons");
      router.push("/instructor");
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <InstructorRoute>
      <h1 className='jumbotron text-center square'>Create Course</h1>
      <div className='pt-3 pb-3'>
        <Formcourse
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          setValues={setValues}
          values={values}
          highLightImage={highLightImage}
          captionText={captionText}
          handleDelete={handleDelete}
        />
      </div>
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <pre>{JSON.stringify(upoadlImage, null, 4)}</pre>
    </InstructorRoute>
  );
};

export default CourseCreate;
