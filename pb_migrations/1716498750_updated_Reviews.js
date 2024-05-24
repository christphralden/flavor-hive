/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ak9efkzh5it5fei")

  collection.name = "reviews"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ak9efkzh5it5fei")

  collection.name = "Reviews"

  return dao.saveCollection(collection)
})
