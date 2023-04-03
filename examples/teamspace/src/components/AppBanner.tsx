import { Z } from 'state/constants';
import { orange, sand } from '@radix-ui/colors';
import { WarningCircle } from 'phosphor-react';
import { styled } from 'styles/stitches.config';

const AppBannerBackground = styled('div', {
  position: 'absolute',
  inset: 0,
  color: sand.sand6,
  zIndex: Z.SYSTEM_MODAL,
  background: sand.sand12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '22px',
  fontSize: 14,
  flexDirection: 'column',
});

const AppBannerButton = styled('button', {
  border: 'none',
  background: orange.orange10,
  borderRadius: 6,
  padding: '11px',
  marginTop: 11,
  color: orange.orange2,
  fontSize: 14,
  cursor: 'pointer',
});

const AppBannerText = styled('div', {
  textAlign: 'center',
  color: sand.sand8,
});

const AppBannerTitle = styled('h1', {
  color: sand.sand4,
  marginTop: 0,
});

export function AppBanner(props: { showBanner: boolean; children: React.ReactElement }) {
  return props.showBanner ? (
    <AppBannerBackground>
      <WarningCircle size={111} color={sand.sand4} weight="fill" />
      <AppBannerText>
        <AppBannerTitle>Neuron needs to update.</AppBannerTitle>
        Hey there! This version of Neuron is outdated.. <br />
        Please reload this page to update to the latest version.
      </AppBannerText>
      <AppBannerButton onClick={() => window.location.reload()}>Reload this page</AppBannerButton>
    </AppBannerBackground>
  ) : (
    <div>{props.children}</div>
  );
}
