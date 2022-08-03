import { Button, HStack, Section, Title, VStack, Text } from '../UIKit';

export function AppList() {
  return (
    <Section>
      <VStack style={{ alignItems: 'center' }}>
        <Title>Your Apps</Title>
        <Text>
          We suggest naming the app after your product and environment, e.g. dev, staging, prod.
        </Text>
        <HStack style={{ gap: '1rem' }}>
          <input
            placeholder="name-prod"
            style={{
              width: '30ch',
              fontSize: '1.5rem',
              padding: '0.75rem 1.5rem',
              border: '2px solid #222',
              borderRadius: '100px',
            }}
            type="text/email"
          />
          <Button>Create New App</Button>
        </HStack>
      </VStack>
    </Section>
  );
}
