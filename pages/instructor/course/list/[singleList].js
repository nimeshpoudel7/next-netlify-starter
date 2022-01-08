import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import InstructorRoute from "./../../../../components/routes/InstructorRoute";
import { useRouter } from "next/router";
import { Row, Col, Card } from "antd";
import Item from "antd/lib/list/Item";
// import { useLocation } from "react-router";
import moment from "moment";
import axios from "axios";
import { Avatar, Modal, Button, List } from "antd";
import { Tooltip } from "antd";
import {
  EditFilled,
  CheckOutlined,
  CloseCircleOutlined,
  PlusCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import FormLesson from "./../../../../components/forms/FormLesson";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Context } from "../../../../context";
import BrokenPage from "./../../../../components/BrokenPage";

const SingleView = () => {
  // const search = useLocation().search;
  // const id = new URLSearchParams(search).get("id");
  const { state } = useContext(Context);
  const { user } = state;

  const [list, setList] = useState({});
  //modal visible

  const [visible, setVisible] = useState(false);
  const [checkUser, setCheckUser] = useState({});
  const [stateUser, setStateUser] = useState("");
  const [btntext, setBtntext] = useState("Upload Video");
  const [uploading, setUploading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [lessonValue, setLessonValue] = useState({
    lessonName: "",
    content: "",
    videoURL: {},
  });

  const router = useRouter();
  // console.log(router.query.singleList);
  const hey = list && list.CategoryType;
  // console.log(hey);
  const { singleList } = router.query;
  // console.log(singleList);
  // useEffect(() => {
  //   console.log(list);
  //   const her = list ? list.instructor._id : "null";
  //   console.log(her);
  // }, [list]);
  //
  useEffect(() => {
    if (user != null) {
      setStateUser(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (list != null) {
      setCheckUser(list.instructor);
      // console.log("aa", list.createdAt);
    }
  }, [list]);

  useEffect(() => {
    getCourse();
  }, [singleList]);

  useEffect(() => {
    list && getStudentCount();
  }, [list]);

  const getCourse = async () => {
    const { data } = await axios.get(`/api/course/${singleList}`);
    setList(data);
  };
  const getStudentCount = async () => {
    const { data } = await axios.post(`/api/instructor/count`, {
      courseID: list._id,
    });
    setStudentCount(data.length);
  };
  console.log(studentCount);
  // console.log(list);

  //submit handler
  const handleChange = (e) => {
    setLessonValue({ ...lessonValue, [e.target.name]: e.target.value });
  };

  const handlerVideo = async (e) => {
    // console.log(list);
    // return;
    try {
      const file = e.target.files[0];
      setBtntext(file.name);
      setUploading(true);
      //video cannot be in binary data
      const videoSendingData = new FormData();
      videoSendingData.append("video", file);
      //progressbar and video send to backend
      // console.log(videoSendingData);
      const { data } = await axios.post(
        `/api/course/videoupload/${list.instructor._id}`,
        videoSendingData,
        {
          onUploadProgress: (e) => {
            setProgressBar(Math.round((100 * e.loaded) / e.total));
          },
        },
      );
      //sending data get
      // console.log(data);
      setLessonValue({ ...lessonValue, videoURL: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video Upload Fail");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(lessonValue);
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${list.instructor._id}/${singleList}`,
        lessonValue,
      );
      // console.log(data);
      setLessonValue({
        ...lessonValue,
        lessonName: "",
        content: "",
        videoURL: {},
      });
      setProgressBar(0);
      setVisible(false);
      setBtntext("upload Video");
      console.log("a", data);
      setList(data);
      toast.success("lesson added");
      // router.push("/instructor/")
      // window.location.reload(false);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleRemoveVideo = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/removevideo/${list.instructor._id}`,
        lessonValue.videoURL,
      );
      setLessonValue({ ...lessonValue, videoURL: {} });
      setProgressBar(0);
      setUploading(false);
      setBtntext("insert another video");
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error(" video removed failed. Try later.");
    }
  };
  // console.log(list);
  const unPublishHandler = async () => {
    try {
      let getUserValue = window.confirm("Do You want to unpublish this Course");
      if (!getUserValue) return;
      const { data } = await axios.put(`/api/course/unpublish/${list._id}`);
      console.log("a", data);

      toast.success(" Course is unpublished");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      toast.error(
        "Sorry Course cannot Unpublished at the moment try again latter",
      );
    }
  };
  const publishHandler = async () => {
    try {
      let getUserValue = window.confirm("Do You want to publish this Course");
      if (!getUserValue) return;
      const { data } = await axios.put(`/api/course/publish/${list._id}`);
      console.log("a", data);

      toast.success(" Course is published");
      window.location.reload(false);
    } catch (err) {
      console.log(err);
      toast.error(
        "Sorry Course cannot published at the moment try again latter",
      );
    }
  };
  return (
    <InstructorRoute>
      {!list ? (
        <BrokenPage />
      ) : (
        <>
          <div className='container-fluid pt-3'>
            {/* <pre>{JSON.stringify(list, null, 4)}</pre> */}
            {list && checkUser && (
              <div>
                {stateUser != checkUser._id ? (
                  <BrokenPage />
                ) : (
                  <>
                    <div className='media pt-2'>
                      <Avatar
                        size={80}
                        src={
                          list.upoadlImage
                            ? list.upoadlImage.Location
                            : "/noimg.png"
                        }
                      />
                      <div className='media-body pl-2'>
                        <div className='row'>
                          <div className='col'>
                            <h4 className='mt-2 text-dark'>{list.name}</h4>
                            <p className='lessonHeader'>
                              Lessons {list.lessons && list.lessons.length}
                            </p>
                            <div
                              style={{ marginTop: "-15px", fontSize: "13px" }}>
                              {`Category : ${hey}`}
                            </div>
                          </div>
                          <div className=' d-flex pt-4 mr-5'>
                            <Tooltip>
                              <p
                                className={`h5 pointer mr-4 ${
                                  list.lessons.length < 5
                                    ? " text-danger"
                                    : "text-success"
                                }`}>
                                Total Student {studentCount && studentCount}
                              </p>
                            </Tooltip>
                            <Tooltip title='Edit' color='info'>
                              <EditFilled
                                className='h5 pointer text-darks'
                                onClick={() =>
                                  router.push(
                                    `/instructor/course/edit/${singleList}`,
                                  )
                                }
                              />
                            </Tooltip>

                            {list.lessons.length < 5 && list.lessons ? (
                              <Tooltip title='Lesson Less than 5' color='red'>
                                <ExclamationCircleFilled
                                  className={`h5 pointer ml-4 ${
                                    list.lessons.length < 5
                                      ? " text-danger"
                                      : "text-success"
                                  }`}
                                />
                              </Tooltip>
                            ) : list.published ? (
                              <Tooltip title='Un Published' color='red'>
                                <CloseCircleOutlined
                                  onClick={unPublishHandler}
                                  className={`h5 pointer ml-4 ${
                                    list.lessons.length < 5
                                      ? " text-danger"
                                      : "text-danger"
                                  }`}
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title='Publish' color='green'>
                                <CheckOutlined
                                  onClick={publishHandler}
                                  className={`h5 pointer ml-4 ${
                                    list.lessons.length < 5
                                      ? " text-danger"
                                      : "text-success"
                                  }`}
                                />
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className='row'>
                      <div className='col'>
                        <ReactMarkdown children={list.description} />
                      </div>
                    </div>

                    <div className='row'>
                      <Button
                        type='primary'
                        onClick={() => setVisible(true)}
                        className='text-center offset-md-5'
                        shape='round'
                        icon={<PlusCircleFilled />}
                        size='large'>
                        Add lesson
                      </Button>
                    </div>
                    <Modal
                      title={`+ Add Lesson on ${list.name}`}
                      centered
                      visible={visible}
                      onCancel={() => setVisible(false)}
                      width={1000}
                      footer={null}>
                      <FormLesson
                        lessonValue={lessonValue}
                        handleChange={handleChange}
                        setLessonValue={setLessonValue}
                        handleSubmit={handleSubmit}
                        uploading={uploading}
                        progressBar={progressBar}
                        handlerVideo={handlerVideo}
                        btntext={btntext}
                        handleRemoveVideo={handleRemoveVideo}
                      />
                    </Modal>
                    <Card
                      title={`${
                        list && list.lessons && list.lessons.length
                      } Lessons`}
                      className='mt-2'>
                      <Row className=' pb-5'>
                        <Col span={24}>
                          <List
                            itemLayout='horizontal'
                            dataSource={list && list.lessons}
                            renderItem={(detail, index) => (
                              <Item>
                                <Item.Meta
                                  avatar={<Avatar>{index + 1}</Avatar>}
                                  title={detail.lessonName}
                                  description={`Created ${moment
                                    .utc(detail.createdAt)
                                    .local()
                                    .startOf("seconds")
                                    .fromNow()}`}></Item.Meta>
                              </Item>
                            )}></List>
                        </Col>
                      </Row>
                    </Card>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </InstructorRoute>
  );
};

export default SingleView;
