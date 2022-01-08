import React, { useEffect, useState } from "react";
import axios from "axios";

import { Tag } from "antd";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import BlogImage from "./../../components/BlogImage";
const SinglePost = () => {
  const router = useRouter();
  const { singleList } = router.query;
  console.log(singleList);
  const [posts, setPost] = useState([]);

  const loadPosts = async () => {
    const { data } = await axios.get(`/api/post/${singleList}`);
    setPost(data);
  };
  useEffect(() => {
    loadPosts();
  }, [singleList]);
  console.log(posts);
  return (
    <>
      {posts && (
        <div className='container-fluid'>
          {/* full width row for heading */}
          <div className='row'>
            <div className='col pt-3'>
              <h1>{posts.title}</h1>
              <p>
                <small className='text-muted'>
                  {posts.postedBy ? posts.postedBy.name : ""}
                  {new Date(posts.updatedAt).toLocaleDateString()}
                </small>
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-8 single-post'>
              <hr />
              <ReactMarkdown
                source={posts.body}
                renderers={{ image: BlogImage }}
                className='lead single-post'>
                {posts.body}
              </ReactMarkdown>

              {posts.categoryType &&
                posts.categoryType.map((detail) => (
                  <Tag key={detail}>{detail}</Tag>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
