'use client';
import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { Pie, PieChart, Sector } from 'recharts';
import { CheckCircle, Clock, Play } from '@phosphor-icons/react';
import {
  ListItemStyle,
  ListItemHoverStyle,
  ListItemHeaderStyle,
  VerifiedStyle,
  UnverifiedStyle,
  SpacerStyle,
  TimestampStyle,
  ListItemQuestionStyle,
  MainStyle,
  ListStyle,
  ListHeaderStyle,
  QueryDetailViewStyle,
  QuestionStyle,
  DividerStyle,
  AnswerStyle,
  ChartWrapperStyle,
  ActionBarStyle,
  SQLStyle,
} from '../styles';
import { useShape } from './../useShape';
import { useHoverStyle } from './../useHoverStyle';
import { Button } from './Button';
import { Query } from '../types';

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

export default function Inbox() {
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
                onClick={() => actions.runQuery(selectedQuery.id)}
                text="Run Query"
                icon={<Play size={16} color="#fff" />}
              />
              <div style={SpacerStyle} />
              <Button
                icon={<CheckCircle size={16} color="#5BA97D" />}
                text={selectedQuery.verified ? 'Unverify' : 'Verify'}
                onClick={() =>
                  selectedQuery.verified
                    ? actions.unverify(selectedQuery.id)
                    : actions.verify(selectedQuery.id)
                }
              />
            </div>
            <div style={SQLStyle}>{selectedQuery.sql}</div>
          </>
        ) : null}
      </div>
    </main>
  );
}
