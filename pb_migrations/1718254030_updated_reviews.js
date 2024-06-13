/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ak9efkzh5it5fei")

  // remove
  collection.schema.removeField("nthslapn")

  // remove
  collection.schema.removeField("dojqnufv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jidgh622",
    "name": "spent",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ak9efkzh5it5fei")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nthslapn",
    "name": "minPriceRange",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dojqnufv",
    "name": "maxPriceRange",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": false
    }
  }))

  // remove
  collection.schema.removeField("jidgh622")

  return dao.saveCollection(collection)
})
