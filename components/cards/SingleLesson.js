import { Col, Row, List, Avatar } from "antd";

const SingleLesson = ({
  lessons,
  setCheckprev,
  modalVisible,
  setmodalVisible,
}) => {
  const { Item } = List;
  return (
    <div className='px-5'>
      <Row>
        <Col className='list-lessons' span={24}>
          {lessons && <h4>{lessons.length} Lessons</h4>}
          <hr />
          <List
            itemLayout='horizontal'
            dataSource={lessons}
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.lessonName}
                />
                {item.videoURL && item.videoURL !== null && item.previewCheck && (
                  <span
                    className='text-primary pointer'
                    onClick={() => {
                      setCheckprev(item.videoURL.Location);
                      setmodalVisible(!modalVisible);
                    }}>
                    Free Preview
                  </span>
                )}
              </Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default SingleLesson;
