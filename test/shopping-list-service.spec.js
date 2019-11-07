const ShoppingListServices = require('../src/shopping-list-services.js')
const knex = require('knex')

describe('Shopping List Service Object', function() {
  let db
  let testItems = [
    {
      id: 100,
      name:'one',
      date_added: new Date('2100-05-10T16:28:32.615Z'),
      price:'9.99',
      category:'Main'
    },
    {
      id: 200,
      name:'dueces',
      date_added: new Date('2102-05-10T16:28:32.615Z'),
      price:'9.99',
      category:'Main'
    },
    {
      id: 300,
      name:'trewey',
      date_added: new Date('2102-05-10T16:28:32.615Z'),
      price:'9.99',
      category:'Snack'
    },
    {
      id: 400,
      name:'four',
      date_added: new Date('2103-05-10T16:28:32.615Z'),
      price:'9.99',
      category:'Breakfast'
    },
    {
      id: 500,
      name:'five',
      date_added: new Date('2104-05-10T16:28:32.615Z'),
      price:'9.99',
      category:'Main'
    },
    {
      id: 600,
      name:'six',
      date_added: new Date('2105-05-10T16:28:32.615Z'),
      price:'9.99',
      category:'Lunch'
    },
    {
      id: 700,
      name:'seven',
      date_added: new Date('2106-05-10T16:28:32.615Z'),
      price:'9.99',
      category:'Main'
    }
  ]

    before(() => {
      db = knex({
        client: 'pg',
        connection: process.env.DB_URL,
      })
    })

    before(() => db('shopping_list').truncate())

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())

    context(`Given 'shopping_list' has data`, () => {
      beforeEach(() => {
        return db
          .into('shopping_list')
          .insert(testItems)
      })

      it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
        const expectedItems = testItems.map(item => ({
          ...item,
          checked: false,
        }))
        return ShoppingListServices.getAllItems(db)
          .then(actual => {
            expect(actual).to.eql(expectedItems)
          })
      })

      it(`deleteItems() removes an article by id from 'shopping_list' table`, () => {
        const articleId = 3
        return ShoppingListServices.deleteItems(db, articleId)
          .then(() => ShoppingListServices.getAllItems(db))
          .then(allItems => {
            // copy the test items array without the removed article
            const expected = testItems
              .filter(article => article.id !== articleId)
              .map(item => ({
                ...item,
                checked: false,
              }))
            expect(allItems).to.eql(expected)
          })
      })

    })

    context(`Given 'shopping_list' has no data`, () => {
      it(`getAllItems() resolves an empty array`, () => {
        return ShoppingListServices.getAllItems(db)
          .then(actual => {
            expect(actual).to.eql([])
          })
      })

      it(`insertItems() inserts an article and resolves the article with an 'id'`, () => {
        const newItem = {
          name: 'Test new name name',
          price: '5.05',
          date_added: new Date('2020-01-01T00:00:00.000Z'),
          checked: true,
          category: 'Lunch',
        }
        return ShoppingListServices.insertItems(db, newItem)
          .then(actual => {
            expect(actual).to.eql({
              id: 1,
              name: newItem.name,
              price: newItem.price,
              date_added: newItem.date_added,
              checked: newItem.checked,
              category: newItem.category,
            })
          })
      })
    })
  })
