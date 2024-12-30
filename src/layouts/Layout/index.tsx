import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './styles.scss'

class Layout extends React.PureComponent {
    render () {
        return (
            <div className="Layout">
                <Header />
                <div className="Content">
                    { this.props.children }
                </div>
                <Footer />
            </div>
        )
    }
}

export default Layout