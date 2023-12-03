import { Input, Form, Button, Card, Space, InputNumber, Layout } from "antd";
import { Helmet } from "react-helmet";
import { MdAlternateEmail } from "react-icons/md";
import { MessageContext } from "../Context/MessageContext";
import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postOtp } from "../utilities/AuthFunctionality.js";
import { getOtp } from "../utilities/AuthFunctionality";
const { Footer } = Layout;

const OtpReq = () => {
  const [reqCompleted, setReqCompleted] = useState(false);
  const [email, setEmail] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());

  const [loading, setLoading] = useState(false);
  const { msg } = useContext(MessageContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const sendCode = () => {
    form
      .validateFields()
      .then(() => {
        setLoading(true);
        msg("loading", "Verifying OTP");
        setFormDisabled(true);
        const values = form.getFieldsValue();
        let otp = "";
        for (let i = 0; i < 6; i++) {
          otp += values[`digit${i}`];
        }

        console.log(otp);
        // ...
        const res = postOtp(email, otp);
        res.then((res) => {
          setLoading(false);
          console.log(res, "res");
          switch (res.status) {
            case "success":
              msg("success", "OTP Verified Successfully");
              navigate(`/resetPassword/${res.token}`);
              break;
            case "otpIncorrect":
              msg("error", "OTP Incorrect");
              form.resetFields();
              setFormDisabled(false);
              break;
            default:
              msg("error", "Error Verifying OTP");
              break;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (reqCompleted) {
      inputRefs[0].current.focus();
    }
  });

  const handlePaste = (e) => {
    e.preventDefault();
    console.log(e.clipboardData.getData("text"));
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    if (pasteArray.length === 6) {
      pasteArray.forEach((digit, index) => {
        form.setFieldsValue({ [`digit${index}`]: digit });
      });
      sendCode();
    }
  };

  const onFinish = async () => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);
        msg("loading", "Sending OTP");
        const res = getOtp(values.email);
        res.then((res) => {
          setLoading(false);
          switch (res) {
            case "success":
              msg("success", "OTP Sent Successfully");
              setEmail(values.email);
              setReqCompleted(true);
              break;
            case "userNotFound":
              msg("error", "User Not Found");
              form.setFieldsValue({ email: "" });
              break;
            default:
              msg("error", "Error Sending OTP");
              break;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendAnotherCode = () => {
    form.resetFields();
    setLoading(true);
    msg("loading", "Sending OTP");

    getOtp(email).then((res) => {
      setLoading(false);
      switch (res) {
        case "success":
          msg("success", "OTP Sent Successfully");
          break;
        case "userNotFound":
          msg("error", "User Not Found");
          break;
        default:
          msg("error", "Error Sending OTP");
          break;
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>SafetyHood-OTP</title>
      </Helmet>
      <Layout
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
          backgroundImage: "url('/loginpic.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          {!reqCompleted ? (
            <Card
              title={
                <div style={{ height: "100%", width: "500px" }}>
                  Enter Your Email
                </div>
              }
              headStyle={{
                textAlign: "center",
                backgroundColor: "rgb(29, 113, 185)",
                height: "75px",
                color: "white",
              }}
              bodyStyle={{ borderRadius: "10px" }}
              bordered={false}
            >
              <Form
                name="otp-request-form"
                layout="vertical"
                form={form}
                requiredMark={false}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Enter A Password!" },
                    { type: "email", message: "Enter A Valid Email" },
                  ]}
                  hasFeedback
                >
                  <Input
                    size="middle"
                    prefix={<MdAlternateEmail />}
                    placeholder="Enter you Email"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    loading={loading}
                    style={{ width: "100%" }}
                    onClick={onFinish}
                  >
                    Send Code
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          ) : (
            <Card
              title={
                <div style={{ height: "100%", width: "500px" }}>
                  Enter Your One Time Password
                </div>
              }
              headStyle={{
                textAlign: "center",
                backgroundColor: "rgb(29, 113, 185)",
                height: "75px",
                color: "white",
              }}
              bodyStyle={{ borderRadius: "10px" }}
              bordered={false}
            >
              <Form
                name="otp-request-form"
                layout="vertical"
                form={form}
                requiredMark={false}
                
              >
                <Form.Item>
                  <Space
                    compact
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    {Array.from({ length: 6 }, (_, i) => i + 1).map(
                      (_, index) => (
                        <Form.Item
                        
                          name={`digit${index}`}
                          rules={[{ required: true, message: "" }]}
                          style={{
                            display: "inline-block",
                            width: "33px",
                            margin: "0 5px",
                          }}
                          key={index}
                        >
                          <InputNumber
                          disabled={formDisabled}
                            style={{
                              display: "inline-block",
                              width: "33px",
                              margin: "0 5px",
                            }}
                            controls={false}
                            maxLength={1}
                            onPaste={handlePaste}
                            ref={inputRefs[index]}
                            onChange={() => {
                              if (index < 5) {
                                inputRefs[index + 1].current.focus();
                              } else {
                                const values = form.getFieldsValue();
                                const allFilled = Object.values(values).every(
                                  (value) => value !== undefined && value !== ""
                                );
                                if (allFilled) {
                                  sendCode();
                                }
                              }
                            }}
                          />
                        </Form.Item>
                      )
                    )}
                  </Space>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    loading={loading}
                    style={{ width: "100%" }}
                    onClick={sendCode}
                  >
                    Send Code
                  </Button>
                </Form.Item>
                <Link onClick={sendAnotherCode}>Send another code</Link>
              </Form>
            </Card>
          )}
        </div>
        <Footer style={{ width: "100%", textAlign: "center", bottom: 0 }}>
          SafetyHood ©2023 Created by SafetyHood
        </Footer>
      </Layout>
    </>
  );
};

export default OtpReq;
