import React from "react";
import moment from 'moment';
import { Comment, Tooltip, Avatar } from 'antd';
import './ChatCard.css';

function ChatCard(props) {
    return (
        <div style={{ width: '100%', marginLeft:"12px" }}>
            <Comment
                style={{ color:'#ffffff'}}
                author={props.sender.name}
                avatar={
                    <Avatar
                        src={props.sender.image} alt={props.sender.name}
                    />
                }
            content={
                    props.message.substring(0, 8) === "uploads\\" ?
                        // this will be either video or image 

                        props.message.substring( props.message.length) === 'mp4' ?
                            <video
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:5000/${props.message}`} alt="video"
                                type="video/mp4" controls
                            />
                            :
                            <img
                                style={{ maxWidth: '200px' }}
                                src={`http://localhost:5000/${props.message}`}
                                alt="img"
                            />
                        :
                        <p>
                            {props.message}
                        </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span style={{fontStyle:'italic', fontSize:'0.6rem'}}>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default ChatCard;