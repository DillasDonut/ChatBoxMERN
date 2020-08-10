import React from 'react'
import './LandingPage.css'
import {Button} from 'antd'
import { Link } from 'react-router-dom';



function LandingPage() {
    return (
        
        <>
        <div className="app" style={{ background: '#344354'}}>
            <span className="title" style={{ color: '#61D5E5'}}>ChatBox 101.</span>
            <span className="sub" style={{ fontSize: '1.5rem', color: 'white' }}>Bienvenue sur le chat préféré des gens trop cools.</span>
            <div className="btndiv">
                <Link to="/register"><Button  size='large' type="primary"><span style={{color:'#61E58E'}}>Register</span></Button></Link> <Link to="/login"><Button size='large' type="primary" ><span style={{color:'#61E58E'}}>Log in</span></Button></Link>
                
            </div>
        </div>
        </>
    )
}

export default LandingPage
