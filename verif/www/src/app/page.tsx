'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { proxy, useSnapshot } from 'valtio';
import { Pie, PieChart, Sector } from 'recharts';
import { CheckCircle, Clock } from '@phosphor-icons/react';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

function Chart() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={(_, index) => setActiveIndex(index)}
        />
      </PieChart>
    </div>
  );
}

const ButtonStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '8px 16px',
  border: '1px solid #2D302F',
  borderRadius: '8px',
  gap: '8px',
  background: 'none',
};

const ButtonHoverStyle: React.CSSProperties = {
  background: '#2D302F',
  cursor: 'pointer',
};

const ButtonTextStyle: React.CSSProperties = {
  fontWeight: 500,
  fontSize: '12px',
  color: 'white',
  lineHeight: '20px',
};

const ButtonIconStyle: React.CSSProperties = {};

const MainStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  display: 'grid',
  gridTemplateColumns: '284px 1fr',

  // to inset with a max width uncomment these styles
  // border: '1px solid #2D302F',
  // borderRadius: '8px',
  // maxWidth: 960,
  // margin: '40px auto',
  minHeight: '100vh',
};

const MessageStyle: React.CSSProperties = {
  background: '#2D302F',
  border: '1px solid #2D302F',
  borderRadius: '8px',
  padding: '4px 12px',
  fontSize: 15,
  lineHeight: '28px',
  color: 'rgba(255, 255, 255, 0.9)',
  fontFamily: 'Inter, sans-serif',
};

const OutputStyle: React.CSSProperties = {
  ...MessageStyle,
  background: 'transparent',
};

const AgentProcessingStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
};

const AgentOutputStyle: React.CSSProperties = {
  whiteSpace: 'pre-wrap',
  fontFamily: 'Menlo, monospace',
  color: '#929896',
  fontSize: 12,
  lineHeight: '20px',
};

const AnswerStyle: React.CSSProperties = {
  ...MessageStyle,
  background: 'transparent',
};

const MessageListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '0px 24px',
  gap: 12,
  flex: 0,
  marginTop: 12,
  width: '100%',
  maxWidth: '652px',
};

const InputStyle: React.CSSProperties = {
  ...MessageStyle,
  backgroundColor: '#2D302F',
  color: 'rgba(255, 255, 255, 0.9)',
  border: 'none',
  marginTop: '12px',
  borderRadius: '8px',
  outline: 'none',
  width: '100%',
};

const CursorStyle: React.CSSProperties = {
  width: '2px',
  height: '1em',
  position: 'relative',
  top: '0.25em',
  background: 'rgba(255,255,255,0.9)',
  display: 'inline-block',
};

const HiddenStyle: React.CSSProperties = {
  display: 'none',
};

const SpacerStyle: React.CSSProperties = {
  flex: 1,
};

const FormStyle: React.CSSProperties = {
  display: 'flex',
  padding: '10px 20px 20px',
  background: '#151817',
  position: 'sticky',
  bottom: 0,
  marginTop: 20,
  width: '100%',
  maxWidth: '652px',
};

const ConnectionStyle: React.CSSProperties = {
  position: 'fixed',
  top: 24,
  right: 24,
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'rgba(255,255,255,0.5)',
};

const ListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #2D302F',
};

const ListItemStyle: React.CSSProperties = {
  display: 'flex',
  padding: 16,
  flexDirection: 'column',
  gap: '12px',
};

const ListItemHoverStyle: React.CSSProperties = {
  background: '#1D1F1F',
  cursor: 'pointer',
};

const ListItemHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
};

const UnverifiedStyle: React.CSSProperties = {
  color: '#FBCC64',
  fontSize: '12px',
  lineHeight: '15px',
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
};

const VerifiedStyle: React.CSSProperties = {
  color: '#5BA97D',
  fontSize: '12px',
  lineHeight: '15px',
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
};

const TimestampStyle: React.CSSProperties = {
  color: '#929896',
  fontSize: '12px',
  display: 'flex',
  lineHeight: '15px',
  gap: '8px',
};

const ListItemQuestionStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  color: 'white',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
};

const ListHeaderStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: '20px',
  height: 52,
  padding: 16,
  color: 'white',
};

const QueryDetailViewStyle: React.CSSProperties = {
  display: 'flex',
  padding: 16,
  flexDirection: 'column',
  gap: '16px',
};

