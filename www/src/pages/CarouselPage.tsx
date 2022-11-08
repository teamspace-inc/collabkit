import { Carousel } from '../Carousel';

export function CarouselPage() {
  return (
    <Carousel
      style={{}}
      slides={[
        <div style={{ width: 200, height: 200, background: 'blue' }} />,
        <div style={{ width: 200, height: 200, background: 'blue' }} />,
        <div style={{ width: 200, height: 200, background: 'blue' }} />,
        <div style={{ width: 200, height: 200, background: 'blue' }} />,
        <div style={{ width: 200, height: 200, background: 'blue' }} />,
        <div style={{ width: 200, height: 200, background: 'blue' }} />,
        <div style={{ width: 200, height: 200, background: 'blue' }} />,
      ]}
    ></Carousel>
  );
}
