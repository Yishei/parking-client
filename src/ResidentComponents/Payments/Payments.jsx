import React from "react";
import { Button, Card } from "antd";
import "./Payments.css";

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 200,
  },
  {
    title: "Memo",
    dataIndex: "memo",
    width: 400,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: 200,
  },
  {
    title: "Balance",
    dataIndex: "balance",
    width: 200,
  },
];

const data = [];
for (let i = 0; i < 25; i++) {
  data.push({
    key: i,
    date: new Date().toLocaleString(),
    memo: `Payment or Charge ${i + 1}`,
    amount: `$150.00`,
    balance: `$380.00`,
  });
}

const Payments = () => {
  return (
    <div className="payments-container">
      <div className="main-card-container">
        <div>
          <Card
            size="small"
            title={
              <div className="info-container">
                <div className="index">#</div>
                <div className="title-info">{columns[0].title}</div>
                <div className="title-info">{columns[1].title}</div>
                <div className="title-info">{columns[2].title}</div>
                <div className="title-info">{columns[3].title}</div>
              </div>
            }
            hoverable={true}
          >
            <div className="inner-card-container">
              {data.map((item, index) => (
                <div key={index} className="info-container">
                  <div className="index-info">
                    <div>{index + 1}.</div>
                  </div>
                  <div className="payment-info">
                    <div>{item.date}</div>
                  </div>
                  <div className="payment-info">
                    <div>{item.memo}</div>
                  </div>
                  <div className="payment-info">
                    <div>{item.amount}</div>
                  </div>
                  <div className="payment-info">
                    <div>{item.balance}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="side-container">
        <div style={{ width: "100%" }}>
          <div className="make-payment-container">
            Current Balance
            <div className="current-balance">$380.00</div>
            <div className="make-payment-inner">
              <Button type="primary" block className="make-payment-btn">
                Make payment
              </Button>
              <div className="autopay-container">
                <Button block className="autopay-btn">
                  Set up autopay
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="latefee-container">
            <h3>Late fee policy</h3>
            Payment is due on the 1st of the month. If payment isn't received, a
            one-time fee of "$15.00" will be charged on the 15th of each month.
            Late fees will only be charged for outstanding balances of "$483.00"
            or more.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payments;
