import { Card, Badge } from "antd";
import Link from "next/link";

const { Meta } = Card;

const PostCard = ({ post }) => {
  // destructure
  const { title, subTitle, categoryType, postedBy, upoadlImage } = post;
  return (
    <>
      <Link href={`/post/${subTitle}`}>
        <a>
          <Card
            hoverable
            // style={{ height: "320px" }}
            className='mb-4'
            cover={
              <img
                src={
                  upoadlImage && upoadlImage.Location
                    ? upoadlImage.Location
                    : "/noimg.png"
                }
                alt={title}
                style={{ height: "100px", objectFit: "contain" }}
                className='p-1'
              />
            }>
            <h2 className='h4 fontWeight-bold text-dark'>
              {title && title.substring(0, 160)}
            </h2>
            <p>by {postedBy.name}</p>

            {/* {categories.map((c) => (
              <Badge
                key={c._id}
                count={c.name}
                style={{ backgroundColor: "#03a9f4" }}
                className='pb-2 mr-2'
              />
            ))} */}
          </Card>
        </a>
      </Link>
    </>
  );
};

export default PostCard;
