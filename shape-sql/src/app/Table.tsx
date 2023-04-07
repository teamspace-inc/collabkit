'use client';
import styles from './page.module.css';

function Table() {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Feature</th>
          <th>Shape</th>
          <th>Postgres</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
        <tr>
          <td>Query language</td>
          <td>Foo</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}
