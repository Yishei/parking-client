import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import urls from "../../utilities/urls.json";
import { apiService } from "../../utilities/apiService";
import { useParams } from "react-router-dom";

const ModalLots = (props) => {
  const { drawerOpen, setDrawerOpen, fetchData } = props;
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formDisabled, setFormDisabled] = useState(false);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { condoId } = useParams();
  const { msg } = useContext(MessageContext);
  const [form] = Form.useForm();

  const onClose = () => {
    setDrawerOpen(false);
    form.resetFields();
    setFormDisabled(false);
    setSubmitDisabled(true);
    if (submitted) {
      fetchData();
      setSubmitted(false);
    }
  };

  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        setSubmitLoading(true);
        msg("loading", "Submitting Data");
        handleSubmitNew();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleSubmitNew = async () => {
    //const res = await createLot(form.getFieldsValue());
    const res = await apiService.post(
      `${urls.baseURl}${urls.post.createLot}`,
      form.getFieldsValue()
    );
    console.log(res, "res");
    setSubmitLoading(false);

    if (res !== "fail") {
      setSubmitted(true);
      setSubmitDisabled(true);
      setFormDisabled(true);
      setFormDisabled(true);
      msg("success", "Lot Created");
    } else {
      msg("error", "Error Creating Lot");
    }
  };

  useEffect(() => {
    if (drawerOpen) {
      form.setFieldsValue({
        condo_id: condoId,
      });
    }
  }, [drawerOpen, condoId, form]);

  return (
    <>
      <Modal
        title="Add New Lot"
        open={drawerOpen}
        onCancel={onClose}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          disabled={formDisabled}
          requiredMark={false}
          onValuesChange={(changedValues, allValues) => {
            setSubmitDisabled(false);
          }}
        >
          <Row gutter={16} key={"1"}>
            <Col span={24}>
              <Form.Item name="condo_id" label="Condo ID">
                <Input
                  bordered={false}
                  placeholder="This will be auto generated"
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} key={"2"}>
            <Col span={24}>
              <Form.Item
                name="lot_address"
                label="Lot Address"
                rules={[
                  {
                    required: true,
                    message: "Please Enter a Lot Address",
                  },
                ]}
              >
                <Input
                  bordered={!formDisabled}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} key={"3"}>
            <Col span={24}>
              <Form.Item
                name="lot_name"
                label="Lot Name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter a Lot Name",
                  },
                ]}
              >
                <Input
                  bordered={!formDisabled}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row gutter={16} key={"6"}>
          <Col span={24}>
            <Button
              type="primary"
              disabled={submitDisabled}
              loading={SubmitLoading}
              style={{
                width: "100%",
              }}
              onClick={onSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ModalLots;
