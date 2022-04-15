import React from 'react'
import { Button, Card, List, Typography } from 'antd'
import {connect} from 'react-redux'
function Index(props) {
    console.log(props)
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
        ];
    return (
        <Card title="通知中心" extra={<Button type='danger' onClick={() => {
            props.dispatch({
                type: "READ_ALL"
            })
        }}>全部已读</Button>}>
          <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                    <Button size='small' type='primary' style={{display:'flex',alignContent:'space-between'}}>已读</Button>
                    </List.Item>
                )}
        />
        </Card>
    )
}

export default connect(state=>state)(Index) 