import { LoadingButton, HStack, Text, VStack, Page, H2, Auth } from '../../UIKit';
import { devStore } from '../devStore';
import { useSnapshot } from 'valtio';
import { devEvents } from '../devEvents';

export function CheckEmail() {
  const { forms } = useSnapshot(devStore);

  return (
    <VStack>
      <Page>
        <Auth>
          <VStack style={{ alignItems: 'flex-start' }}>
            <H2>Check your email</H2>
            <Text>
              We've sent a magic link to <b>{forms.enterEmail?.email}</b> click on it to continue.
            </Text>
            <HStack style={{ gap: '1rem' }}>
              <LoadingButton onClick={(e) => devEvents.onAuthFormSubmit()}>
                Resend Magic Link
              </LoadingButton>
            </HStack>
          </VStack>
        </Auth>
      </Page>
    </VStack>
  );
}
