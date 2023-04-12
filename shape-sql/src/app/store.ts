import { proxy } from 'valtio';

type Query = {
  query: string;
  result?: string;
  answer?: string;
  sql?: string;
  processing: boolean;
};

type QuerySet = {
  [query: string]: Query;
};

type Store = {
  queries: QuerySet;
};

export const store = proxy<Store>({
  queries: {},
});

// <div className={styles.container}>
// <div className={`${styles.center} ${styles.spacing}`}>
//   <Card>
//     {/* <H3>Thinking</H3>
//   <Divider /> */}
//     <Thinking queryId="" />
//     {/* <Divider /> */}
//     {/* <Table /> */}
//     {/* <Divider /> */}
//   </Card>
//   <SearchForm />

//   {/* <Divider />
// <H3>RELATED</H3>
// <Related />
// <H3>FOLLOW UP</H3>
// <SearchInput /> */}
// </div>
// </div>

{
  /* <nav className={styles.nav}>
          <Logo size="M" />
          <div
            style={{
              width: 720,
              display: 'table',
              margin: '0 auto',
              left: -110,
              position: 'relative',
            }}
          >
            <SearchForm />
          </div>
        </nav> */
}
