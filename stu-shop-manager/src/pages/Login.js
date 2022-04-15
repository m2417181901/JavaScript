import React, { Fragment, useState } from "react";
import '../css/login.css'
import { Form, Input, Button, Checkbox, Card, Modal} from 'antd';
import { setToken } from "../utils/auth";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useNavigate} from 'react-router-dom'
import {loginApi, registerApi} from '../service/auth'
function Login() {
    const navigator = useNavigate()
    const onFinish = (values) => {
        setToken(values.username)
        loginApi({
          username: values.username,
          password: values.password
        }).then(res=> {
          console.log(res)
          if(res.data.data === '登录成功')
            navigator('/admin')
          else
            alert('登录失败')
        }).catch(err=> {
          console.log(err)
        })
      };
    const onFinishRegister = (values) => {
        console.log(values)
        registerApi({
          userName: values.username,
          password: values.password
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
    }

      const [isModalVisible, setIsModalVisible] = useState(false);

      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };
    return (
        <Card className="login-form">
        <Form
        name="normal_login"
        
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入您的用户名!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入您的密码!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
        没有账号？<Button type="primary" size="small" onClick={showModal}>马上注册!</Button>
        </Form.Item>
      </Form>
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal title="注册" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={[
      
      ]}>
        <Form onFinish={onFinishRegister}>
          <Form.Item name="username" label="用户名" rules={[{required: true,message:'请输入注册用的用户名'}]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{required: true,message:'请输入注册用的密码'}]}>
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
          </Form.Item>
          <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入您的密码!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的内容不一样!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} />
      </Form.Item>
      <Form.Item>
      <Button htmlType="submit" type="primary" onClick={handleOk}>确认</Button>
      <Button type="danger" >取消</Button>
      </Form.Item>
        </Form>
      </Modal>
    </>
      </Card>
    )
}

export default Login;