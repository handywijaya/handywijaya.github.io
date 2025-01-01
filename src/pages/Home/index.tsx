import React from 'react'
import './styles.scss'

import { Collection } from '../../interfaces/Collections'

import Constant from '../../utils/const'
import { withNavigate } from '../../utils/routes'
import PreviewAlbum from '../../components/PreviewAlbum'

// need to pass <any> to get acccess props' values
class Home extends React.PureComponent<any> {
  collections: Array<Collection>

  constructor (props: any) {
    super(props)

    this.collections = []

    this.initCollections()
  }

  initCollections () {
    this.collections = []
    Object.keys(Constant.COLLECTIONS).forEach((collectionName: string) => {
      this.collections.push(Constant.COLLECTIONS[collectionName])
    })
  }

  openCollection (collectionPath: string) {
    const { navigate } = this.props
    navigate(collectionPath)
  }

  renderCollection (collection: Collection, key: number) {
    return (
      <PreviewAlbum
        key={key}
        collection={collection}
        onOpenCollection={(collectionPath) => this.openCollection(collectionPath)} />
    )
  }

  render () {
    return(
      <div className="Home">
        <div className="AlbumContainer">
          {
            this.collections.map((c, i) => this.renderCollection(c, i))
          }
        </div>
      </div>
    )
  }
}

export default withNavigate(Home)