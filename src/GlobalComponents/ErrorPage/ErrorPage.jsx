import React from "react";
import { Helmet } from "react-helmet";
import { Button, Result } from "antd";
import "./ErrorPage.css";
const ErrorPage = () => (
  <>
    <Helmet>
      <title>500</title>
    </Helmet>
    <Result
      className="error-page-container"
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  </>
);
export default ErrorPage;
