import { vars } from '../../styles/Theme.css';
import { useHeaderStyle } from '../../hooks/useHeaderStyle';
import { PLANS } from '../Plans';
import { vertical20 } from '../../styles/Website.css';

export function SmallPlans() {
  const { ref } = useHeaderStyle({ backgroundColor: vars.color.ice, theme: 'light' });

  return (
    <section ref={ref} style={{ background: vars.color.ice }} id="Pricing">
      <div className={vertical20}>
        <h1>Pricing</h1>
        <h3 style={{ color: '#8093A7' }}>Packages that grow with your business</h3>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '20px',
          flexDirection: 'column',
          marginTop: '60px',
        }}
      >
        {PLANS}
      </div>
    </section>
  );
}
