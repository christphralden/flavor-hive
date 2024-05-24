/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mam6pkp394tiics")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ja9zzxp8",
    "name": "restaurantOwnerId",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mam6pkp394tiics")

  // remove
  collection.schema.removeField("ja9zzxp8")

  return dao.saveCollection(collection)
})
