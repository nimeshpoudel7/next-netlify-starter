import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminRoute from "./../../components/routes/AdminRoute";
import { Table, Tag, Space } from "antd";
const earning = () => {
  const [customer, setCustomer] = useState([]);
  const [charges, setCharges] = useState([]);
  const [user, setUser] = useState([]);
  const [accounts, setAccounts] = useState({ data: [] });

  useEffect(() => {
    getblanceData();
  }, []);
  const getblanceData = async () => {
    try {
      console.log("send balance request");
      const { data } = await axios.get(`/api/admin/balance`);
      console.log(data?.payout);
      setCharges(data?.charges?.data);
      setUser(data?.users);
      setCustomer(data?.customers?.data);
      setAccounts(data?.balance);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(accounts);
  // console.log(customer);
  // console.log(charges);
  const getSubscribers = (charges, customer) => {
    let userWithSubscriptionArray = [];

    charges?.map((charge) => {
      let markAsCompleted = [];

      customer?.map((s) => {
        if (charge.customer === s.id) {
          markAsCompleted.push(s);
        }
      });

      charge.markAsCompleted = markAsCompleted;

      userWithSubscriptionArray.push(charge);
    });

    return userWithSubscriptionArray;
  };
  const mapping = getSubscribers(charges, customer);

  const getUser = (user, mapping) => {
    let intdata = [];

    mapping.map((details) => {
      let SellerName = [];

      user.map((s) => {
        if (details.destination === s.stripe_account_id) {
          SellerName.push(s);
        }
      });

      details.SellerName = SellerName;

      intdata.push(details);
    });

    return intdata;
  };
  const mapping2 = getUser(user, mapping);

  const DataSource = () => {
    const dataw = mapping2.map((details, idx) => {
      const dataaww = details?.SellerName.map((detailSeller, indx) => {
        return {
          ToSellerName: detailSeller?.name,
          ToSelleremail: detailSeller?.email,
        };
      });
      let i = 0;
      return {
        key: details?.id,
        Seller: dataaww[0]?.ToSellerName,
        SellerEmail: dataaww[0]?.ToSelleremail,
        chargeID: details?.id,
        amount: details?.amount,
        commsision: details?.application_fee_amount,
        From: details?.billing_details?.address?.country,
        FromEmail: details?.billing_details?.email,
        Fromname: details?.billing_details?.name,
        paid: details?.paid ? "Sucess" : "Failed",
      };
    });

    return dataw;
  };
  const dataaa = DataSource();
  console.log(dataaa);

  const columns = [
    {
      title: "chargeID",
      dataIndex: "chargeID",
      key: "key",
      responsive: ["md"],
    },
    {
      title: "Seller Name",
      dataIndex: "Seller",
      key: "key",
      responsive: ["md"],
    },
    {
      title: "Seller Email",
      dataIndex: "SellerEmail",
      key: "key",
      responsive: ["md"],
    },
    {
      title: "FromEmail",
      dataIndex: "FromEmail",
      key: "key",
      responsive: ["md"],
    },
    {
      title: "Fromname",
      dataIndex: "Fromname",
      key: "key",
      responsive: ["md"],
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "key",
      responsive: ["md"],
    },
    {
      title: "commsision",
      dataIndex: "commsision",
      key: "key",
      responsive: ["md"],
    },
    {
      title: "paid",
      dataIndex: "paid",
      key: "key",
      responsive: ["md"],
    },
  ];

  return (
    <AdminRoute>
      <h4>Latest Transcation</h4>
      <Table dataSource={dataaa} columns={columns} />;
    </AdminRoute>
  );
};

export default earning;
