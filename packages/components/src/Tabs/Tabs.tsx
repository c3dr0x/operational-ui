import * as React from "react"
import styled from "react-emotion"
import { withTheme } from "emotion-theming"
import { darken } from "@operational/utils"
import { OperationalStyleConstants, deprecatedExpandColor } from "../utils/constants"
import { WithTheme, Css, CssStatic } from "../types"
import Tab, { Props as TabProps } from "../Tab/Tab"

export interface Props {
  className?: string
  id?: string
  /** Index of the active tab. */

  active?: number
  /** Active color. It can be a hex value or a named theme color. */

  activeColor?: string
  children?: React.ReactNode
  /** Function to be called once the tab index changes. */

  onChange?: (index: number) => void
}

export interface PropsWithTheme extends Props {
  theme?: OperationalStyleConstants
}

const Container = styled("div")({
  label: "tabs",
})

const Content = styled("div")({
  marginTop: 18,
})

const TabList = styled("ul")(
  {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    position: "relative",
    border: "none",
    "&:after": {
      position: "absolute",
      display: "block",
      content: `" "`,
      width: "100%",
      height: 1,
      left: 0,
      bottom: 0,
      background: "red",
      zIndex: 1,
    },
    "> *:not(:last-child)": {
      marginRight: 20,
    },
  },
  ({ theme }: WithTheme): CssStatic => ({
    "&:after": {
      background: darken(theme.deprecated.colors.lightGray, 6),
    },
  }),
)

const TabPanel = styled("div")({
  /* Add any styles to the TabPanel */
})

const overflowEllipsis = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  wordWrap: "normal",
}

const TabTitle = styled("li")(
  {
    cursor: "pointer",
    flex: "0 0 auto",
    listStyle: "none",
    maxWidth: "100%",
    position: "relative",
    padding: "5px 15px",
    zIndex: 10,
  },
  ({
    theme,
    color,
    isActive,
    disabled,
  }: {
    theme?: OperationalStyleConstants
    color: string
    isActive: boolean
    disabled: boolean
  }): {} => ({
    ...theme.deprecated.typography.body,
    ...overflowEllipsis,
    borderBottom: `2px solid transparent`,
    ...(isActive
      ? {
          color,
          borderColor: color,
        }
      : {}),
    ...(disabled
      ? {
          color: theme.deprecated.colors.lightGray,
        }
      : {
          "&:hover": {
            color,
          },
        }),
  }),
)

const Tabs = (props: PropsWithTheme) => {
  // Get all children properties and add an index value to each of them
  const childrenProps: TabProps[] = React.Children.map(
    props.children,
    (child: React.ReactElement<TabProps>, index: number) => ({
      ...child.props,
      index,
    }),
  )
  const color = deprecatedExpandColor(props.theme.deprecated, props.activeColor) || props.theme.color.primary

  // Display only the active panel based off the children props
  const { children: panelContent, disabled }: TabProps = childrenProps.find(
    ({ index }) => index === (props.active || 0),
  )
  const activePanel: JSX.Element = disabled ? null : <TabPanel>{panelContent}</TabPanel>

  // Build titles fragment based off the children props
  const tabTitles: JSX.Element[] = childrenProps.map(({ disabled, index, title }) => (
    <TabTitle
      color={color}
      disabled={disabled}
      isActive={(props.active || 0) === index && !disabled}
      key={index}
      onClick={() => {
        if (!disabled && props.onChange) {
          props.onChange(index)
        }
      }}
    >
      {title}
    </TabTitle>
  ))
  return (
    <Container className={props.className} id={props.id}>
      <TabList>{tabTitles}</TabList>
      <Content>{activePanel}</Content>
    </Container>
  )
}

export default withTheme(Tabs)
