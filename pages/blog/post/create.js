import { useEffect, useState } from "react";
import axios from "axios";

import { Avatar, Badge, Select } from "antd";
import { SyncOutlined } from "@ant-design/icons";

import ReactMarkdown from "react-markdown";
// import CodeBlock from "../../../components/marked/CodeBlock";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import InstructorRoute from "./../../../components/routes/InstructorRoute";

const { Option } = Select;

const PostCreate = () => {
  const CategoryValue = [
    <Option key={"education"}>Education</Option>,
    <Option key={"technology"}>Technology</Option>,
    <Option key={"math"}>Math</Option>,
    <Option key={"other"}>Other</Option>,
  ];
  const savedBody = () => {
    if (process.browser) {
      if (localStorage.getItem("body"))
        return JSON.parse(localStorage.getItem("body"));
    }
  };
  // local state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryType, setCategoryType] = useState("");

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  // markdown cheetsheet modal
  const [upoadlImage, setUpoadlImage] = useState({});
  const [highLightImage, setHighLightImage] = useState("");
  const [captionText, setCaptionText] = useState("Image Upload");
  // router
  const router = useRouter();

  // functions

  const loadCategories = (value) => {
    setCategoryType(value);
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setHighLightImage(window.URL.createObjectURL(file));
    setCaptionText(file.name);
    // setValues({ ...values, loading: true });
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
          let { data } = await axios.post("/api/blog/upload-image", {
            upoadlImage: details,
          });
          console.log("upload", data);
          // set image in the state
          setUpoadlImage(data);
          // setValues({ ...values, loading: false });
        } catch (err) {
          console.log(err);
          // setValues({ ...values, loading: false });
          toast.error(" upload Image failed. Try later.");
        }
      },
    );
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/blog/removeimage", { upoadlImage });
      setUpoadlImage({});
      setHighLightImage("");
      setCaptionText("Image Upload");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(" upload Image failed. Try later.");
    }
  };
  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/blog", {
        title,
        body,
        categoryType,
        upoadlImage,
      });

      toast("Post published");
      router.push("/blog");
    } catch (err) {
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <InstructorRoute>
      <h1 className='jumbotron text-center square p-3 mt-2 left-bottom-radius'>
        Write a Post
      </h1>

      <div className='row pb-4'>
        <div className='col-md-8'>
          <input
            type='text'
            className='form-control pb-2'
            value={title}
            onChange={handleTitle}
            placeholder='Write post title'
            autoFocus
            required
          />

          <textarea
            onChange={handleBody}
            value={body}
            placeholder='Write post content'
            className='form-control markdown-textarea'
            cols='20'
            rows='25'
            required></textarea>

          <div className='form-group'>
            <Select
              mode='tags'
              name='CategoryType'
              style={{ width: "33%" }}
              placeholder='Tags'
              size='large'
              onChange={loadCategories}>
              {CategoryValue}
            </Select>
          </div>
          <div className='form-row'>
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
            {highLightImage && (
              <Badge count='X' onClick={handleDelete} className='pointer'>
                <Avatar width={200} size={80} src={highLightImage} />
              </Badge>
            )}
          </div>
          <button
            onClick={handleSave}
            className='btn btn-primary float-right'
            disabled={!title || !body || loading || uploading}>
            {loading ? <SyncOutlined spin className='h4' /> : "PUBLISH"}
          </button>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default PostCreate;
