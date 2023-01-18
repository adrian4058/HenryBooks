import React from 'react';
import {Link} from 'react-router-dom'

class Navbar extends React.Component{


    render(){
        return (<div>
            <Link to="/home">Home</Link>
        
            <Link to="/about">About</Link>
        </div>)
    }
    
 }
    
    export default Navbar
    ///


    