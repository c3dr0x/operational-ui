import { OperationalStyleConstants } from "./utils/constants"

export type WithTheme = { theme?: OperationalStyleConstants }

/** @todo Rethink this line with Emotion */

export type Css = any // TODO: make this stricter to disallow { margin: 20, fruit: "much much" }

export type CssStatic = {}

export type MessageType = "info" | "success" | "error"
