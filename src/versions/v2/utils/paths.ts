/** Default site (v2). Hash: `#/`, `#/food-album`, `#/collections/:id` */
export const V2_HOME = '/'

export const v2FoodAlbumPath = '/food-album'

export const v2CollectionPath = (collectionId: string) =>
  `/collections/${collectionId}`
