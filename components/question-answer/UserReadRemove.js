import { useContext } from "react";
import { Button, Modal, Card, Tooltip, Avatar } from "antd";
import {
  SyncOutlined,
  EditOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
  RightCircleOutlined,
  CommentOutlined,
  PlusCircleFilled,
  EditFilled,
  DeleteFilled,
  CheckCircleFilled,
  CloseCircleFilled,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import { Context } from "../../context";

import MarkdownCheetsheet from "../modal/MarkdownCheatsheet";
import Link from "next/link";

const { Meta } = Card;

const UserReadRemove = ({
  visible,
  setVisible,
  values,
  setValues,
  handleCreatePost,
  qas = [],
  handleQaDelete,
  handleQaEdit,
  handleAddAnswer,
  handleEditAnswer,
  handleDeleteAnswer,
  markdownCheetsheetModal,
  setMarkdownCheetsheetModal,
  markQaAsResolved,
  markQaAsNotResolved,
  instructor = false,
  handleDeleteAnswerByInstructor,
  handleQaDeleteByInstructor,
  markQaAsResolvedByInstructor,
  markQaAsNotResolvedByInstructor,
}) => {
  // state
  const {
    state: { user },
  } = useContext(Context);

  return (
    <>
      <div className='row'>
        {qas.map((q) => (
          <div key={q._id} className='col-md-12 pb-4'>
            <div className='d-flex mb-2'>
              <Avatar
                size={40}
                shape='square'
                src={
                  q.courseId && q.courseId.image
                    ? q.courseId.image.Location
                    : "/course.png"
                }
              />
              <span className='pl-2 pt-1'>
                Question in{" "}
                <Link href={`/user/course/${q.courseId.singleList}`}>
                  <a>
                    <i>{q.courseId && q.courseId.name}</i>
                  </a>
                </Link>
              </span>
            </div>

            {/* <div className="p-3" style={{ backgroundColor: "#f2f2f2" }}> */}
            <div className='p-3'>
              <div className='d-flex pb-3'>
                <Avatar>
                  <span>
                    {q.postedBy && q.postedBy.name && q.postedBy.name[0]}
                  </span>
                </Avatar>{" "}
                <span className='pl-2 pt-1'>{q.postedBy.name}</span>
                <span className='pl-2 pt-1'>
                  {new Date(q.createdAt).toLocaleDateString()}
                </span>
                <span className='pt-1 ml-auto'>
                  {q.answers && q.answers.length + " answers"}
                </span>
              </div>

              <h5>{q.title}</h5>

              <ReactMarkdown
                children={q.description}
                // renderers={{ code: CodeBlock }}

                className='single-post'
              />

              {q.postedBy && user && user._id === q.postedBy ? (
                <div
                  className='d-flex justify-content-around pt-3'
                  style={{ borderTop: "1px solid #e6e6e6" }}>
                  <Tooltip title='Add answer'>
                    <PlusCircleFilled
                      onClick={() => handleAddAnswer(q)}
                      className='text-success'
                    />
                  </Tooltip>
                  <Tooltip onClick={() => handleQaEdit(q)} title='Edit'>
                    <EditFilled className='text-warning' />
                  </Tooltip>
                  <Tooltip onClick={() => handleQaDelete(q)} title='Delete'>
                    <DeleteFilled className='text-danger' />
                  </Tooltip>
                  <Tooltip
                    onClick={() =>
                      q.resolved ? markQaAsNotResolved(q) : markQaAsResolved(q)
                    }
                    title={q.resolved ? "Mark unresolved" : "Mark resolved"}>
                    {q.resolved ? (
                      <CloseCircleFilled className='text-info' />
                    ) : (
                      <CheckCircleFilled className='text-info' />
                    )}
                  </Tooltip>
                </div>
              ) : instructor ? (
                <div className='d-flex justify-content-around pt-3'>
                  <Tooltip title='Add answer'>
                    <PlusCircleFilled
                      onClick={() => handleAddAnswer(q)}
                      className='text-success'
                    />
                  </Tooltip>

                  <Tooltip
                    onClick={() => handleQaDeleteByInstructor(q)}
                    title='Delete'>
                    <DeleteFilled className='text-danger' />
                  </Tooltip>

                  <Tooltip
                    onClick={() =>
                      q.resolved
                        ? markQaAsNotResolvedByInstructor(q)
                        : markQaAsResolvedByInstructor(q)
                    }
                    title={q.resolved ? "Mark unresolved" : "Mark resolved"}>
                    {q.resolved ? (
                      <CloseCircleFilled className='text-info' />
                    ) : (
                      <CheckCircleFilled className='text-info' />
                    )}
                  </Tooltip>
                </div>
              ) : (
                ""
              )}
            </div>
            {/* answers / comments */}
            {q.answers &&
              q.answers.map((a) => (
                <Card
                  // style={{ backgroundColor: "#fcfdff" }}
                  key={a._id}
                  actions={
                    a.postedBy && user && user._id === a.postedBy._id
                      ? [
                          <Tooltip title='Edit answer'>
                            <EditOutlined onClick={() => handleEditAnswer(a)} />
                          </Tooltip>,
                          <Tooltip title='Delete answer'>
                            <DeleteOutlined
                              onClick={() => handleDeleteAnswer(a)}
                            />
                          </Tooltip>,
                        ]
                      : instructor
                      ? [
                          <Tooltip title='Delete answer'>
                            <DeleteOutlined
                              onClick={() => handleDeleteAnswerByInstructor(a)}
                            />
                          </Tooltip>,
                        ]
                      : []
                  }>
                  <Meta
                    avatar={<CommentOutlined />}
                    title={`By ${a.postedBy && a.postedBy.name} ${new Date(
                      q.createdAt,
                    ).toLocaleDateString()}`}
                    description={
                      <ReactMarkdown
                        children={a.content}
                        // renderers={{ code: CodeBlock }}
                        className='single-post'
                      />
                    }
                  />
                </Card>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserReadRemove;
