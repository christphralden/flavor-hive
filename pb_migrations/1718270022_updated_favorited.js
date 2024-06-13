/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("96p3rrnv6rn73s7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "viegh8mx",
    "name": "favorited",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("96p3rrnv6rn73s7")

  // remove
  collection.schema.removeField("viegh8mx")

  return dao.saveCollection(collection)
})
