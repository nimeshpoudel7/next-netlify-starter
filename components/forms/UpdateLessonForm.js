import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Row, Col, Switch } from "antd";
import ReactPlayer from "react-player";
const UpdateLessonForm = ({
  currentLesson,
  setCurrentLesson,
  handlerLessonUpdate,
  handlerVideo,
  videoBtnText,
  progressBar,
  uploading,
  handleChangeLesson,
}) => {
  return (
    <div className='container pt-3'>
      {/* <pre>{JSON.stringify(currentLesson, null, 4)}</pre> */}
      <form onSubmit={handlerLessonUpdate}>
        <input
          type='text'
          name='lessonName'
          className='form-control square'
          onChange={handleChangeLesson}
          value={currentLesson.lessonName}
          autoFocus
          required
        />

        <textarea
          className='form-control mt-3'
          cols='7'
          rows='7'
          name='content'
          onChange={handleChangeLesson}
          value={currentLesson.content}
          placeholder='Content'></textarea>
        <div>
          {!uploading &&
            currentLesson.videoURL &&
            currentLesson.videoURL.Location && (
              <div className='pt-2 d-flex justify-content-center'>
                <ReactPlayer
                  url={currentLesson.videoURL.Location}
                  controls
                  width='450px'
                  height='250px'
                  config={{
                    file: {
                      attributes: {
                        controlsList: "nodownload", //<- this is the important bit
                      },
                    },
                  }}></ReactPlayer>
              </div>
            )}
          <label className='btn btn-dark btn-block text-left mt-3'>
            {videoBtnText}
            <input
              onChange={handlerVideo}
              type='file'
              accept='video/*'
              hidden
            />
          </label>
        </div>

        {progressBar > 0 && (
          <Progress
            className='d-flex justify-content-center pt-2'
            type='circle'
            percent={progressBar}
          />
        )}
        <Row>
          <Col>
            <span className='badge'> free previe</span>
            <Switch
              disabled={uploading}
              checked={currentLesson.previewCheck}
              name='previewCheck'
              onChange={(detail) =>
                setCurrentLesson({ ...currentLesson, previewCheck: detail })
              }
            />
          </Col>
        </Row>
        <Button
          onClick={handlerLessonUpdate}
          className=' mt-3'
          size='large'
          type='primary'
          loading={uploading}
          shape='round'>
          Save
        </Button>
      </form>
    </div>
  );
};

export default UpdateLessonForm;
