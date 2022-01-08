import React, { useEffect } from "react";
import { Row, Col, Badge, Tag, Modal, Button } from "antd";
import moment from "moment";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import { Formatter } from "./../../utils/helper";
import ReactMarkdown from "react-markdown";
import { LoadingOutlined } from "@ant-design/icons";
import BrokenPage from "./../BrokenPage";
const SingleCourseCard = ({
  list,
  setmodalVisible,
  setCheckprev,
  modalVisible,
  checkprev,
  user,
  stateUser,
  loading,
  handlerEnrollFree,
  handlerEnrollPaid,
  setCheckEnrolled,
  checkEnrolled,
}) => {
  const {
    name,
    CategoryType,
    description,
    instructor,
    updatedAt,
    paid,
    price,
    lessons,
    subTitle,
    upoadlImage,
  } = list;
  // console.log(instructor._id);
  // console.log(list);
  const routerRedirect = useRouter();
  const edithandler = () => {
    routerRedirect.push(`/instructor/course/edit/${subTitle}`);
  };
  // useEffect(() => {

  // }, [])
  console.log(list);
  return (
    <>
      {!list ? (
        <BrokenPage />
      ) : (
        <div>
          <div className='jumbotron square p-4 shadow-4 rounded-3'>
            <Row>
              <Col span={18}>
                <h1 className='text-dark fontWeight-bold'>{name}</h1>
                <p className='lead'>
                  {description && description.substring(0, 200)}...
                </p>
                {CategoryType.map((c) => (
                  <Badge
                    key={c}
                    count={c}
                    style={{ backgroundColor: "	#5D3FD3" }}
                    className='pb-4
                   mr-2'
                  />
                ))}
                <p>Created by {instructor.name}</p>
                <p>
                  {`  Last Updated ${moment
                    .utc(updatedAt)
                    .local()
                    .startOf("seconds")
                    .fromNow()}`}
                </p>
                <h4 className='text-dark'>
                  {paid
                    ? Formatter({
                        amount: price,
                        currency: "usd",
                      })
                    : "Free"}
                </h4>
              </Col>

              <Col span={6}>
                {lessons[0].videoURL && lessons[0].videoURL.Location ? (
                  <div
                    className='bg-dark'
                    onClick={() => {
                      setCheckprev(lessons[0].videoURL.Location);
                      setmodalVisible(!modalVisible);
                    }}>
                    <ReactPlayer
                      className='previewDiv'
                      // controls

                      width='100%'
                      height='225px'
                    />
                  </div>
                ) : (
                  <>
                    <img
                      src={
                        upoadlImage && upoadlImage.Location
                          ? upoadlImage.Location
                          : "/noimg.png"
                      }
                      alt={name}
                      className='img img-fluid'
                    />
                  </>
                )}
                {loading ? (
                  <div className='d-flex justify-content-center '>
                    <LoadingOutlined />
                  </div>
                ) : (
                  <Button
                    block
                    shape='round'
                    className='mb-2'
                    //icon
                    disabled={loading}
                    // stateUser === instructor._id
                    //     ? edithandler
                    //     :
                    // stateUser === instructor._id
                    //   ? "edit"
                    onClick={paid ? handlerEnrollPaid : handlerEnrollFree}>
                    {user
                      ? checkEnrolled.status
                        ? "Dashboard"
                        : "Enroll"
                      : "Login to enroll"}
                    {/* {} */}
                  </Button>
                )}
                <p> show course image</p>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCourseCard;
