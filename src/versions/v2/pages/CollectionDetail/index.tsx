import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import cn from 'classnames'

import { Collection as CollectionModel } from '../../../../shared/interfaces/Collections'
import Constant from '../../../../shared/utils/const'
import CollectionPhotoGrid from '../../components/CollectionPhotoGrid'
import { V2_HOME } from '../../utils/paths'

const CollectionDetail: React.FC = () => {
  const navigate = useNavigate()
  const { collectionName } = useParams<{ collectionName: string }>()
  const collection: CollectionModel | undefined =
    Constant.COLLECTIONS[collectionName || '']

  useEffect(() => {
    if (!collection) {
      navigate(V2_HOME, { replace: true })
      return
    }
    document.title = `${Constant.BASE_TITLE} | ${collection.title}`
  }, [collection, navigate])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!collection) {
    return null
  }

  const title = collection.titleV2
  const description = collection.caption

  return (
    <div className="flex flex-1 flex-col px-5 py-8 md:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Link
            to={V2_HOME}
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
          >
            ← Home
          </Link>
        </div>

        {/* Same per-album radial gradient as classic Collection page (see _theme.scss .Theme-{id}) */}
        <div
          className={cn(
            '-mx-5 overflow-hidden rounded-3xl px-4 py-8 sm:px-6 md:-mx-8 md:px-10',
            `Theme-${collection.id}`
          )}
        >
          <header className="mb-10 max-w-3xl">
            <h1
              className={cn(
                'text-3xl font-bold tracking-tight md:text-4xl',
                `Theme-${collection.id}-title`
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                'mt-3 text-sm leading-relaxed md:text-base',
                `Theme-${collection.id}-caption`
              )}
            >
              {description}
            </p>
          </header>

          <CollectionPhotoGrid collection={collection} />
        </div>

        <div className="mt-10 flex justify-end">
          <button
            type="button"
            onClick={scrollToTop}
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-neutral-800"
          >
            Back to top
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollectionDetail
