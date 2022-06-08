import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const { Title } = Typography;

const Register = () => {
    const [form] = Form.useForm();

    const navigate = useNavigate();

  const onFinish = () => {
    navigate("/");
  };

  return(
    <Layout>
        <Row className="signup-container">
        <Col xs={24} md={12} lg={8}>
            <Title level={2}>Signup</Title>
            <Title level={5}>We do not share your personal details with anyone</Title>
        </Col>
        <Col xs={24} md={12} lg={10}>
            <Form
        form={form}
        name="signup"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
        requiredMark={false}
        >
        <Form.Item
        name="firstname"
        label="First Name"
        rules={[{ required: true, message: 'First Name Cannot be empty!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Last Name"
        rules={[{ required: true, message: 'Last Name cannot be empty!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
        <Form.Item
            name="email"
            label="Email"
            rules={[
            {
                type: 'email',
                message: 'Ented valid Email!',
            },
            {
                required: true,
                message: 'Email cannot be empty!',
            },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            name="password"
            label="Password"
            rules={[
            {
                required: true,
                message: 'Password cannot be empty!',
            },
            () => ({
                validator(_, value) {
                if (!value || value.match(/^((?!.*[\s])(?=.*[a-zA-Z])(?=.*\d).{6})/)) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Password should be minimum 6 characters length, must have a number and alphabet and cannot have spaces!'));
                },
            })
            ]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Password cannot be empty!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Passwords does not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
        <Form.Item>
            <Button htmlType="submit" className='signup-btn'>
            Signup
            </Button>
        </Form.Item>
        </Form>
        </Col>
        </Row>
    </Layout>);
}
export default  Register;