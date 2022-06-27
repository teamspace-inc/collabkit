import { Grid, Inset, Slide, VStack, TextCenter, H1 } from './UIKit';

export function Upside() {
  return (
    <Grid cols={1}>
      <Inset>
        <TextCenter>
          <Slide>
            <VStack style={{ maxWidth: '960px' }}>
              <H1 style={{ marginBottom: 0 }}>
                Increase growth, engagement
                <br /> &amp; retention.
              </H1>
            </VStack>
          </Slide>
        </TextCenter>
      </Inset>
    </Grid>
  );
}
