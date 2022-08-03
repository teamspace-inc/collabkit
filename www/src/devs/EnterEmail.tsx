import { Button, HStack, LoadingButton, Section, Text, Title, VStack } from '../UIKit';
import { devEvents } from './devEvents';

export function EnterEmail() {
  return (
    <div>
      <Section>
        <VStack style={{ alignItems: 'center' }}>
          <Title>Enter your email</Title>
          <Text>
            We suggest using the <b>email address you use at work.</b>
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
      </Section>
    </div>
  );
}
