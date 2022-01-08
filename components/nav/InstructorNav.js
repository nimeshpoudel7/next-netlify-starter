import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge } from "antd";
import axios from "axios";

const InstructorNav = () => {
  const [active, setactive] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    process.browser && setactive(window.location.pathname);
    // console.log(process.browser && window.location.pathname);
  }, [process.browser && window.location.pathname]);
  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const { data } = await axios.get(`/api/instructor/question-count`);
    setCount(data);
  };
  return (
    <div className='nav flex-column nav-pills sidebar'>
      <Link href='/instructor'>
        <a
          className={`nav-link ${
            active === "/instructor" && "active" && "navtext"
          }`}>
          Dashboard
        </a>
      </Link>
      <Link href='/instructor/course/create'>
        <a
          className={`nav-link ${
            active === "/instructor/course/create" && "active" && "navtext"
          }`}>
          course Create
        </a>
      </Link>
      <Link href='/blog'>
        <a className={`nav-link ${active === "/blog" && "active"}`}>
          Blog Dashboard
        </a>
      </Link>

      <Link href='/blog/post/create'>
        <a className={`nav-link ${active === "/blog/post/create" && "active"}`}>
          Write a post
        </a>
      </Link>
      <Link href='/instructor/earning'>
        <a
          className={`nav-link ${
            active === "/instructor/earning" && "active"
          }`}>
          Earning
        </a>
      </Link>
      <Link href='/instructor/question-answer'>
        <a
          className={`nav-link ${
            active === "/instructor/question-answer" && "active"
          }`}>
          <Badge count={count} offset={[21, 7]}>
            Q&A
          </Badge>
        </a>
      </Link>
    </div>
  );
};

export default InstructorNav;
