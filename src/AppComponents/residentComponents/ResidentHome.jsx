import {
  Layout,
  Menu,
  Avatar,
  Row,
  Col,
  Popover,
  Button,
  Card,
  Form,
  Input,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const ResidentHome = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  return (
    <Layout>
      <Header>
        <Row justify="space-between" align="middle">
          <Col xs={24} sm={12}>
            <a href="/">
              <img
                style={{ margin: "12px" }}
                src="/safetyhood.svg"
                alt="Safetyhood"
                width="150"
                height="75"
              />
            </a>
          </Col>
          <Col xs={24} sm={12}>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="1">
                <Popover content={content} title="Title">
                  <Avatar icon={<UserOutlined />} />
                </Popover>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Card title="Profile Settings">
        <Form
          name="profile"
          initialValues={{ name: "John Doe", email: "john.doe@example.com" }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default ResidentHome;
