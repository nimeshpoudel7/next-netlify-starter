import Link from "next/link";
import {
  FacebookFilled,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import styles from "../public/styles/Footer.module.css";
const Footer = () => (
  <div
    className=' container fluid maxWidthHold'
    style={{
      marginBottom: "50px",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
    }}>
    <div>
      <span
        style={{
          color: "#0A033C",
          fontSize: "2rem",
          fontWeight: "500",
        }}>
        Elearn
      </span>
      <div
        style={{
          display: "flex",
          gap: "1em",
          margin: "1.5em 0",
          color: "black",
          fontSize: "20px",
        }}>
        <FacebookOutlined size='lg' />
      </div>
      <p
        style={{
          color: "#5D5A6F",
          marginTop: "2em",
        }}>
        ©2021 Eduvi.co
      </p>
      <p
        style={{
          color: "#5D5A6F",
          width: "200px",
          marginTop: "1em",
          lineHeight: "1.5em",
        }}>
        Eduvi is a registered trademark of Eduvi.co
      </p>
    </div>
    <ul className={styles.footerList}>
      Courses
      <li>Classroom courses</li>
      <li>Virtual classroom courses</li>
      <li>E-learning courses</li>
      <li>Video Courses</li>
      <li>Offline Courses</li>
    </ul>
    <ul className={styles.footerList}>
      Community
      <li>Learners</li>
      <li>Parteners</li>
      <li>Developers</li>
      <li>Transactions</li>
      <li>Blog</li>
      <li>Teaching Center</li>
    </ul>
    <ul className={styles.footerList}>
      Quick links
      <li>Home</li>
      <li>Professional Education</li>
      <li>Courses</li>
      <li>Admissions</li>
      <li>Testimonial</li>
      <li>Programs</li>
    </ul>
    <ul className={styles.footerList}>
      More
      <li>Press</li>
      <li>Investors</li>
      <li>Terms</li>
      <li>Privacy</li>
      <li>Help</li>
      <li>Contact</li>
    </ul>
  </div>
);

export default Footer;
