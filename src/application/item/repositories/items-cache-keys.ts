export const ItemsCacheKeys = {
  itemsAll: () => 'catalog:items:all',
  itemsByCategory: (categoryId: string) => `catalog:items:category:${categoryId}`,
  itemById: (itemId: string) => `catalog:item:${itemId}`,
}
