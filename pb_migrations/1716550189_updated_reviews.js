/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ak9efkzh5it5fei")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bwbjoe6l",
    "name": "restaurant",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "mam6pkp394tiics",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ak9efkzh5it5fei")

  // remove
  collection.schema.removeField("bwbjoe6l")

  return dao.saveCollection(collection)
})
