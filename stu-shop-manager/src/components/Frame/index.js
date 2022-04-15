import React from 'react'
import { Layout, Menu, Space, Dropdown, Avatar, message, Badge} from 'antd';
import 'antd/dist/antd.css'
import '../../css/frame.css'
import {useNavigate} from "react-router-dom";
import {adminRoutes} from '../../routes'
import {Routes, Route} from 'react-router-dom'
import {CaretDownOutlined} from '@ant-design/icons'
import { clearToken } from '../../utils/auth';
import {connect} from 'react-redux'
const routes = adminRoutes.filter(route=>route.isShow)
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function Frame(props) {
  const Navigator = useNavigate()
  console.log(props)
  const popMenu = (<Menu 
      onClick={p => {
        if(p.key == 'logOut') {
          clearToken()
          Navigator('/login')
        } else {
            if(p.key==='noti') {
              Navigator('notices')
            }
          message.info(p.key)
        }
      }}
    >
    <Menu.Item key="noti">通知中心</Menu.Item>        
    <Menu.Item key="setting">设置</Menu.Item>        
    <Menu.Item key="logOut">退出</Menu.Item>        
  </Menu>)
  return (
    <Layout>
    <Header className="header">
      <div className="logo" />
     <Dropdown overlay={popMenu}>
       <div>
         <Space>
          <Avatar></Avatar>
          <Badge dot={!props.isAllRead}><span style={{color:'white'}}>超级管理员</span></Badge>
         </Space>
          
          <CaretDownOutlined />
       </div>
     </Dropdown>
    </Header>
    <Layout>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {routes.map(route=>{
            return (<Menu.Item 
                key={route.path} 
                onClick={p => {
                  console.log(p.key)
                  Navigator(p.key.replace('/',''))
                }}>
              <Space>
              {route.icon}
              {route.title}
              </Space>
              </Menu.Item>)
          })}
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
      <Routes>
        {	  
          adminRoutes.map(route => {
            return <Route key={route.id} 
                          path={route.path}
                          exact={route.exact}
                          element={<route.element />}
                          />
                  })
        }
      </Routes>
        </Content>
      </Layout>
    </Layout>
  </Layout>
  )
}

export default connect(state=>state.notice)(Frame)