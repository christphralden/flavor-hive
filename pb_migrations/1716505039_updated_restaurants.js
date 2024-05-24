/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mam6pkp394tiics")

  // remove
  collection.schema.removeField("ja9zzxp8")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kxb8bxb4",
    "name": "restaurantOwner",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
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

  // remove
  collection.schema.removeField("kxb8bxb4")

  return dao.saveCollection(collection)
})
