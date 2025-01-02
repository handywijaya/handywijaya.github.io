import React, { useEffect } from 'react'
import './_styles.scss';
import '../../_theme.scss'
import { useNavigate, useParams } from 'react-router-dom'

import cn from 'classnames'

import { Collection as C } from '../../interfaces/Collections'

import Constant from '../../utils/const'
import Album from '../../components/Album'

const Collection: React.FC = () => {
  const navigate = useNavigate()
  const { collectionName } = useParams<{ collectionName: string }>()
  const collection: C | undefined = Constant.COLLECTIONS[collectionName || '']

  // Validate routes when the component mounts
  useEffect(() => {
    if (!collection) {
      navigate('/not-found')
      return
    }

    document.title = Constant.BASE_TITLE + " | " + collection.title
  }, [collection, navigate])

  const backToHome = () => {
    navigate('/')
  }

  const backToTop = () => {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  if (!collection) {
    return null // Avoid rendering content if collection is invalid
  }

  const theme = 'Theme-' + collection.id
  const collectionClassName = cn(
    'Collection',
    theme
  )
  const homeClassName = cn(
    'Collection-button',
    'Collection-home',
    theme + '-button'
  )
  const topClassName = cn(
    'Collection-button',
    'Collection-top',
    theme + '-button'
  )

  return (
    <div className={collectionClassName}>
      <div className={homeClassName} onClick={backToHome}>
        Back to home
      </div>
      <Album collection={collection} />
      <div className={topClassName} onClick={backToTop}>
        Back to top
      </div>
    </div>
  )
}

export default Collection