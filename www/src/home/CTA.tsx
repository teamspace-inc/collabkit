import { root } from "../styles/home/CTA.css";
import { GetStartedButton } from "./GetStartedButton";
import { RequestDemoButton } from "./RequestDemoButton";

export function CTA(props: { size?: 'small' | 'medium' | 'large' }) {
  return <div className={root}>
    <GetStartedButton size={props.size} />
    <RequestDemoButton size={props.size} />
  </div >
}