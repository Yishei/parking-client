import React, { useEffect, useState, useContext } from "react";
import { MessageContext } from "../../Context/MessageContext";
import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import { createCamera, seeIfCameraExists } from "../../utilities/fetchData";
import { useParams } from "react-router-dom";

const ModalCameras = (props) => {
  const { drawerOpen, setDrawerOpen, fetchData } = props;
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formDisabled, setFormDisabled] = useState(false);
  const [SubmitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { lotId } = useParams();
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
    const res = await createCamera(form.getFieldsValue());
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
        lot_id: lotId,
      });
    }
  }, [drawerOpen, lotId, form]);

  return (
    <>
      <Modal
        title="Add New Camera"
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
              <Form.Item name="lot_id" label="Lot ID">
                <Input bordered={false} disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} key={"2"}>
            <Col span={24}>
              <Form.Item
                name="Data_source_camera_id"
                label="OpenOLPR Camera ID"
                rules={[
                  {
                    required: true,
                    message: "Enter OpenOLPR Camera ID",
                  },

                  {
                    validator: async (_, value) => {
                      if (value) {
                        const exists = await seeIfCameraExists(value);
                        if (exists) {
                          return Promise.reject(
                            new Error("This Camera ID Already Exists")
                          );
                        }
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  controls={false}
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
export default ModalCameras;
