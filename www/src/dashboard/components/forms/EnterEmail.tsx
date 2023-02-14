import { dashboardEvents } from '../../dashboardActions';

// same for signin and signup
export function EnterEmail(props: { isReentry?: boolean }) {
  return (
    <div>
      <div>
        <h2>{props.isReentry ? 'Re-enter' : 'Enter'} your email</h2>
        <p>
          We recommend using your <b>work email address</b>.
        </p>
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
    </div>
  );
}
