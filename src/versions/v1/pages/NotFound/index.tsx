import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { V1_ROOT } from '../../utils/paths'

const NotFound: React.FC = () => {
    const { pathname } = useLocation()
    const homePath = pathname.startsWith('/v1') ? V1_ROOT : '/'

    return (
        <div className="w-full flex flex-col items-center mt-[20px]">
            <h2 className="font-bold text-[40px]">Sorry, the page is not created yet.</h2>
            <h3 className="text-slate-700 text-[24px]">Click here to go <Link className="underline text-slate-500" to={homePath}>Home</Link></h3>
        </div>
    )
}

export default NotFound
