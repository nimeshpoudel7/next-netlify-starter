import { useState, useEffect } from "react";
import axios from "axios";

import { Avatar, List } from "antd";
import { Row, Col, Card, Modal } from "antd";
import Item from "antd/lib/list/Item";
import Resizer from "react-image-file-resizer";
import { DeleteFilled, LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import Formcourse from "./../../../../components/forms/coursecreate";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import InstructorRoute from "./../../../../components/routes/InstructorRoute";
import { useContext } from "react";
import { Context } from "../../../../context";
import BrokenPage from "./../../../../components/BrokenPage";
import UpdateLessonForm from "./../../../../components/forms/UpdateLessonForm";
const EditCourse = () => {
  // state
  const router = useRouter();
  const { singleList } = router.query;
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "5",
    uploading: false,
    paid: true,
    loading: false,
    CategoryType: [],
    lessons: [],
  });
  const [upoadlImage, setUpoadlImage] = useState({});
  const [highLightImage, setHighLightImage] = useState("");
  const [stateUser, setStateUser] = useState("");
  const [captionText, setCaptionText] = useState("Image Upload");
  const [checkUser, setCheckUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [currentLesson, setCurrentLesson] = useState({});
  const [videoBtnText, setVideoBtnText] = useState("Update Video");
  const [progressBar, setProgressBar] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { state } = useContext(Context);
  const { user } = state;
  useEffect(() => {
    if (user != null) {
      setStateUser(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (values != null) {
      setCheckUser(values.instructor);
      setUpoadlImage(values.upoadlImage);
      // console.log("aa", list.createdAt);
    }
  }, [values]);

  useEffect(() => {
    getCourse();
  }, [singleList]);
  const getCourse = async () => {
    const { data } = await axios.get(`/api/course/${singleList}`);
    setValues(data);
  };

  // console.log(values);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeLesson = (e) => {
    setCurrentLesson({ ...currentLesson, [e.target.name]: e.target.value });
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
      const { data } = await axios.put(`/api/course/${singleList}`, {
        ...values,
        upoadlImage,
      });
      toast.success("Your Course is Updated");
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const dragHandler = (e, index) => {
    console.log("on drag", index);
    //datatrans obj
    //saving idex in obj giving name
    e.dataTransfer.setData("indexofitem", index);
  };
  const dropHandler = async (e, index) => {
    try {
      console.log("on dropuu", index);

      const transferIndex = e.dataTransfer.getData("indexofitem");
      const transferedIndex = index;

      //both data u=above

      let wholelessons = values.lessons;

      let findingItem = wholelessons[transferIndex]; //moved item
      wholelessons.splice(transferIndex, 1); // remoe 1 from given index
      wholelessons.splice(transferedIndex, 0, findingItem); //push

      setValues({ ...values, lessons: [...wholelessons] });
      const { data } = await axios.put(`/api/course/${singleList}`, {
        ...values,
        upoadlImage,
      });
      toast.success("Your lesson position is changed");
    } catch (err) {
      toast.error("Your lesson position is not changed");
    }
  };
  const deleteHander = async (index) => {
    try {
      const confrim = window.confirm("Do you really want to delete?");
      console.log(confrim);
      if (!confrim) return;
      if (values.lessons && values.lessons.length < 6 && values.published) {
        toast.error(
          "Your Course is pulished and Published course cannot have lesson less than 5 ",
        );
      } else {
        let wholelessons = values.lessons;
        const removeditem = wholelessons.splice(index, 1); // remoe 1 from given index
        // console.log(removeditem[0]._id);

        setValues({ ...values, lessons: wholelessons });
        const { data } = await axios.put(
          `/api/course/${removeditem[0]._id}/${singleList}`,
        );
        toast.success("Your lesson has been deleted ");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  //update lesson
  const handlerVideo = async (e) => {
    try {
      if (currentLesson.videoURL && currentLesson.videoURL.Location) {
        const res = await axios.post(
          `/api/course/removevideo/${values.instructor._id}`,
          currentLesson.videoURL,
        );
        console.log("video removed", res);
      }
      setUploading(true);
      const videofile = e.target.files[0];
      setVideoBtnText(videofile.name);

      const formDataVideo = new FormData();
      formDataVideo.append("video", videofile);
      formDataVideo.append("courseId", values._id);
      //progressbar and video send to backend
      const { data } = await axios.post(
        `/api/course/videoupload/${values.instructor._id}`,
        formDataVideo,
        {
          //axios
          onUploadProgress: (e) => {
            setProgressBar(Math.round((100 * e.loaded) / e.total));
          },
        },
      );
      console.log(data);
      setCurrentLesson({ ...currentLesson, videoURL: data });
      setUploading(false);
    } catch (err) {
      toast.error("Failed top update video");
    }
  };
  // const handlerLessonUpdate = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const { data } = await axios.put(
  //       `/api/course/lesson/${currentLesson._id}/${singleList}`,
  //       currentLesson,
  //     );
  //     setVisible(false);
  //     setVideoBtnText("Update Video");
  //     toast.success("Lesson Update");
  //     //setValues(data);
  //     //
  //   } catch (err) {}
  // };
  const handlerLessonUpdate = async (e) => {
    e.preventDefault();
    let { data } = await axios.put(
      `/api/course/lesson/${currentLesson._id}/${singleList}`,
      currentLesson,
    );
    // console.log("LESSON UPDATED AND SAVED ===> ", data);
    setVideoBtnText("Update video");
    setProgressBar(0);
    setVisible(false);
    // update lessons
    if (data.update) {
      let valueChange = values.lessons;
      const index = valueChange.findIndex(
        (detaills) => detaills._id === currentLesson._id,
      );
      valueChange[index] = currentLesson;
      setValues({ ...values, lessons: valueChange });
      toast.success("Lesson updated");
    }
  };

  return (
    <InstructorRoute>
      {!values ? (
        <BrokenPage />
      ) : (
        <>
          {values && checkUser ? (
            <>
              {stateUser != checkUser._id ? (
                <BrokenPage />
              ) : (
                <>
                  <h1 className='jumbotron p-4 shadow-4 rounded-3 text-center square'>
                    Update Course
                  </h1>
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
                      edit={true}
                    />
                  </div>
                  <hr className='mb-4 cardLesson' />
                  //ondrag over event to allow pedent defaulr
                  <Card
                    hoverable
                    title={`${
                      values && values.lessons && values.lessons.length
                    } Lessons`}
                    className='mt-2 cardLesson text-white'>
                    <Row className=' pb-5'>
                      <Col span={24}>
                        <List
                          onDragOver={(e) => e.preventDefault()}
                          itemLayout='horizontal'
                          dataSource={values && values.lessons}
                          renderItem={(detail, index) => (
                            <Item
                              draggable
                              onDragStart={(e) => dragHandler(e, index)}
                              onDrop={(e) => dropHandler(e, index)}>
                              <Item.Meta
                                onClick={() => {
                                  setVisible(true);
                                  setCurrentLesson(detail);
                                }}
                                avatar={<Avatar>{index + 1}</Avatar>}
                                title={detail.lessonName}
                              />
                              <DeleteFilled
                                className='text-danger'
                                onClick={() => deleteHander(index)}
                                style={{ fontSize: "22px" }}
                                size='large'
                              />
                            </Item>
                          )}></List>
                      </Col>
                    </Row>
                  </Card>
                  <Modal
                    title={` Update Lesson on ${currentLesson.lessonName}`}
                    centered
                    visible={visible}
                    onCancel={() => setVisible(false)}
                    width={1000}
                    footer={null}>
                    <UpdateLessonForm
                      currentLesson={currentLesson}
                      setCurrentLesson={setCurrentLesson}
                      handlerLessonUpdate={handlerLessonUpdate}
                      handlerVideo={handlerVideo}
                      uploading={uploading}
                      progressBar={progressBar}
                      handleChangeLesson={handleChangeLesson}
                      videoBtnText={videoBtnText}
                    />
                  </Modal>
                </>
              )}
            </>
          ) : (
            <LoadingOutlined />
          )}
        </>
      )}

      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <pre>{JSON.stringify(upoadlImage, null, 4)}</pre> */}
    </InstructorRoute>
  );
};

export default EditCourse;
