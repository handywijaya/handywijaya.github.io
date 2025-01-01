import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useNavigate } from 'react-router-dom';

import { Collection } from '../../interfaces/Collections'

import Constant from '../../utils/const'
import PreviewAlbum from '../../components/PreviewAlbum'

const Home: React.FC = () => {
  const [collections, setCollections] = useState<Array<Collection>>([])
  const navigate = useNavigate();

  useEffect(() => {
    initCollections()
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
    <div className="Home">
      <div className="AlbumContainer">
        {
          collections.map((c, i) => renderCollection(c, i))
        }
      </div>
    </div>
  )
}

export default Home