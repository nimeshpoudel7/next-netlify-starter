import React, { useEffect, useState } from "react";
import axios from "axios";
import MentorSvg from "../../components/BlogAndCourse/index";
import { Row, Col, Card } from "antd";
import CourseCard from "./../../components/cards/CourseCard";
import Link from "next/link";
import { Badge } from "antd";
import { Formatter } from "../../utils/helper";
const CourseList = ({ list }) => {
  // const [list, setList] = useState([]);
  // useEffect(() => {
  //   getAllCourses();
  // }, []);
  // const getAllCourses = async () => {
  //   const { data } = await axios.get("/api/courses");
  //   setList(data);
  // };

  return (
    <div className='container fluid'>
      <div
        className='container fluid maxWidthHold'
        style={{
          borderRadius: "0 0 1em 1em",
          backgroundColor: "#EFEBF5",
          padding: "1em 0",
        }}>
        <span
          style={{
            marginTop: "1.2em",
            marginLeft: "1.5em",
            color: "rgba(10, 3, 60, 0.6)",
          }}>
          <Link
            href='/'
            style={{
              textDecoration: "none",
              color: "rgba(10, 3, 60, 1)",
            }}>
            <a>Home</a>
          </Link>
          / Our Mentors
        </span>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "50px",
          }}>
          <h1
            style={{
              width: "25%",
              color: "#0A033C",
              fontWeight: "500",
            }}>
            Eduvi has the qualified mentor
          </h1>
          <MentorSvg />
        </div>
      </div>
      <div className=' maxWidthHold'>
        <div
          style={{
            margin: "2em 0",
            display: "flex",
            gap: "1.2em",
            justifyContent: "center",
          }}>
          <span className='mentorBtn mentorBtnActive'>All Mentors</span>
          <span className='mentorBtn'>For Kindergarten</span>
          <span className='mentorBtn'>For high school</span>
          <span className='mentorBtn'>For college</span>
          <span className='mentorBtn'>For Technology</span>
        </div>

        {list && (
          <div
            style={{
              display: "flex",
              gap: "2em",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
            {list.map((details) => (
              <div
                key={details._id}
                // className=' hover-shadow'
                style={{
                  width: "254px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "15px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.6em",
                  padding: "1em 0 2em 0",
                }}>
                <img
                  src={
                    details?.upoadlImage && details?.upoadlImage.Location
                      ? details?.upoadlImage.Location
                      : "/noimg.png"
                  }
                  alt='mentor'
                  style={{
                    width: "130px",
                    height: "130px",
                    borderRadius: "60px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}>
                  <span
                    style={{
                      color: "#0A033C",
                      fontWeight: "500",
                    }}>
                    {details?.name && details?.name.substring(0, 160)}
                  </span>
                  <span>
                    {details?.CategoryType &&
                      details?.CategoryType.map((detailsaa, idx) => (
                        <Badge
                          key={idx}
                          count={detailsaa}
                          style={{ backgroundColor: "#03a9f4" }}
                        />
                      ))}
                  </span>

                  <span>Total Lesson {details?.lessons.length}</span>

                  <span
                    style={{
                      color: "#5D5A6F",
                      fontSize: ".9rem",
                    }}>
                    <p>by {details?.instructor.name}</p>
                  </span>
                </div>
                <Link
                  href={`/course/${details?.subTitle}`}
                  style={{
                    textDecoration: "none",
                  }}>
                  <span
                    className='mentorCardBtn'
                    style={{
                      color: "#9C4DF4",
                      padding: ".5em 1.5em",
                      border: "1px solid #9C4DF4",
                      borderRadius: "5px",
                      fontWeight: "500",
                    }}>
                    Enroll{" "}
                    {details?.paid
                      ? Formatter({
                          amount: details?.price,
                          currency: "usd",
                        })
                      : "Free"}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.URL}/courses`);

  return {
    props: {
      list: data,
    },
  };
}

export default CourseList;
