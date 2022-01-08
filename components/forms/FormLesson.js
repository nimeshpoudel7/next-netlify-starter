import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Progress, Tooltip } from "antd";

const FormLesson = ({
  lessonValue,
  setLessonValue,
  handleChange,
  handlerVideo,
  btntext,
  progressBar,
  uploading,
  handleSubmit,
  handleRemoveVideo,
}) => {
  return (
    <div className='container pt-3'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='lessonName'
          className='form-control square'
          onChange={handleChange}
          value={lessonValue.lessonName}
          placeholder='Title'
          autoFocus
          required
        />

        <textarea
          className='form-control mt-3'
          cols='7'
          rows='7'
          name='content'
          onChange={handleChange}
          value={lessonValue.content}
          placeholder='Content'></textarea>
        <div className='d-flex justify-content-center'>
          <label className='btn btn-dark btn-block text-left mt-3'>
            {btntext}
            <input
              onChange={handlerVideo}
              type='file'
              accept='video/*'
              hidden
            />
          </label>
          {!uploading && lessonValue.videoURL.Location && (
            <Tooltip title='Delete'>
              <span onClick={handleRemoveVideo} className='pt-1 pl-3'>
                <CloseCircleFilled className='text-danger d-flex justify-content-center pt-4 pointer' />
              </span>
            </Tooltip>
          )}
        </div>

        {progressBar > 0 && (
          <Progress
            className='d-flex justify-content-center pt-2'
            type='circle'
            percent={progressBar}
          />
        )}

        <Button
          onClick={handleSubmit}
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

export default FormLesson;
