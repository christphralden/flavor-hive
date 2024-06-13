/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxucim3dfx6jugx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lfctvst4",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "upvote",
        "downvote",
        "none"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hxucim3dfx6jugx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lfctvst4",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "upvote",
        "downvote"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
