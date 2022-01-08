const BlogImage = (props) => {
  return (
    <img
      {...props}
      src={
        upoadlImage && upoadlImage.Location
          ? upoadlImage.Location
          : "/noimg.png"
      }
      style={{ maxWidth: "100%" }}
    />
  );
};
export default BlogImage;
