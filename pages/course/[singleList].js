import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";

import SingleCourseCard from "./../../components/cards/SingleCourse";
import CoursePreview from "./../../components/modal/CoursePreview";
import SingleLesson from "./../../components/cards/SingleLesson";
import { Context } from "../../context";
import { toast } from "react-toastify";
import BrokenPage from "../../components/BrokenPage";

const SingleCourse = ({ list }) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [checkprev, setCheckprev] = useState("");
  const [stateUser, setStateUser] = useState("");
  const [checkEnrolled, setCheckEnrolled] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { singleList } = router.query;
  const { state } = useContext(Context);
  const { user } = state;

  useEffect(() => {
    if (user != null) {
      setStateUser(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (user && list) {
      getEnrollementDetails();
    }
  }, [user && list]);
  const getEnrollementDetails = async () => {
    const { data } = await axios.get(`/api/enrollmentChecked/${list._id}`);
    console.log("EnrollementDetails", data);
    setCheckEnrolled(data);
  };
  const handlerEnrollFree = async (e) => {
    try {
      e.preventDefault();
      if (checkEnrolled.status) {
        return router.push(`/user/course/${checkEnrolled.course.subTitle}`);
      }
      if (user === null) return router.push("/login");

      setLoading(true);
      const { data } = await axios.post(`/api/enrollment-free/${list._id}`);

      toast.success(data.message);
      setLoading(false);
      // console.log(data.course.subTitle);
      router.push(`/user/course/${data.course.subTitle}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to enroll");
    }
  };
  const handlerEnrollPaid = async (e) => {
    // console.log("handle paid enrollment");
    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      if (checkEnrolled.status)
        return router.push(`/user/course/${checkEnrolled.course.subTitle}`);
      const { data } = await axios.post(`/api/enrollment-paid/${list._id}`);
      const stripe = await loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_KEY}`);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast("Enrollment failed, try again.");
      console.log(err);
      setLoading(false);
    }
  };

  // console.log(singleList);
  //st [posts, setPost] = useState([]);

  // const loadPosts = async () => {
  //   const { data } = await axios.get(`/api/videos/${singleList}`);
  //   setPost(data);
  // };
  // useEffect(() => {
  //   loadPosts();
  // }, [singleList]);

  return (
    <>
      {!list ? (
        <BrokenPage />
      ) : (
        <>
          <SingleCourseCard
            list={list}
            setCheckprev={setCheckprev}
            checkprev={checkprev}
            setmodalVisible={setmodalVisible}
            modalVisible={modalVisible}
            user={user}
            loading={loading}
            stateUser={stateUser}
            handlerEnrollFree={handlerEnrollFree}
            handlerEnrollPaid={handlerEnrollPaid}
            checkEnrolled={checkEnrolled}
            setCheckEnrolled={setCheckEnrolled}
          />
          {modalVisible ? (
            <CoursePreview
              checkprev={checkprev}
              setmodalVisible={setmodalVisible}
              modalVisible={modalVisible}
            />
          ) : null}
          {list && list.lessons && (
            <SingleLesson
              lessons={list.lessons}
              setCheckprev={setCheckprev}
              modalVisible={modalVisible}
              setmodalVisible={setmodalVisible}
            />
          )}
        </>
      )}
    </>
  );
};
export async function getServerSideProps({ query: { singleList } }) {
  const { data } = await axios.get(`${process.env.URL}/course/${singleList}`);

  return {
    props: {
      list: data,
    },
  };
}

export default SingleCourse;
