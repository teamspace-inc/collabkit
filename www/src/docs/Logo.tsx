import { navLogoOuter, navLogoInner } from '../styles/Docs.css';
import LogoSvg from '../Logo.svg';
export function Logo() {
  return (
    <div className={navLogoOuter}>
      <div className={navLogoInner}>
        <img src={LogoSvg} />
      </div>
    </div>
  );
}
