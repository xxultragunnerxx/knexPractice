require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

knexInstance.from('amazong_products').select('*').then(
  result => {
        console.log(result)
    })

console.log('knex and driver installed correctly');
