import { orange } from '@radix-ui/colors';
import * as Tooltip from '@radix-ui/react-tooltip';
import { styled } from '@stitches/react';
import { WarningCircle } from 'phosphor-react';
import { Component, ErrorInfo } from 'react';

const TooltipTrigger = styled(Tooltip.Trigger, {
  color: orange.orange9,
  pointerEvents: 'all',
  background: 'none',
  border: 'none',

  '&:hover': {
    color: orange.orange10,
  },
});

const ErrorComponent = ({ description }: { description: string }) => (
  <Tooltip.Provider>
    <Tooltip.Root delayDuration={0}>
      <TooltipTrigger>
        <WarningCircle size={32} />
      </TooltipTrigger>
      <Tooltip.Content side="right">{description}</Tooltip.Content>
    </Tooltip.Root>
  </Tooltip.Provider>
);

type ShapeErrorBoundaryProps = { description: string };

export class ShapeErrorBoundary extends Component<ShapeErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorComponent description={this.props.description} />;
    }

    return this.props.children;
  }
}
