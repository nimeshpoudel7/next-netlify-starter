import React, {
  useEffect,
  useState,
  createElement,
  useRef,
  useContext,
} from "react";
import { useRouter } from "next/router";
import ReactToPrint from "react-to-print";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlayCircleOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
  PieChartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import BrokenPage from "./../../../components/BrokenPage";
import StudentRoute from "./../../../components/routes/StudentRoute";
import { Button, Menu, Avatar, Progress } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { useWindowWidth } from "@react-hook/window-size";
import { ComponentToPrint } from "./../../../components/cards/CertificateFile";
import QaCreateRead from "../../../components/question-answer/QaCreateRead";
import AddAnswer from "../../../components/question-answer/AddAnswer";
import EditAnswer from "../../../components/question-answer/EditAnswer";
import QaEdit from "../../../components/question-answer/QaEdit";
import { Context } from "../../../context";

const SingleCourse = () => {
  const {
    state: { user },
  } = useContext(Context);
  const { Item } = Menu;
  const router = useRouter();
  const { singleList } = router.query;
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setcollapsed] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [updateState, setUpdateState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState({ lessons: [] });
  const [list, setList] = useState({});

  const componentRef = useRef();

  const [err, setErr] = useState();
  // for qa
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    loading: false,
  });
  const [clickedLessonQa, setClickedLessonQa] = useState([]);
  // for qa update
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editValues, setEditValues] = useState({
    _id: "",
    title: "",
    description: "",
    loading: false,
  });
  // for adding answer
  const [answerModalVisible, setAnswerModalVisible] = useState(false);
  const [answerContent, setAnswerContent] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({});

  // for answer update
  const [answerEditModalVisible, setAnswerEditModalVisible] = useState(false);
  const [answerEditLoading, setAnswerEditLoading] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState({});

  // markdown cheetsheet modal
  const [markdownCheetsheetModal, setMarkdownCheetsheetModal] = useState(false);

  useEffect(() => {
    if (singleList) getCourse();
  }, [singleList]);

  const getCourse = async () => {
    try {
      //inscourselist
      const { data } = await axios.get(`/api/user/course/${singleList}`);
      setCourses(data);
      setList(data);
    } catch (error) {
      if (error.response.data === "Course Not Found")
        // setErr(error.response.data);
        console.log(error.response.data);
    }
    // setErr({});
  };
  useEffect(() => {
    if (courses) getCompletedLessons();
  }, [courses]);
  // console.log(courses);

  // use POST route to avoid mongo objectId string issue
  const getCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: courses._id,
    });
    // console.log("COMPLETED LESSONS => ", data);
    setCompletedLessons(data);
  };
  const triggerOne = () => setcollapsed(!collapsed);

  const onlyWidth = useWindowWidth();
  useEffect(() => {
    console.log("onlyWidth", onlyWidth);
    if (onlyWidth < 800) {
      setcollapsed(true);
    } else if (onlyWidth > 800) {
      setcollapsed(false);
    }
  }, [onlyWidth < 800]);

  const dataPercent = (completedLessons.length / courses.lessons.length) * 100;
  const markCompleted = async () => {
    const { data } = await axios.post(`/api/markas-Complete`, {
      courseId: courses._id,
      lessonId: courses.lessons[clicked]._id,
    });
    console.log(data);
    setCompletedLessons([...completedLessons, courses.lessons[clicked]._id]);
  };
  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/markas-incomplete`, {
        courseId: courses._id,
        lessonId: courses.lessons[clicked]._id,
      });
      // console.log(data);
      // remove the 'mark incomplete' id from completedLessons
      const all = completedLessons;
      //   console.log("ALL ======> ", all);
      const index = all.indexOf(courses.lessons[clicked]._id);
      if (index !== -1) {
        all.splice(index, 1);
        console.log("ALL WITHOUT REMOVED =====> ", all);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * =========================
   * QA
   * =========================
   */

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      setValues({ ...values, loading: true });
      console.log("handle create post => ", values);
      let allData = {
        ...values,
        courseId: courses._id,
        lessonId: courses.lessons[clicked]._id,
        userId: user._id,
      };
      const { data } = await axios.post("/api/qa", allData);
      // console.log("QA CREATE => ", data);
      setValues({ ...values, title: "", description: "", loading: false });
      // setClickedLessonQa([data, ...clickedLessonQa]);
      loadQuestions();
      setVisible(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast(err.response.data);
    }
  };

  useEffect(() => {
    if (clicked !== -1) loadQuestions();
  }, [clicked]);

  const loadQuestions = async (req, res) => {
    const { data } = await axios.get(`/api/qa/${courses.lessons[clicked]._id}`);
    // console.log(data);
    setClickedLessonQa(data);
  };

  const handleQaDelete = async (q) => {
    try {
      let answer = confirm("Are you sure you want to delete?");
      // if (answer) console.log("handle qa delete", qaId);
      if (!answer) return;
      const { data } = await axios.delete(`/api/qa/${q._id}/${q.postedBy._id}`);
      // console.log("DELETED QA => ", data);
      loadQuestions();
    } catch (err) {
      toast("Delete failed. Try again.");
    }
  };

  const handleQaEdit = (q) => {
    // console.log("EDIT CLICKED =>", q);
    setEditValues(q);
    setEditModalVisible(!editModalVisible);
  };

  const handleEditPost = async () => {
    console.log("editvalues => ", editValues);
    try {
      // console.log("EDIT POST REQ => ", editValues);
      const { data } = await axios.put(`/api/qa/${editValues._id}`, editValues);
      // console.log("EDIT POST RES => ", data);
      loadQuestions();
      setEditModalVisible(false);
      toast("Edit successful");
    } catch (err) {
      console.log(err);
      toast("Edit failed. Try again.");
    }
  };

  /**
   * add answer to qa
   */

  const handleAddAnswer = (q) => {
    setAnswerModalVisible(true);
    setCurrentQuestion(q);
  };

  const handleAnswerPost = async () => {
    try {
      setAnswerLoading(true);
      const { data } = await axios.put(`/api/qa/answer`, {
        questionId: currentQuestion._id,
        content: answerContent,
        userId: user._id,
      });
      setAnswerContent("");
      setAnswerModalVisible(false);
      loadQuestions();
      setAnswerLoading(false);
      toast("New answer added");
      // console.log("ANSEWR ADDED =>", data);
    } catch (err) {
      console.log(err);
      setAnswerLoading(false);
      toast("Unauthorized");
    }
  };

  const handleEditAnswer = async (a) => {
    // console.log("handle edit ans qa", q._id, a._id);
    setAnswerEditModalVisible(true);
    setCurrentAnswer(a);
  };

  const handleEditAnswerPost = async () => {
    try {
      setAnswerEditLoading(true);
      // console.log("handleEditAnswerPost => currentanswer", currentAnswer);
      const { data } = await axios.put(`/api/qa/answer-edit`, currentAnswer);
      // console.log("ANSWER EDIT RES", data);
      loadQuestions();
      setAnswerEditModalVisible(false);
      setCurrentAnswer({});
      setAnswerEditLoading(false);
      toast("Answer successfully updated");
    } catch (err) {
      toast("Error updating. Try again.");
      setAnswerEditLoading(false);
    }
  };

  const handleDeleteAnswer = async (a) => {
    try {
      let answer = confirm("Are you sure you want to delete?");
      // if (answer) console.log("handle qa delete", qaId);
      if (!answer) return;
      // console.log("handle delete ans qa", a._id);
      const { data } = await axios.delete(
        `/api/qa/answer-delete/${a._id}/${a.postedBy._id}`,
      );
      loadQuestions();
      toast("Answer successfully deleted");
    } catch (err) {
      toast("Delete failed. Try again.");
    }
  };

  const markQaAsResolved = async (q) => {
    try {
      // console.log("mark as resolved", q._id, q.postedBy._id);
      const { data } = await axios.put(`/api/qa/mark-resolved`, {
        questionId: q._id,
        postedBy: q.postedBy._id,
      });
      loadQuestions();
      console.log("MARK RESOLVED => ", data);
      toast("You marked it resolved");
    } catch (err) {
      // console.log(err);
      toast("Mark resolved failed. Try again.");
    }
  };

  const markQaAsNotResolved = async (q) => {
    try {
      // console.log("mark as resolved", q._id, q.postedBy._id);
      const { data } = await axios.put(`/api/qa/mark-unresolved`, {
        questionId: q._id,
        postedBy: q.postedBy._id,
      });
      loadQuestions();
      console.log("MARK RESOLVED => ", data);
      toast("You marked it resolved");
    } catch (err) {
      // console.log(err);
      toast("Mark resolved failed. Try again.");
    }
  };

  return (
    <>
      {err === "Course Not Found" ? (
        <BrokenPage />
      ) : (
        <StudentRoute>
          <div className='row'>
            {/* {JSON.stringify(completedLessons)} */}
            <div>
              <Button
                onClick={triggerOne}
                className='text-primary mt-1 btn-block mb-2'
                disabled={onlyWidth < 800}>
                {createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                )}
                {"Lessons"}
              </Button>

              {!collapsed && courses && (
                <div
                  className='pt-2 pb-2'
                  style={{ borderBottom: "3px solid #222" }}>
                  <PieChartOutlined className='pl-4 pr-1 h4' />{" "}
                  <span className='text-success'>
                    {completedLessons.length}
                  </span>
                  {" / "}
                  <span className='text-danger'>
                    {courses.lessons && courses.lessons.length}
                  </span>
                  lessons completed
                  <Progress percent={dataPercent} size='small' />
                </div>
              )}

              <Menu
                mode='inline'
                defaultSelectedKeys={[clicked]}
                // inlinecollapsed={collapsed}
              >
                {courses.lessons &&
                  courses.lessons.map((lesson, index) => (
                    <Item
                      onClick={() => setClicked(index)}
                      key={index}
                      icon={
                        <Avatar>
                          <span>{index + 1}</span>
                        </Avatar>
                      }>
                      {lesson.lessonName.substring(0, 30)}

                      {completedLessons.includes(lesson._id) ? (
                        <CheckCircleFilled
                          className='float-right text-success ml-2'
                          style={{ marginTop: "13px" }}
                        />
                      ) : (
                        <MinusCircleFilled
                          className='float-right text-danger ml-2'
                          style={{ marginTop: "13px" }}
                        />
                      )}
                    </Item>
                  ))}
                {dataPercent == "100" && (
                  <Item>
                    <ReactToPrint
                      trigger={() => <p>Print/Download Certificate</p>}
                      content={() => componentRef.current}
                    />
                  </Item>
                )}
              </Menu>
            </div>

            <div className='col pt-2'>
              {clicked !== -1 ? (
                <>
                  <div className='col alert alert-primary square'>
                    <b>{courses.name.substring(0, 30)}</b> /{" "}
                    {courses.lessons[clicked].lessonName.substring(0, 30)}
                    {completedLessons.includes(courses.lessons[clicked]._id) ? (
                      <span
                        className='float-right pointer text-danger'
                        onClick={markIncompleted}>
                        Mark incomplete
                      </span>
                    ) : (
                      <span
                        className='float-right pointer text-success'
                        onClick={markCompleted}>
                        Mark as completed
                      </span>
                    )}
                  </div>

                  <div>
                    {courses.lessons[clicked].videoURL &&
                      courses.lessons[clicked].videoURL.Location && (
                        <>
                          <div className='wrapper'>
                            <ReactPlayer
                              className='player'
                              url={courses.lessons[clicked].videoURL.Location}
                              width='100%'
                              height='100%'
                              controls
                              // playsinline

                              onEnded={markCompleted}
                            />
                          </div>
                          <hr />
                        </>
                      )}
                    <ReactMarkdown
                      children={courses.lessons[clicked].content}
                      className='single-post'
                    />{" "}
                    {/* qa */}
                    <br />
                    {clicked !== -1 && (
                      <QaCreateRead
                        visible={visible}
                        setVisible={setVisible}
                        values={values}
                        setValues={setValues}
                        handleCreatePost={handleCreatePost}
                        clickedLessonQa={clickedLessonQa}
                        handleQaDelete={handleQaDelete}
                        handleQaEdit={handleQaEdit}
                        handleAddAnswer={handleAddAnswer}
                        handleEditAnswer={handleEditAnswer}
                        handleDeleteAnswer={handleDeleteAnswer}
                        markdownCheetsheetModal={markdownCheetsheetModal}
                        setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
                        markQaAsResolved={markQaAsResolved}
                        markQaAsNotResolved={markQaAsNotResolved}
                      />
                    )}
                    {/* edit in modal view */}
                    <QaEdit
                      editModalVisible={editModalVisible}
                      setEditModalVisible={setEditModalVisible}
                      editValues={editValues}
                      setEditValues={setEditValues}
                      handleEditPost={handleEditPost}
                      answerLoading={answerLoading}
                      markdownCheetsheetModal={markdownCheetsheetModal}
                      setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
                    />
                    {/* add answer */}
                    <AddAnswer
                      answerModalVisible={answerModalVisible}
                      setAnswerModalVisible={setAnswerModalVisible}
                      answerContent={answerContent}
                      setAnswerContent={setAnswerContent}
                      handleAnswerPost={handleAnswerPost}
                      answerLoading={answerLoading}
                      setAnswerLoading={setAnswerLoading}
                      currentQuestion={currentQuestion}
                      markdownCheetsheetModal={markdownCheetsheetModal}
                      setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
                    />
                    {/* edit answer */}
                    <EditAnswer
                      answerEditModalVisible={answerEditModalVisible}
                      setAnswerEditModalVisible={setAnswerEditModalVisible}
                      handleEditAnswerPost={handleEditAnswerPost}
                      answerEditLoading={answerEditLoading}
                      setAnswerEditLoading={setAnswerEditLoading}
                      currentAnswer={currentAnswer}
                      setCurrentAnswer={setCurrentAnswer}
                      markdownCheetsheetModal={markdownCheetsheetModal}
                      setMarkdownCheetsheetModal={setMarkdownCheetsheetModal}
                    />
                  </div>
                  <br />
                </>
              ) : (
                <div className='d-flex justify-content-center p-5'>
                  <div className='text-center p-5'>
                    <PlayCircleOutlined
                      className='text-primary display-1 p-5'
                      onClick={() => setClicked(0)}
                    />
                    <br />
                    {JSON.stringify(completedLessons)}
                    <h2>Start Learning</h2>
                    <p className='lead'>
                      Click the lessons on the sidebar to start.
                    </p>
                  </div>
                </div>
              )}

              <div className='example'>
                <div className='page-container hidden-on-narrow'>
                  <ComponentToPrint list={list} ref={componentRef} />
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </StudentRoute>
      )}
    </>
  );
};

export default SingleCourse;
