/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mam6pkp394tiics")

  collection.indexes = [
    "CREATE INDEX `idx_hNcIHhA` ON `restaurants` (\n  `name`,\n  `keywords`,\n  `location`,\n  `restaurantOwner`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mam6pkp394tiics")

  collection.indexes = []

  return dao.saveCollection(collection)
})
