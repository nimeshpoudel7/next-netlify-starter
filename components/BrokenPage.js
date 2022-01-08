import React, { useState } from "react";
import { Card, Result, Button } from "antd";

const BrokenPage = () => {
  const { Meta } = Card;

  const [show, setShow] = useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [show]);

  if (!show) return null;

  return (
    <>
      <Card
        hoverable
        style={{ backgroundColor: "#6852D9" }}
        className='text-white'>
        <Result
          className='text-white'
          status='404'
          title='404'
          subTitle='Sorry, the page you visited does not exist.'
        />
      </Card>
    </>
  );
};
export default BrokenPage;
