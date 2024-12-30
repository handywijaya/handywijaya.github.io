import React from 'react'
import './styles.scss'

class Header extends React.PureComponent {
    render () {
        return (
            <div className="Header">
                <div className="Header-title">
                    Journey to Explore the World!
                </div>
            </div>
        )
    }
}

export default Header