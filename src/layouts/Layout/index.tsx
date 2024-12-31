import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../Header'
import Footer from '../Footer'
import './styles.scss'

class Layout extends React.PureComponent {
    render () {
        return (
            <div className="Layout">
                <Header />
                <div className="Content">
                    <Outlet />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Layout