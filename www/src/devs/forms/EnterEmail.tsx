import { Auth, H2, Page } from '../../UIKit';
import { devEvents } from '../devEvents';

export function EnterEmail(props: { isReentry?: boolean }) {
  return (
    <div>
      <Page>
        <Auth>
          <div style={{ alignItems: 'flex-start' }}>
            <H2>{props.isReentry ? 'Re-enter' : 'Enter'} your email</H2>
            <div>
              We recommend using your <b>work email address</b>.
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                devEvents.onAuthFormSubmit();
              }}
            >
              <div style={{ gap: '1rem' }}>
                <input
                  placeholder="name@work-email.com"
                  style={{
                    width: '30ch',
                    fontSize: '1.5rem',
                    padding: '0.75rem 1.5rem',
                    border: '2px solid #222',
                    borderRadius: '100px',
                  }}
                  type="email"
                  onChange={(e) => devEvents.onEmailInputChange(e)}
                />
                {/* isLoading={false} */}
                <div onClick={() => devEvents.onAuthFormSubmit()}>Continue</div>
              </div>
            </form>
          </div>
        </Auth>
      </Page>
    </div>
  );
}
