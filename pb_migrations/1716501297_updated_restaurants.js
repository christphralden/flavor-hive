/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mam6pkp394tiics")

  // remove
  collection.schema.removeField("fp7xj6ug")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ny7lgrxd",
    "name": "keywords",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mam6pkp394tiics")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fp7xj6ug",
    "name": "keywords",
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
  collection.schema.removeField("ny7lgrxd")

  return dao.saveCollection(collection)
})
