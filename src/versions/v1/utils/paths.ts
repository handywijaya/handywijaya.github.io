/** Classic site (v1). Hash: `#/v1`, `#/v1/collections/:id` */
export const V1_ROOT = '/v1'

export const v1CollectionPath = (collectionId: string) =>
  `${V1_ROOT}/collections/${collectionId}`

export const V1_NOT_FOUND = `${V1_ROOT}/not-found`
