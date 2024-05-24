/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("42jwqnfwifpnpg8");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "42jwqnfwifpnpg8",
    "created": "2024-05-23 21:49:44.298Z",
    "updated": "2024-05-23 21:49:44.298Z",
    "name": "restautrant_menus",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wstg9eig",
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
        "id": "twuvg6bh",
        "name": "menu",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "rck7misxygxago0",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
