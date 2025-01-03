import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Collection } from '../../interfaces/Collections'

import Constant from '../../utils/const'
import PreviewAlbum from '../../components/PreviewAlbum'

const Home: React.FC = () => {
  const [collections, setCollections] = useState<Array<Collection>>([])
  const navigate = useNavigate();

  useEffect(() => {
    initCollections()
    document.title = Constant.BASE_TITLE + " | Home"
  }, [])

  const initCollections = () => {
    const collectionsArray: Array<Collection> = []
    Object.keys(Constant.COLLECTIONS).forEach((collectionName: string) => {
      collectionsArray.push(Constant.COLLECTIONS[collectionName])
    })
    setCollections(collectionsArray)
  }

  const openCollection = (collectionPath: string) => {
    navigate(collectionPath)
  }

  const renderCollection = (collection: Collection, key: number) => (
    <PreviewAlbum
      key={key}
      collection={collection}
      onOpenCollection={(collectionPath) => openCollection(collectionPath)} />
  )

  return (
    <div className="p-[10px] pt-[20px] leading-normal">
      <div className="flex flex-wrap justify-center items-center content-center gap-[32px] padding-[12px]">
        {
          collections.map((c, i) => renderCollection(c, i))
        }
      </div>
    </div>
  )
}

export default Home