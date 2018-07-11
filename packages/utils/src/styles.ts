import { css } from "glamor"

import { darken } from "./color"

export const fadeIn = css.keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

export const resetTransform = css.keyframes({
  to: {
    transform: "none",
  },
})

export const spin = css.keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(359deg)",
  },
})
