import ListsSvg from '../../assets/home/demos/Lists.svg';
import TableSvg from '../../assets/home/demos/Tables.svg';
import ChartSvg from '../../assets/home/demos/Charts.svg';
import TextSvg from '../../assets/home/demos/Text.svg';
// temp commented out until we support these
// import DetailViewsSvg from '../../assets/home/hero/DetailViews.svg';
// import MapSvg from '../../assets/home/hero/Map.svg';
// import VideoSvg from '../../assets/home/hero/Video.svg';
import * as demoStyles from '../../styles/home/Demos.css';
import { dark } from '../../styles/Theme.css';
import { h3OnPurple, purpleBg, vertical20 } from '../../styles/Website.css';

const demos = [
  { name: 'Lists', svg: ListsSvg },
  { name: 'Table', svg: TableSvg },
  { name: 'Chart', svg: ChartSvg },
  { name: 'Text', svg: TextSvg },
  // { name: 'Detail Views', svg: DetailViewsSvg },
  // { name: 'Spatial', svg: MapSvg },
  // { name: 'Video', svg: VideoSvg },
];

export function SmallDemos() {
  return (
    <section className={`${purpleBg} ${dark}`} style={{ gap: '40px' }}>
      <div className={vertical20}>
        <h1>Works with any UI</h1>
        <h3 className={h3OnPurple}>CollabKit supports multiple ways to comment</h3>
      </div>
      {demos.map((demo) => (
        <div className={vertical20}>
          <h4 className={demoStyles.h4}>{demo.name}</h4>
          {<img src={demo.svg} style={{ flex: 1, maxWidth: 'calc(100vw - 80px)' }} />}
        </div>
      ))}
    </section>
  );
}
