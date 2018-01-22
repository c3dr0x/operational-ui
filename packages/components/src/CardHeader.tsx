import * as React from "react"
import glamorous, { GlamorousComponent } from "glamorous"
import { Theme } from "@operational/theme"

export interface IProps {
  id?: string | number
  css?: any
  className?: string
  children?: React.ReactNode
}

const Container = glamorous.div(({ theme }: { theme: Theme }): any => ({
  ...theme.typography.heading1,
  label: "cardheader",
  display: "flex",
  alignItems: "center",
  // This ensures that the card header text and card controls are placed in opposite corners.
  justifyContent: "space-between",
  height: 36,
  margin: theme.spacing * -1,
  marginBottom: theme.spacing * 4 / 3,
  padding: `0 ${theme.spacing}px`,
  borderBottom: `1px solid ${theme.colors.separator}`,
  fontWeight: 700,
  lineHeight: 1,
  color: theme.colors.emphasizedText
}))

export default (props: IProps) => (
  <Container key={props.id} css={props.css} className={props.className}>
    {props.children}
  </Container>
)