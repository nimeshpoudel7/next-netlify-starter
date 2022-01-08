import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { useState, useEffect } from "react";
import { Avatar, Tooltip } from "antd";

import moment from "moment";
import Link from "next/link";
import { CloudServerOutlined, CloudUploadOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [fetchCourses, setFetchCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);
  const DetailsCointain = { fontSize: "10px" };

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courseList");
    setFetchCourses(data);
  };
  return (
    <InstructorRoute>
      <h1 className='jumbotron text-center square p-4 shadow-4 rounded-3'>
        Instructor Dashboard
      </h1>
      <p>Total number of Course is {fetchCourses.length}</p>
      {fetchCourses &&
        fetchCourses.map((details, index) => {
          return (
            <>
              <div className='media pt-2 mb-3' key={index}>
                <Avatar
                  size={80}
                  src={
                    details.upoadlImage
                      ? details.upoadlImage.Location
                      : "/noimg.png"
                  }
                />

                <div className='media-body pl-2 ' key={index}>
                  <div className='row'>
                    <div className='col'>
                      <Link
                        href={`/instructor/course/list/${details.subTitle}`}
                        className='pointer'>
                        <a className='mt-2 text-primary'>
                          <h5 className='pt-2'>{details.name} </h5>
                        </a>
                      </Link>
                      <div
                        style={{ marginTop: "-7px" }}
                        className='d-flex justify-content-between'>
                        {` ${details.lessons.length} Lessons`}
                        <div>
                          {` Last Update at 
                       ${moment
                         .utc(details.updatedAt)
                         .local()
                         .startOf("seconds")
                         .fromNow()}`}
                        </div>
                      </div>
                      {details.lessons.length < 5 ? (
                        <p style={DetailsCointain} className='text-danger'>
                          Please Add at least 5 lesson
                        </p>
                      ) : details.published ? (
                        <p style={DetailsCointain} className='text-success'>
                          Published
                        </p>
                      ) : (
                        <p style={DetailsCointain} className='text-success'>
                          This course is ready to Published
                        </p>
                      )}
                    </div>
                    <div className='col-md-3 mt-3 text-center'>
                      {details.published ? (
                        <Tooltip title='Published' color='success'>
                          <CloudServerOutlined
                            key={index}
                            className='h5 pointer text-success'
                          />
                        </Tooltip>
                      ) : (
                        <Tooltip title='Un-Published' color='danger'>
                          <CloudUploadOutlined
                            key={index}
                            className='h5 pointer text-danger'
                          />
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
    </InstructorRoute>
  );
};

export default InstructorIndex;
