/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rck7misxygxago0")

  collection.indexes = [
    "CREATE INDEX `idx_shu32EH` ON `menus` (\n  `name`,\n  `description`,\n  `price`,\n  `restaurant`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rck7misxygxago0")

  collection.indexes = []

  return dao.saveCollection(collection)
})
