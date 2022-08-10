import { Auth, H2, HStack, LoadingButton, Page, Text, Title, VStack } from '../../UIKit';
import { devEvents } from '../devEvents';

export function EnterEmail(props: { isReentry?: boolean }) {
  return (
    <div>
      <Page>
        <Auth>
          <VStack style={{ alignItems: 'flex-start' }}>
            <H2>{props.isReentry ? 'Re-enter' : 'Enter'} your email</H2>
            <Text>
              We recommend using your <b>work email address</b>.
            </Text>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                devEvents.onAuthFormSubmit();
              }}
            >
              <HStack style={{ gap: '1rem' }}>
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
                <LoadingButton isLoading={false} onClick={() => devEvents.onAuthFormSubmit()}>
                  Continue
                </LoadingButton>
              </HStack>
            </form>
          </VStack>
        </Auth>
      </Page>
    </div>
  );
}
