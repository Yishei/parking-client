import { useState, useContext } from "react";

import { Helmet } from "react-helmet";
import { MessageContext } from "../../Context/MessageContext";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Alert,
  Layout,
  Row,
  Col,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../../utilities/AuthFunctionality";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const { Footer } = Layout;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [form] = Form.useForm();
  const { msg, closeMsg } = useContext(MessageContext);
  const navigate = useNavigate();

  const onFinish = async () => {
    form
      .validateFields()
      .then((values) => {
        setIsLoading(true);
        msg("loading", "Logging In");
        login(values)
          .then((res) => {
            setIsLoading(false);
            handleLogInResponse(res);
          })
          .catch((error) => {
            setIsLoading(false);
            form.resetFields();
            msg("error", "Error Logging In");
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogInResponse = (res) => {
    if (res === "error") {
      form.resetFields();
      msg("error", "Error Logging In");
      return;
    }
    if (res.message === "success") {
      handleSuccess(res.user_role);
      return;
    }
    handleCredentialError(res.message);
    return;
  };

  const handleSuccess = (user_role) => {
    switch (user_role) {
      case 1:
        closeMsg();
        navigate("/superAdmin");
        break;
      case 2:
        closeMsg();
        navigate("/admin");
        break;
      case 3:
        closeMsg();
        navigate("/driver");
        break;
      case 4:
        closeMsg();
        navigate("/resident");
        break;
      default:
        msg("error", "Error Logging In");
    }
  };

  const handleCredentialError = (message) => {
    switch (message) {
      case "user":
        msg("error", "User Not Found");
        form.setFieldsValue({
          email: "",
          password: "",
        });
        form.validateFields();
        break;
      case "password":
        msg("error", "Password Incorrect");
        form.setFieldValue("password", "");
        form.validateFields(["password"]);
        break;
      case "pas not set":
        closeMsg();
        setShowAlert(true);
        form.setFieldsValue({
          email: "",
          password: "",
        });
        break;
      default:
        msg("error", "Error Logging In");
        form.resetFields();
        return;
    }
  };

  return (
    <>
      <Helmet>
        <title>Log In</title>
      </Helmet>
      <Layout className="login-layout">
        <div>
          {showAlert && (
            <Alert
              className="logIn-alert"
              message="Didn't complete sign up"
              type="warning"
              closable
              showIcon
              description="You didn't complete sign up. Please check your email for the sign up link."
              onClose={() => setShowAlert(false)}
            />
          )}
          <Row justify="center">
            <Col xs={24} sm={22} md={20} lg={16} xl={12}>
              <Card
                title={
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      color: "#52c41a",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        height: "auto",
                        width: "150px",
                      }}
                    >
                      <img
                        src="/safetyhood.svg"
                        alt="Safetyhood"
                        width="100%"
                        height="100%"
                      />
                    </div>
                  </div>
                }
                headStyle={{
                  backgroundColor: "rgb(29, 113, 185)",
                  height: "75px",
                }}
                bodyStyle={{ borderRadius: "10px" }}
                bordered={false}
              >
                <Form
                  name="login-form"
                  form={form}
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  requiredMark={false}
                >
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      style={{ width: "100%" }}
                    >
                      Log in
                    </Button>
                  </Form.Item>
                  <a href="/forgotPassword">Forgot password</a>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
        <Footer
          style={{
            width: "100%",
            textAlign: "center",
            bottom: 0,
            position: "fixed",
          }}
        >
          SafetyHood ©2023 Created by SafetyHood
        </Footer>
      </Layout>
    </>
  );
}

export default Login;
