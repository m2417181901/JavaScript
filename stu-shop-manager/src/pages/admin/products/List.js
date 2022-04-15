import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import {Card, Table, Button, Space, Popconfirm} from 'antd'
import { PicCenterOutlined } from "@ant-design/icons";
import { products, delProduct } from '../../../service/auth' 
import {connect} from 'react-redux'
import { loadProduct } from "../../../store/actions/products";

function List(props) {
    console.log(props)
    const Navigator = useNavigate()
    const [data, setData] = useState([])
    const getList = () => {
        products().then(res => {
            console.log(res)
            if(res.data.data!='错误')
                setData(res.data.data)
        }).catch(err=> {
            console.log(err)
        })
    }
    useEffect(()=> {
        props.dispatch(
            loadProduct({
                page:2,
                name:"小米"
            })
        )
        getList()
      }, [])
    const columns = [{
        'title': '序号',
        key: 'id',
        width: 80,
        align: 'center',
        render(text, record, index) {
            return index+1
        },
    },
    {
        title: '名字',
        dataIndex: 'shopName',
        render(text, record, index) {
            return text
        }
    },
    {
        title: '价格',
        dataIndex: 'shopPrice'
    },
    {
        title: '操作',
        width: 200,
        render(text, record, index) {
            // console.log(text,record,index)
            return (<div>
                <Button type="primary" size="small" style={{"float":'right'}} onClick={()=>Navigator(`/admin/products/edit/${text.Id}/${text.shopName}/${text.shopPrice}`)}>修改</Button>
                <Popconfirm 
                    title="确定删除此项"
                    onCancel={()=>console.log("用户取消删除")}
                    onConfirm={()=> {
                        console.log("用户确认删除")
                        //TODO 此处编写删除商品接口
                        delProduct(text.Id).then(res=>{
                            console.log('删除成功', res)
                            products().then(res => {
                                console.log(res)
                                if(res.data.data!='错误')
                                    setData(res.data.data)
                            }).catch(err=> {
                                console.log(err)
                            })
                        }).catch(err=> {
                            console.log(err)
                        })
                    }}
                >
                    <Button type="danger" size="small" style={{"float":'right',"margin":"0 1rem"}}>删除</Button>
                </Popconfirm>
                
            </div>)
        },
    }]
    return (
        <Card title="商品列表" extra={<Button type="primary" size="small" onClick={()=>Navigator('/admin/products/edit')}>新增</Button>}>
            <Table
                columns={columns}
                bordered
                dataSource={data}
                rowKey={record=>record.Id}
            ></Table>
        </Card>
    )
}

export default connect(state=>state)(List);