const QuestionStyle: React.CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '18px',
  color: 'white',
};

const DividerStyle: React.CSSProperties = {
  background: '#2D302F',
  width: '100%',
  height: '1px',
  display: 'flex',
};

const ChartWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const SQLStyle: React.CSSProperties = {
  fontFamily: 'Menlo, monospace',
  whiteSpace: 'pre-wrap',
  color: 'white',
  fontSize: 12,
  border: '1px solid #2D302F',
  lineHeight: '20px',
  padding: 16,
};

const ActionBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: '12px',
};

type Query = {
  id: string;
  question: string;
  timestamp: string;
  verified: boolean;
  answer: string;
  explanation: string;
  sql: string;
  error: string | null;
};

type Queries = Record<string, Query>;

type ShapeStore = {
  queries: Queries;
  selectedQueryId: string | null;
};

function useShape() {
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

function useHover<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const [isHovered, setHovered] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseEnter);
      node.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        node.removeEventListener('mouseenter', handleMouseEnter);
        node.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [ref.current]);

  return [ref, isHovered];
}

function useHoverStyle<T extends HTMLElement>(
  style: React.CSSProperties,
  hoverStyle: React.CSSProperties
): [React.RefObject<T>, React.CSSProperties] {
  const [ref, isHovered] = useHover<T>();

  return [
    ref,
    {
      ...style,
      ...(isHovered ? hoverStyle : {}),
    },
  ];
}

function ListItem({ queryId, query }: { queryId: string; query: Query }) {
  const [ref, listItemStyle] = useHoverStyle<HTMLDivElement>(ListItemStyle, ListItemHoverStyle);

  return (
    <div style={listItemStyle} key={queryId} ref={ref}>
      <div style={ListItemHeaderStyle}>
        <div style={query.verified ? VerifiedStyle : UnverifiedStyle}>
          {query.verified ? <CheckCircle size={16} /> : <Clock size={16} />}
          {query.verified ? 'Verified' : 'Unverified'}
        </div>
        <div style={SpacerStyle}></div>
        <div style={TimestampStyle}>{query.timestamp}</div>
      </div>
      <div style={ListItemQuestionStyle}>{query.question}</div>
    </div>
  );
}

function Button(props: {
  icon: React.ReactNode;
  text: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  const [ref, buttonStyle] = useHoverStyle<HTMLButtonElement>(ButtonStyle, ButtonHoverStyle);

  return (
    <button style={buttonStyle} ref={ref}>
      <div style={ButtonTextStyle}>{props.text}</div>
      <div style={ButtonIconStyle}>{props.icon}</div>
    </button>
  );
}

export default function Home() {
  const { store, actions } = useShape();
  const { queries, selectedQueryId } = useSnapshot(store);

  useEffect(() => {
    actions.loadQueries();
  }, [actions]);

  const listItems = [];
  for (const queryId in queries) {
    const query = queries[queryId];
    listItems.push(<ListItem queryId={queryId} query={query} />);
  }

  const selectedQuery = selectedQueryId ? queries[selectedQueryId] : null;

  return (
    <main style={MainStyle}>
      <div style={ListStyle}>
        <div style={ListHeaderStyle}>Queries</div>
        <>{listItems}</>
      </div>
      <div style={QueryDetailViewStyle}>
        {selectedQuery ? (
          <>
            <div style={QuestionStyle}>{selectedQuery.question}</div>
            <div style={DividerStyle}></div>
            <div style={AnswerStyle}>{selectedQuery.answer}</div>
            <div style={ChartWrapperStyle}>
              <Chart />
            </div>
            <div style={ActionBarStyle}>
              <Button
                icon={<CheckCircle size={16} color="#5BA97D" />}
                text={selectedQuery.verified ? 'Unverify' : 'Verify'}
                onClick={() =>
                  selectedQuery.verified
                    ? actions.unverify(selectedQuery.id)
                    : actions.verify(selectedQuery.id)
                }
              />
              <Button
                onClick={() => actions.runQuery(selectedQuery.id)}
                text="Run Query"
                icon={null}
              />
            </div>
            <div style={SQLStyle}>{selectedQuery.sql}</div>
          </>
        ) : null}
      </div>
    </main>
  );
}
