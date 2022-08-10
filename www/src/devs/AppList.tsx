import { Button, HStack, Title, VStack, Text, Page, H2, Auth } from '../UIKit';

export function EntityName() {
  return (
    <Page>
      <Auth>
        <VStack style={{ alignItems: 'flex-start' }}>
          <H2>What's the name of your company or product?</H2>
          <Text>
            This is the name your users will see in email footers and other places.{' '}
            <b>You can change this later.</b>
          </Text>
          <HStack style={{ gap: '1rem' }}>
            <input
              placeholder="Ex. Acme or AwesomeDashboard"
              style={{
                width: '30ch',
                fontSize: '1.5rem',
                padding: '0.75rem 1.5rem',
                border: '2px solid #222',
                borderRadius: '100px',
              }}
              type="text/email"
            />
            <Button>Continue</Button>
          </HStack>
        </VStack>
      </Auth>
    </Page>
  );
}
