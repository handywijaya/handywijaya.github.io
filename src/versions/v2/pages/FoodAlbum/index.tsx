import React, { useEffect } from 'react'

import Constant from '../../../../shared/utils/const'

const FoodAlbum: React.FC = () => {
  useEffect(() => {
    document.title = `${Constant.BASE_TITLE} | Food Album`
  }, [])

  return (
    <div className="flex flex-1 flex-col px-5 py-12 md:px-8">
      <div className="mx-auto w-full max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
          Food Album
        </h1>
        <p className="mt-4 text-lg text-neutral-500">
          This section is a work in progress. Check back soon ;)
        </p>
      </div>
    </div>
  )
}

export default FoodAlbum
