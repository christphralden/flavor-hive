/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mam6pkp394tiics")

  // remove
  collection.schema.removeField("tytulduj")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8hdeurd2",
    "name": "reviews",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "g06kvgpu71h4rz3",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": null,
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
    "id": "tytulduj",
    "name": "reviews",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "ak9efkzh5it5fei",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("8hdeurd2")

  return dao.saveCollection(collection)
})
