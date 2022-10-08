import { dark, light } from '../styles/Theme.css';
import { a, bg, button, tab, tabs, website } from '../styles/Website.css';

function renderPage() {
  return (
    <>
      <h1>Header 1</h1>
      <h2>Header 2</h2>
      <h3>Header 3</h3>
      <h4>Header 4</h4>
      <h5>Header 5</h5>

      <p>Hello world this is a paragraph.</p>
      <section className={dark} style={{ background: '#35284A', marginLeft: '-100px' }}>
        <h1>Section Title</h1>
        <h3>Section Description</h3>
        <p>Section Body</p>
        <div className={tabs}>
          <div className={tab()}>Tab 1</div>
          <div className={tab({ active: true })}>Tab 2</div>
          <div className={tab()}>Tab 3</div>
        </div>
      </section>
      <div>This is a div</div>
      <code>This is code</code>
      <a href="#" className={a}>
        This is a link
      </a>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button className={button({ type: 'primary', size: 'large' })}>Large Button</button>
        <button className={button({ type: 'secondary', size: 'large' })}>Large Button</button>
        <button className={button({ type: 'tertiary', size: 'large' })}>Large Button</button>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button className={button({ type: 'primary', size: 'medium' })}>Medium Button</button>
        <button className={button({ type: 'secondary', size: 'medium' })}>Medium Button</button>
        <button className={button({ type: 'tertiary', size: 'medium' })}>Medium Button</button>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button className={button({ type: 'primary', size: 'small' })}>Small Button</button>
        <button className={button({ type: 'secondary', size: 'small' })}>Small Button</button>
        <button className={button({ type: 'tertiary', size: 'small' })}>Small Button</button>
      </div>
    </>
  );
}

const style: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '40px',
  alignItems: 'flex-start',
  padding: 100,
};

export function UIPage() {
  return (
    <div>
      <div className={`${website} ${bg} ${dark}`} style={style}>
        {renderPage()}
      </div>
      <div className={`${website} ${bg} ${light} `} style={style}>
        {renderPage()}
      </div>
    </div>
  );
}
