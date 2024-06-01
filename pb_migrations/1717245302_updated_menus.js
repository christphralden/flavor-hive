/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rck7misxygxago0")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "npdeoj8e",
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
  const collection = dao.findCollectionByNameOrId("rck7misxygxago0")

  // remove
  collection.schema.removeField("npdeoj8e")

  return dao.saveCollection(collection)
})
