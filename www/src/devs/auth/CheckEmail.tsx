import { LoadingButton, HStack, Section, Text, Title, VStack } from '../../UIKit';
import { devStore } from '../devStore';
import { useSnapshot } from 'valtio';
import { devEvents } from '../devEvents';

export function CheckEmail() {
  const { email } = useSnapshot(devStore);

  return (
    <VStack>
      <Section>
        <VStack style={{ alignItems: 'center' }}>
          <Title>Check your email</Title>
          <Text>
            We've sent a magic link to <b>{email}</b> click on it to continue.
          </Text>
          <HStack style={{ gap: '1rem' }}>
            <LoadingButton onClick={(e) => devEvents.onAuthFormSubmit()}>
              Resend Magic Link
            </LoadingButton>
          </HStack>
        </VStack>
      </Section>
    </VStack>
  );
}
