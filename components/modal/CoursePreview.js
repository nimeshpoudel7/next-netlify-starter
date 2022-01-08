import { Modal } from "antd";
import React from "react";
import ReactPlayer from "react-player";

const CoursePreview = ({ checkprev, modalVisible, setmodalVisible }) => {
  return (
    <>
      <Modal
        title={`Course Preview Demo`}
        visible={modalVisible}
        centered
        onCancel={() => setmodalVisible(!modalVisible)}
        footer={null}>
        <div>
          <ReactPlayer
            url={checkprev}
            playing={modalVisible}
            controls
            width='100%'
            height='100%'
          />
        </div>
      </Modal>
    </>
  );
};

export default CoursePreview;
