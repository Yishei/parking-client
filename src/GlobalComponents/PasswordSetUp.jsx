import { Input, Form, Button, Card, Checkbox, Layout } from "antd";
import { Helmet } from "react-helmet";
import { MessageContext } from "../Context/MessageContext";
import SignUpSuccess from "./SignUpSuccess";
import { LockOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { setPass } from "../utilities/fetchData";
const { Footer } = Layout;

const PasswordSetUp = () => {
  const [completed, setCompleted] = useState(false);
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const { msg } = useContext(MessageContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async () => {
    form
      .validateFields()
      .then((values) => {
        setLoading(true);
        msg("loading", "Setting Up Password");
        const res = setPass(token, values.password);
        res.then((res) => {
          setLoading(false);
          switch (res) {
            case "success":
              msg("success", "Password Set Successfully");
              setCompleted(true);
              break;
            case "unauthorized":
              form.resetFields();
              msg("error", "Token Expired");
              break;
            case "passSet":
              form.resetFields();
              msg("error", "Password Already Set");
              setTimeout(() => {
                navigate("/login");
              }, 2000);
              break;
            default:
              msg("error", "Error Setting Up Password");
              break;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>SafetyHood Apassword SetUp</title>
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
          {completed ? (
            <SignUpSuccess />
          ) : (
            <Card
              title={
                <div
                  style={{ color: "#52c41a", height: "100%", width: "500px" }}
                >
                  <img
                    src="/safetyhood.svg"
                    alt="Safetyhood"
                    width="150"
                    height="75"
                  />
                </div>
              }
              headStyle={{
                textAlign: "center",
                backgroundColor: "rgb(29, 113, 185)",
              }}
              bodyStyle={{ borderRadius: "10px" }}
              bordered={false}
            >
              <Form
                name="login-form"
                layout="vertical"
                form={form}
                requiredMark={false}
              >
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Enter A Password!" },
                    { min: 8 },
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Enter you Password"
                  />
                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your Password",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("The two passwords does not match!")
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password
                    style={{ width: "100%" }}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  name="agree"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject("To proceed, agree to terms"),
                    },
                  ]}
                >
                  <Checkbox>
                    I have read the{" "}
                    <a href="/about" target="blank">
                      terms and conditions
                    </a>
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    onClick={onFinish}
                    loading={loading}
                    style={{ width: "100%" }}
                  >
                    Complete
                  </Button>
                </Form.Item>
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

export default PasswordSetUp;
