import { Message } from "./lib/message.jsx";
import { parse } from "./lib/parse.jsx";
import { styles, constant } from "./lib/styles.jsx";

export const command = "USER=ddyjis /usr/local/bin/yabai -m query --windows";
export const refreshFrequency = 500;

const style = {
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    display: "inline",
    fontFamily: styles.fontFamily,
    fontSize: styles.fontSize,
    lineHeight: styles.lineHeight,
    opacity: styles.opacity,
    zIndex: styles.zIndex + 1,

    padding: "0 2ch",

    position: "fixed",
    top: constant.gap,
    left: "50%",
    transform: "translateX(-50%)",
}

export const render = ({ output }) => {
    const data = parse(output);
    if (typeof data === 'undefined') {
        return (
            <div style={style}>
                <Message msg={`Cannot parse script output '${output}'`}></Message>
            </div>
        )
    }
    return <div style={style}>{
        data
            .filter((o) => o.focused)
            .map((o) => {
                let title = o.title;
                if (title.length > constant.title.maxLength) {
                    title = `${title.substring(0, constant.title.maxLength)}...`;
                }
                return `${title} | ${o.app}`;
            })
    }</div>
}