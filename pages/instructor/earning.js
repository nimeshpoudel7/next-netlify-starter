import { useState, useEffect, useContext } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Context } from "../../context";
import { Avatar, Row, Col } from "antd";
import { FormatterBlc } from "./../../utils/helper";
import { SyncOutlined } from "@ant-design/icons";

const Earning = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getblanceData();
  }, []);
  const getblanceData = async () => {
    try {
      console.log("send balance request");
      const { data } = await axios.get(`/api/instructor/balance`);
      console.log(data);
      setBalance(data);
    } catch (error) {}
  };
  const handlePayout = async () => {
    try {
      setLoading(true);
      let { data } = await axios.get("/api/instructor/withdraw");
      console.log(data);
      setLoading(false);
      const newWindow = window.open(data, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
      // window.location.href = data;
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Unable to access payout settings. Try again.");
    }
  };

  return (
    <InstructorRoute>
      <h2 className='jumbotron text-center square p-3 mt-2 left-bottom-radius'>
        Revenue
      </h2>

      <Row align='middle' justify='center'>
        <Col className='mt-xs-4'>
          <h2>
            Revenue Report{" "}
            <Avatar size={50} className=' offset-md-4' src='/earning.png' />
          </h2>
          <h4>
            Available Balance{" "}
            {balance.available &&
              balance.available.map((details, i) => (
                <span key={i} className=''>
                  {FormatterBlc(details)}
                </span>
              ))}
          </h4>
          <br />
          <small>
            You get paid directly from stripe to your bank account, every 2
            days.
          </small>
        </Col>
      </Row>
      <Row align='middle' justify='space-between'>
        <Col className='mt-3'>
          <h2>
            Pending Balance{" "}
            <Avatar size={50} className=' offset-md-4' src='/hourglass.png' />
          </h2>
          <h4>
            Pending Balance
            {balance.pending &&
              balance.pending.map((details, i) => (
                <span key={i} className='float-right'>
                  {FormatterBlc(details)}
                </span>
              ))}
            <br />
          </h4>
          <small>Your Pending Balance.</small>
        </Col>

        <Col className='mt-3'>
          <h2>
            Payouts
            {!loading ? (
              <Avatar
                size={50}
                className=' offset-md-4 pointer'
                src='/atm.png'
                onClick={handlePayout}
              />
            ) : (
              <SyncOutlined
                style={{ color: "#6638C9" }}
                spin
                className=' pointer'
              />
            )}
          </h2>
          <small>
            Update your stripe account details or view previous payouts.
          </small>
        </Col>
      </Row>
    </InstructorRoute>
  );
};

export default Earning;
