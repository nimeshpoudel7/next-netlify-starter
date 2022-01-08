import { Card, Badge } from "antd";
import Link from "next/link";
import { Formatter } from "./../../utils/helper";

const CourseCard = ({ details }) => {
  const { Meta } = Card;
  ///desctructing
  const {
    _id,
    name,
    instructor,
    price,
    upoadlImage,
    CategoryType,
    subTitle,
    paid,
    lessons,
  } = details;
  return (
    <Link href={`/course/${subTitle}`}>
      <a>
        <Card
          className='mb-4 border border-2'
          cover={
            <img
              src={
                upoadlImage && upoadlImage.Location
                  ? upoadlImage.Location
                  : "/noimg.png"
              }
              alt={name}
              style={{ height: "200px", objectFit: "contain" }}
              className='p-1'
            />
          }>
          <center>
            <h2 className='h4 fontWeight-bold'>{name}</h2>
            <p>Total Lesson {lessons.length}</p>
            <p>by {instructor.name}</p>

            {CategoryType.map((c) => (
              <Badge
                key={c}
                count={c}
                style={{ backgroundColor: "#03a9f4" }}
                className='pb-2 mr-2'
              />
            ))}
          </center>
          <h4 className='pt-2'>
            {paid
              ? Formatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;

//  <Card title='Card title' style={{ width: 300 }}>
//    <p>Card content</p>
//    <p>Card content</p>
//    <p>Card content</p>
//  </Card>;
