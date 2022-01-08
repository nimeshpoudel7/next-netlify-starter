import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./../components/cards/PostCard";
import Link from "next/link";
import MentorSvg from "./../components/BlogAndCourse/index";
import { Badge } from "antd";

const Post = () => {
  const [posts, setPost] = useState([]);
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const { data } = await axios.get("/api/blogs");
    setPost(data);
  };
  console.log(posts);
  return (
    <div className='container fluid'>
      <div
        className='container fluid  maxWidthHold'
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
      {/*contain  */}
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
        {/* box */}
        {posts && (
          <div
            style={{
              display: "flex",
              gap: "2em",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
            {posts.map((details) => (
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
                    {details?.title && details?.title.substring(0, 160)}
                  </span>
                  <span>
                    {details?.categoryType &&
                      details?.categoryType.map((detailsaa, idx) => (
                        <Badge
                          key={idx}
                          count={detailsaa}
                          style={{ backgroundColor: "#03a9f4" }}
                        />
                      ))}
                  </span>
                  <span
                    style={{
                      color: "#5D5A6F",
                      fontSize: ".9rem",
                    }}>
                    <p>by {details?.postedBy.name}</p>
                  </span>
                </div>
                <Link
                  href={`/post/${details?.subTitle}`}
                  style={{
                    textDecoration: "none",
                  }}>
                  <span
                    className='mentorCardBtn'
                    style={{
                      color: "#703EDB",
                      padding: ".5em 1.5em",
                      border: "1px solid #703EDB",
                      borderRadius: "5px",
                      fontWeight: "500",
                    }}>
                    Read
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* <div className='col-md-4'>
        <PostCard post={details} />
      </div> */}
    </div>
  );
};

export default Post;
