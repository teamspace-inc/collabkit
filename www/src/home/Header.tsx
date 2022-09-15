import { StickyHeader } from '../StickyHeader';
import { Link, HStack } from '../UIKit';
import { Logo } from '../Logo';
import { RequestDemoButton } from './Home';

export function Header(props: { invertFilter: number }) {
  return (
    <StickyHeader
      style={{ marginTop: '1rem' }}
      invertFilter={props.invertFilter}
      left={
        <Logo
          onClick={(e) => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        />
      }
      right={
        <HStack style={{ gap: '6rem', alignItems: 'center' }}>
          {window.innerWidth > 640 ? (
            <Link
              style={{ fontWeight: '500', cursor: 'pointer' }}
              onClick={() =>
                document
                  .getElementsByClassName('FooterLinks')[0]
                  .scrollIntoView({ behavior: 'smooth' })
              }
            >
              Contact us
            </Link>
          ) : null}
          <div style={{ position: 'relative' }}>
            <RequestDemoButton />
          </div>
        </HStack>
      }
    />
  );
}
