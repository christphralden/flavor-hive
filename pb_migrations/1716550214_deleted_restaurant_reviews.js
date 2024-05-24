/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("g06kvgpu71h4rz3");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "g06kvgpu71h4rz3",
    "created": "2024-05-23 21:42:18.653Z",
    "updated": "2024-05-24 10:56:01.457Z",
    "name": "restaurant_reviews",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0eiran6q",
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
      },
      {
        "system": false,
        "id": "agd6wupo",
        "name": "review",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "ak9efkzh5it5fei",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
