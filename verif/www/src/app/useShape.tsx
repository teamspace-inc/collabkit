'use client';
import { useCallback, useRef } from 'react';
import { proxy } from 'valtio';
import { ShapeStore } from './page';

export function useShape() {
  const storeRef = useRef(
    proxy<ShapeStore>({
      selectedQueryId: '1',
      queries: {
        '1': {
          id: '1',
          question: 'What are the largest orders by country?',
          timestamp: '11:32am',
          verified: false,
          answer: 'The largest orders by country are as follows: [Chart](/chart)',
          explanation: `This SQL query retrieves data from three tables: orders, customers, and order_details. It calculates the total sales for each order and customer combination where the sales are greater than 1000 and the order date is between January 1, 2022, and December 31, 2022. The result set includes the order ID, customer name, and total sales.

          Here is a step-by-step breakdown of the SQL query:
          
          The SELECT statement specifies which columns to include in the result set:
          
          orders.order_id selects the order ID from the orders table.
          customers.customer_name selects the customer name from the customers table.
          SUM(order_details.quantity * order_details.unit_price) AS total_sales calculates the total sales by multiplying the quantity and unit price for each item in the order, summing the results, and assigning the alias "total_sales" to the result.
          The FROM clause specifies the tables to retrieve data from: orders, customers, and order_details.
          
          The INNER JOIN clauses specify how the tables are related:
          
          INNER JOIN customers ON orders.customer_id = customers.customer_id joins the orders and customers tables on the customer_id column.
          INNER JOIN order_details ON orders.order_id = order_details.order_id joins the orders and order_details tables on the order_id column.
          The WHERE clause filters the data based on the order date, which must be between January 1, 2022, and December 31, 2022.
          
          The GROUP BY clause groups the result set by the order ID and customer name.
          
          The HAVING clause filters the groups based on the total sales, which must be greater than 1000.
          
          The ORDER BY clause sorts the result set by total sales in descending order.`,
          sql: `SELECT orders.order_id, customers.customer_name, SUM(order_details.quantity * order_details.unit_price) AS total_sales
          FROM orders
          INNER JOIN customers ON orders.customer_id = customers.customer_id
          INNER JOIN order_details ON orders.order_id = order_details.order_id
          WHERE orders.order_date BETWEEN '2022-01-01' AND '2022-12-31'
          GROUP BY orders.order_id, customers.customer_name
          HAVING total_sales > 1000
          ORDER BY total_sales DESC;`,
          error: null,
        },
        '2': {
          id: '2',
          question: 'What is the highest grossing video game of all time?',
          timestamp: '4:15pm',
          verified: true,
          answer: `The highest grossing video game of all time is Minecraft, which has sold over 200 million copies and made over $2.5 billion in revenue.`,
          explanation: `Minecraft is a sandbox video game developed by Mojang Studios. It was first released in 2011 and has since become one of the best-selling video games of all time. The game allows players to build and explore virtual worlds made up of blocks. Minecraft has a massive following, with millions of players around the world. The game is available on multiple platforms, including PC, Xbox, PlayStation, and mobile devices.`,
          sql: `SELECT game_title, SUM(global_sales) AS total_sales FROM video_games GROUP BY game_title ORDER BY total_sales DESC LIMIT 1;`,
          error: null,
        },
        '3': {
          id: '3',
          question: 'What is the population of Tokyo?',
          timestamp: '9:40am',
          verified: true,
          answer: 'The population of Tokyo is approximately 13.96 million people.',
          explanation: `Tokyo is the capital city of Japan and is one of the most populous cities in the world. The city is a center for finance, technology, and culture. Tokyo has a diverse population and is known for its vibrant neighborhoods, delicious food, and rich history.`,
          sql: `SELECT population FROM cities WHERE city_name = 'Tokyo';`,
          error: null,
        },
      },
    })
  );

  const verify = useCallback((queryId: string) => {}, []);
  const unverify = useCallback((queryId: string) => {}, []);
  const runQuery = useCallback((queryId: string) => {}, []);
  const loadQueries = useCallback(() => {}, []);

  const actions = {
    verify,
    unverify,
    loadQueries,
    runQuery,
  };
  const store = storeRef.current;

  return { store, actions };
}
