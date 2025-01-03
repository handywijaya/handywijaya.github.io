import React from 'react'

const Header: React.FC = () => (
  <div className="sticky top-0 z-[1000]
    min-h-header-height 
    flex flex-col justify-center items-center 
    p-header-padding px-[20px] 
    shadow-black bg-headerBg">
    <div className="font-bold text-4xl text-white">
      Journey to Explore the World!
    </div>
  </div>
)

export default Header