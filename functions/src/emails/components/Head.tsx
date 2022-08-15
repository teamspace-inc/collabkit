import React, { ReactElement } from 'react';
import { MjmlHead, MjmlFont, MjmlAttributes, MjmlAll, MjmlStyle, MjmlRaw } from 'mjml-react';
import { black, grayDark } from './theme';

type HeadProps = { children?: ReactElement };

const Head: React.FC<HeadProps> = ({ children }) => {
  return (
    <MjmlHead>
      <MjmlRaw>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </MjmlRaw>
      <MjmlFont
        name="Inter"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900"
      />
      <MjmlStyle>{`
        .smooth {
          -webkit-font-smoothing: antialiased;
        }
        .paragraph a {
          color: ${black} !important;
        }

        .avatar > div {
          width: 28px;
          height: 28px;
          background-color: #FBC858;
          text-align: center !important;
          line-height: 28px;
          padding: 0;
          font-size: 12px;
          display: block;
          border-radius: 14px;
        }

        .avatar.color.tomato > div  {
          background-color: #E06346;
        }
        .avatar.color.red > div {
          background-color: #E55D59;
        }
        .avatar.color.crimson > div {
          background-color: #E25982;
        }
        .avatar.color.pink > div  {
          background-color: #D556A1;
        }
        .avatar.color.plum > div  {
          background-color: #AF5BBD;
        }
        .avatar.color.purple > div  {
          background-color: #905EC9;
        }
        .avatar.color.violet > div  {
          background-color: #7166D3;
        }
        .avatar.color.indigo > div  {
          background-color: #4D71DF;
        }
        .avatar.color.blue > div  {
          background-color: #419AF9;
        }
        .avatar.color.cyan > div  {
          background-color: #3AAAC6;
        }
        .avatar.color.teal > div  {
          background-color: #41AB9E;
        }
        .avatar.color.grass > div  {
          background-color: #64AC69;
        }
        .avatar.color.brown > div  {
          background-color: #B58760;
        }
        .avatar.color.orange > div  {
          background-color: #F5813B;
        }
        .avatar.color.sky > div  {
          background-color: #92E4FD;
        }
        .avatar.color.mint > div  {
          background-color: #9FEFD7;
        }
        .avatar.color.lime > div  {
          background-color: #C9EB59;
        }
        .avatar.color.yellow > div  {
          background-color: #FFEC6B;
        }
        .avatar.color.amber > div  {
          background-color: #FBC858;
        }

        .li {
          text-indent: -18px;
          margin-left: 24px;
          display: inline-block;
        }
        .footer a {
          text-decoration: none !important;
          color: ${grayDark} !important;
        }
        .dark-mode {
          display: none;
        }
        @media (min-width:480px) {
          td.hero {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
        @media (prefers-color-scheme: dark) {
          .paragraph > *, .paragraph a, .li > div {
            color: #fff !important;
          }
          .dark-mode {
            display: inherit;
          }
          .light-mode {
            display: none;
          }
        }
      `}</MjmlStyle>
      <MjmlAttributes>
        <MjmlAll
          font-family='Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          font-weight="400"
        />
      </MjmlAttributes>
      {children}
    </MjmlHead>
  );
};

export default Head;
