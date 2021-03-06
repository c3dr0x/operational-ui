import * as React from "react"
import styled from "react-emotion"
import colorCalculator from "tinycolor2"

import { OperationalStyleConstants, expandColor } from "../utils/constants"
import { Icon } from "../"
import { WithTheme } from "../types"

export interface Props {
  className?: string
  /** Message contents, can be any html element/React fragment. */
  children?: React.ReactNode
  /** Background message color */
  color?: string
  /** Called when close icon is clicked. Icon is not rendered at all if this prop is not specified. */
  onClose?: () => void
}

const Container = styled("div")(({ theme, color }: { theme?: OperationalStyleConstants; color?: string }) => {
  const backgroundColor = colorCalculator(expandColor(theme, color) || theme.color.primary)
    .setAlpha(0.9)
    .toString()
  return {
    backgroundColor,
    color: theme.color.white,
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0, 0, 0, .15)",
    padding: "8px 52px 8px 16px",
    borderRadius: theme.borderRadius,
    minHeight: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    maxWidth: 400,
  }
})

const IconContainer = styled("div")(({ theme }: WithTheme) => ({
  position: "absolute",
  top: 0,
  right: 0,
  cursor: "pointer",
  width: 36,
  height: 36,
  borderBottomLeftRadius: theme.borderRadius,
  borderTopRightRadius: theme.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
}))

const Message = (props: Props) => (
  <Container className={props.className} color={props.color}>
    <IconContainer onClick={props.onClose}>
      <Icon name="No" />
    </IconContainer>
    {props.children}
  </Container>
)

export default Message
