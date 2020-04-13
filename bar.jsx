import { Battery } from "./lib/battery.jsx";
import { Cpu } from "./lib/cpu.jsx";
import { DateTime } from "./lib/datetime.jsx";
import { Message } from "./lib/message.jsx";
import { Memory } from "./lib/memory.jsx";
// import { Network } from "./lib/network.jsx";
import { parse } from "./lib/parse.jsx";
import { styles, constant } from "./lib/styles.jsx";

export const command = "./ddyjis/lib/bar.sh";

export const refreshFrequency = 5000; // ms

const style = {
  backgroundColor: styles.backgroundColor,
  color: styles.color,
  display: "inline-block",
  fontFamily: styles.fontFamily,
  fontSize: styles.fontSize,
  lineHeight: styles.lineHeight,
  opacity: styles.opacity,
  overflow: "hidden",
  zIndex: styles.zIndex,

  padding: "0 2ch",

  position: "fixed",
  top: constant.gap,
  right: 0,

  borderTopLeftRadius: constant.borderRadius,
  borderTopRightRadius: constant.borderRadius,
  borderBottomRightRadius: constant.borderRadius,
  borderBottomLeftRadius: constant.borderRadius,
  boxShadow: "0px 1px 1px 1px rgba(0,0,0,0.15)",
}

export const render = ({ output }) => {
  const data = parse(output);
  if (typeof data === 'undefined') {
    return (
      <div style={style}>
        <Message msg={`unknown script output`} />
      </div>
    )
  }
  return <div style={style}>
    <DateTime>{data.datetime}</DateTime>
    <Battery>{data.battery}</Battery>
    <Memory>{data.memory}</Memory>
    <Cpu>{data.cpu}</Cpu>
    {/* <Network>{data.wifi}</Network> */}
  </div>
};