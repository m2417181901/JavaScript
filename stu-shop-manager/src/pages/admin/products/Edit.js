import React, { useEffect, useState, createRef } from "react";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import {Form, Card, Input, Button, InputNumber, Upload, message} from 'antd'
import { addProducts, editProduct } from '../../../service/auth'
//引入编辑器组件
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
//引入编辑器样式
import 'draft-js/dist/Draft.css';

function Edit() {
    let data = useParams()
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty())
    const editor = React.useRef(null);
    //富文本编辑器
    const handleEditorChange = v => {
        setEditorState({v})
    }

    const onFinish = values => {
        if(data.id){
            editProduct(data.id,{
                shopName: values.name,
                shopPrice: values.price
            }).then(res=> {
                console.log(res)
            }).catch(err=> {
                console.log(err)
            })
        } else {
            addProducts({
                shopName: values.name,
                shopPrice: values.price
            }).then(res=> {
                console.log(res)
            }).catch(err=> {
                console.log(err)
            })
        }
        // props.form.validateFilesAndScrool()
    }

    // function getBase64(img, callback) {
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => callback(reader.result));
    //     reader.readAsDataURL(img);
    //   }
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 16 },
      };
    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
            range: '${lable} must small than ${max}'
        }
      };
    return (
        <Card title="商品编辑">
            <Form {...layout} onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name='name' label="Name" rules={[{ required: true }]}>
                    <Input placeholder="请输入商品名字" defaultValue={data.name ? data.name:''}></Input>
                </Form.Item>
                <Form.Item name='price' label="Price" rules={[{ type: 'number', max: 100, required: true }]}>
                    <InputNumber placeholder="价格" defaultValue={data.price ? data.price:0}></InputNumber>
                </Form.Item>
                <Form.Item label='details'>
                    asdasd
                    <Editor
                        editorState={editorState}
                        onChange={setEditorState}
                    >
                    </Editor>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Edit