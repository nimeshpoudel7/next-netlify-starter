import { useContext, useEffect, useState } from "react";

import { Context } from "../../context";
import UserRoute from "./../../components/routes/UserRoute";
import axios from "axios";
import { Avatar, Progress } from "antd";
import Link from "next/link";
import { SyncOutlined, PlayCircleFilled } from "@ant-design/icons";
import course from "../../../server/models/course";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState([]);
  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    const { data } = await axios.get(`/api/user-courses`);
    // console.log(data);
    setCourses(data.courses);
    setComplete(data.list);
  };
  console.log(courses);
  console.log(complete);
  const arr = [];
  for (let i = 0; i < courses.length; i++) {
    for (let j = 0; j < complete.length; j++) {
      if (courses[i]._id === complete[j].course) {
        arr.push(complete[j].lessons.length);
      } else {
        // arr.push(0);
      }
    }
  }
  console.log(arr);

  const getSubscribers = (courses, complete) => {
    let userWithSubscriptionArray = [];

    courses.map((course) => {
      let markAsCompleted = [];

      complete.map((s) => {
        if (course._id === s.course) {
          markAsCompleted.push(s);
        }
      });

      course.markAsCompleted = markAsCompleted;

      userWithSubscriptionArray.push(course);
    });

    return userWithSubscriptionArray;
  };
  const mapping = getSubscribers(courses, complete);
  console.log("ss", mapping);
  return (
    <UserRoute>
      <h1 className='jumbotron text-center square'>User dashboard</h1>
      {!courses.length && (
        <>
          <p className='lead'> You have'nt bought any course</p>
          <Link href='/allcourse'>
            <a className='btn btn-primary  mt-2'>Look Courses</a>
          </Link>
        </>
      )}

      {loading && (
        <SyncOutlined
          spin
          className='d-flex justify-content-center display-1 text-primary p-5'
        />
      )}
      {courses &&
        mapping.map((course) => (
          <div className='media pb-1 mb-3' key={course._id}>
            <Avatar
              size={80}
              src={
                course?.upoadlImage && course?.upoadlImage?.Location
                  ? course.upoadlImage?.Location
                  : "/noimg.png"
              }
            />
            <div className='media-body pl-2'>
              <div className='row'>
                <div className='col'>
                  <Link
                    href={`/user/course/${course.subTitle}`}
                    className='pointer'>
                    <a>
                      <h5 className='mt-2 text-primary'>{course.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons.length} Lessons
                  </p>
                  <p
                    className='text-muted'
                    style={{ marginTop: "-15px", fontSize: "12px" }}>
                    By {course.instructor.name}
                  </p>
                </div>
                <div className='col-md-3 mt-3 text-center'>
                  <Progress
                    type='circle'
                    percent={
                      course?.markAsCompleted[0]?.lessons?.length
                        ? `${
                            (course?.markAsCompleted[0]?.lessons?.length /
                              course?.lessons?.length) *
                            100
                          }`
                        : 0
                    }
                    width={40}
                  />
                  <pre></pre>
                </div>
                <div className='col-md-3 mt-3 text-center'>
                  <Link
                    href={`/user/course/${course.subTitle}`}
                    className='pointer'>
                    <a>
                      <PlayCircleFilled className='h2 pointer text-primary' />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </UserRoute>
  );
};

export default UserIndex;
