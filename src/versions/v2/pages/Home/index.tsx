import React, { useEffect, useMemo } from 'react'

import { Collection } from '../../../../shared/interfaces/Collections'
import Constant from '../../../../shared/utils/const'
import AlbumPreviewCard from '../../components/AlbumPreviewCard'

const Home: React.FC = () => {
  useEffect(() => {
    document.title = `${Constant.BASE_TITLE} | Home`
  }, [])

  const collections = useMemo(() => {
    return Object.keys(Constant.COLLECTIONS).map(
      (key) => Constant.COLLECTIONS[key] as Collection
    )
  }, [])

  return (
    <div className="flex flex-1 flex-col px-5 pb-16 pt-10 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap justify-center gap-x-10 gap-y-14 md:justify-start md:gap-x-16">
        {collections.map((collection) => (
          <AlbumPreviewCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  )
}

export default Home
