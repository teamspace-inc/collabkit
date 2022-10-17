import { Auth } from '../../../UIKit';
import { dashboardEvents } from '../../dashboardEvents';

// same for signin and signup
export function EnterEmail(props: { isReentry?: boolean }) {
  return (
    <div>
      <Auth>
        <div style={{ alignItems: 'flex-start' }}>
          <h2>{props.isReentry ? 'Re-enter' : 'Enter'} your email</h2>
          <div>
            We recommend using your <b>work email address</b>.
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dashboardEvents.onAuthFormSubmit();
            }}
          >
            <div style={{ gap: '1rem' }}>
              <input
                placeholder="name@work-email.com"
                style={{}}
                type="email"
                onChange={(e) => dashboardEvents.onEmailInputChange(e)}
              />
              {/* isLoading={false} */}
              <div onClick={() => dashboardEvents.onAuthFormSubmit()}>Continue</div>
            </div>
          </form>
        </div>
      </Auth>
    </div>
  );
}
