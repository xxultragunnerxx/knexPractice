require('dotenv').config()
const knex = require('knex')

const ShoppingListServices = {
  getAllItems(knex){
    return knex
      .select('*')
      .from('shopping_list')
  },
  insertItems(knex, newItem){
    return knex('shopping_list')
      .insert(newItem)
      .into('shopping_list')
      .returning('*')
      then(rows => rows[0])
  },
  updateItems(knex, id, newItem){
    return knex('shopping_list')
      .where({id})
      .update(newItem)
  },
  deleteItems(knex, id){
    return knex('shopping_list')
    .where({id})
    .delete()

  }

}

module.export = ShoppingListServices;
