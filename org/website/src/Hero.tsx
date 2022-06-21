import { mauve } from '@radix-ui/colors';
import { Grid, Inset, Center, VStack, Button } from './Dashboard';

export function Hero() {
  return (
    <Grid layout="col2">
      <Inset>
        <Center>
          <VStack>
            <h1
              style={{
                fontSize: '4rem',
                lineHeight: '1',
                margin: '0 0 0.5rem',
              }}
            >
              Add collaboration to your web app.
            </h1>
            <p style={{ fontSize: '1.33rem', color: mauve.mauve11, lineHeight: 1.414 }}>
              CollabKit lets you add commenting to your web app so your users from the same team or
              company, can collaborate in context.
              <br />
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Button type="cta">Get started</Button>
              <Button type="secondary">Book a demo</Button>
            </div>
          </VStack>
        </Center>
      </Inset>
    </Grid>
  );
}
