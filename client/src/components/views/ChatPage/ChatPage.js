import React, { Component } from 'react'
import { Form, Icon, Input, Button, Row, Col, Divider } from 'antd';
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions"
import ChatCard from "./Sections/ChatCard"
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import './ChatPage.css';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import { slide as Menu } from 'react-burger-menu';




export class ChatPage extends Component {
    state = {
        chatMessage: "",
    }

     

    componentDidMount() {
        let server = "http://localhost:5000";

        this.props.dispatch(getChats());

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log(messageFromBackEnd)
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
        })
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }

    hanleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () =>
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
            <ChatCard key={chat._id}  {...chat} />
        ));

    onDrop = (files) => {
        console.log(files)
        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/formData' }
        }
        formData.append("file", files[0])

        Axios.post('api/chat/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    let chatMessage = response.data.url;
                    let userId = this.props.user.userData._id
                    let userName = this.props.user.userData.name;
                    let userImage = this.props.user.userData.image;
                    let nowTime = moment();
                    let type = "VideoOrImage"

                    this.socket.emit("Input Chat Message", {
                        chatMessage,
                        userId,
                        userName,
                        userImage,
                        nowTime,
                        type
                    });
                }
            })
    }


    submitChatMessage = (e) => {
        e.preventDefault();
        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }
        let chatMessage = this.state.chatMessage
        let userId = this.props.user.userData._id
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment();
        let type = "Text"

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        });
        this.setState({ chatMessage: "" })
    }
    

    render() {
        return (
            <>
            
            {/* DESKTOP/TAB VERSION */}    
            <MediaQuery minDeviceWidth={528}>
            <React.Fragment>
                <Row gutter={[24, 16]} justify="space-around" align="middle">
                        <Col span={6}>
                            <div 
                                id="listpar" 
                                style={{ width:'19vw', margin: '24px' , background:'#202332' , float: "left", border:'0px solid', borderRadius:'4px' }}>
                                    <div 
                                        className="infinite-container" 
                                        style={{  height: '86.5vh',  background:'#202332', border:'0px solid', borderRadius:'4px' }}>
                                            <Divider orientation="left" plain><h2 id='title'>Main Room</h2></Divider>
                                                <a>Room1</a>
                                            <Divider ></Divider>
                                                <a>Room 2</a>
                                            <Divider></Divider>
                                                <a>Room 3</a>
                                            <Divider></Divider>
                                             <a>Room 4</a>
                                    </div>
                            </div>
                        </Col> 
                        {/* <Col span={6}>
                            <Menu>
                                <a id="home" className="menu-item" href="/">Home</a>
                                <a id="about" className="menu-item" href="/about">About</a>
                                <a id="contact" className="menu-item" href="/contact">Contact</a>
                            </Menu>
                        </Col> */} 
                    
                    <Col span={18} >
                        <div id="chatpar" style={{margin: '24px', float: "right", display:'block' }}>
                            <div className="infinite-container" style={{width:'70vw',  height: '75vh', overflowY: 'scroll', background:'#202332', border:'0px solid', borderRadius:'4px' }}>
                                {this.props.chats && (
                                    this.renderCards()
                                )}
                                <div
                                    ref={el => {
                                        this.messagesEnd = el;
                                    }}
                                    style={{ float: "left", clear: "both" }}
                                />
                            </div>
                        </div>

                        <div style={{marginLeft:'25px', width:'100vh'}}>
                        <Form onSubmit={this.submitChatMessage}>
                                <Input
                                    style={{ height:'8.5vh'}}
                                    id="message"
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}
                                    enterButton="SendOutLined"
                                    prefix={<Icon type="message" style={{ color: 'rgba(255, 255, 255, 0.50)', float:'right'}} />}
                                    suffix=
                                    {<Dropzone onDrop={this.onDrop.bind(this)}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <Button >
                                                            <Icon type="upload" style={{ color: 'rgba(255, 255, 255, 0.50)'}} />
                                                        </Button>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>}
                                    />
                                {/* <Button id="submitbtn" type="primary" style={{ width: '11.8vw', background:'#61E58E' }} onClick={this.submitChatMessage} htmlType="submit">
                                    <Icon type="enter" style={{ color: '#202332'}} />
                                </Button> */}
                            </Form>  
                            </div>         
                    </Col>

                    
                </Row>

                    
                

                </React.Fragment> 
                </MediaQuery>

        {/*MOBILE VERSION */}

        <MediaQuery maxDeviceWidth={527}>
            <React.Fragment>
                <Row gutter={[24, 16]} justify="center">
                    <Col span={24}>
                        <div id='menubar' className="infinite-container" style={{width:'100vw',  height: '7vh', border:'0px solid' }}>
                            <Menu>
                                <a id="home" className="menu-item" href="/">Home</a>
                                <a id="about" className="menu-item" href="/about">About</a>
                                <a id="contact" className="menu-item" href="/contact">Contact</a>
                            </Menu>
                            
                            <h1 id='title'>ChatBox 101.</h1>
                        </div>
                    </Col>  
                </Row>

                <Row gutter={[24, 16]} justify="center">
                        {/* <Col span={6}>
                            <div id="listpar" style={{ width:'19vw', margin: '24px' , background:'#202332' , float: "left", border:'0px solid', borderRadius:'4px' }}>
                            <div className="infinite-container" style={{  height: '86.5vh',  background:'#202332', border:'0px solid', borderRadius:'4px' }}>

                            </div>
                            </div>
                        </Col> */} 
                         {/* <Col span={6}>
                            <Menu>
                                <a id="home" className="menu-item" href="/">Home</a>
                                <a id="about" className="menu-item" href="/about">About</a>
                                <a id="contact" className="menu-item" href="/contact">Contact</a>
                            </Menu>
                        </Col> */}  
                    
                    <Col span={24} >
                        <div id="chatpar" style={{/* maxWidth:'100vw', */ display:'block', overflowX:'disabled' }}>
                            <div className="infinite-container" style={{width:'100vw',  height: '82.5vh', overflowY: 'scroll', background:'#202332', marginTop:'-10px'}}>
                                {this.props.chats && (
                                    this.renderCards()
                                )}
                                <div
                                    ref={el => {
                                        this.messagesEnd = el;
                                    }}
                                    style={{ float: "left", clear: "both" }}
                                />
                            </div>
                        </div>

                        <Form onSubmit={this.submitChatMessage} style={{marginLeft:'7.35rem !important'}}>
                                <Input
                                    style={{width:'99vw', height:'6vh', marginTop:'0.35rem', marginRight:'0.35rem'}}
                                    id="message"
                                    placeholder="Let's start talking"
                                    type="text"
                                    value={this.state.chatMessage}
                                    onChange={this.hanleSearchChange}
                                    prefix={<Icon type="message" style={{ color: 'rgba(255, 255, 255, 0.50)', float:'right'}} />}
                                    suffix=
                                    {<Dropzone onDrop={this.onDrop.bind(this)}>
                                            {({ getRootProps, getInputProps }) => (
                                                <section>
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()} />
                                                        <Button >
                                                            <Icon type="upload" style={{ color: 'rgba(255, 255, 255, 0.50)'}} />
                                                        </Button>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>}
                                    />
                                {/* <Button id="submitbtn" type="primary" style={{ width: '11.8vw', background:'#61E58E' }} onClick={this.submitChatMessage} htmlType="submit">
                                    <Icon type="enter" style={{ color: '#202332'}} />
                                </Button> */}
                            </Form>           
                    </Col>

                    
                </Row>

                    
                

                </React.Fragment> 
                </MediaQuery>
            </>    

             
                


             
            
            
        )
    }
}



const mapStateToProps = state => {
    return {
        user: state.user,
        chats: state.chat
    }
}


export default connect(mapStateToProps)(ChatPage);


