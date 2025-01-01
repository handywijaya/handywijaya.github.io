import React from 'react'
import './styles.scss'

const NotFound: React.FC = () => {
    return (
        <div className="Notfound">
            <h2>Sorry, the page is not created yet.</h2>
            <h3>Click here to go <a href='/'>Home</a></h3>
        </div>
    )
}

export default NotFound