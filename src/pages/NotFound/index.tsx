import React from 'react'

const NotFound: React.FC = () => {
    return (
        <div className="w-full flex flex-col items-center mt-[20px]">
            <h2 className="font-bold text-[40px]">Sorry, the page is not created yet.</h2>
            <h3 className="text-slate-700 text-[24px]">Click here to go <a className="underline text-slate-500" href='/'>Home</a></h3>
        </div>
    )
}

export default NotFound