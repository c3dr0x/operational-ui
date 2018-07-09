import * as React from "react"
import styled from "react-emotion"
import { OperationalStyleConstants } from "../utils/constants"
import { ContextMenu, ContextMenuItem } from "../"

export interface Props {
  /** Options to display in dropdown */
  children: React.ReactNode[]

  /** Action when item in dropdown is selected - if specified here, it is applied to all dropdown items */
  onClick?: any

  /** Items to display in dropdown */
  items?: any

  /** Display carat on right */
  carat?: boolean

  /** Alignment */
  align: "left" | "right"
}

const Container = styled("div")(({ theme, align }: { theme?: OperationalStyleConstants; align: "left" | "right" }) => ({
  width: 250,
  lineHeight: "50px",
  padding: `0 ${theme.space.content}px`,
  color: "#ffffffcc",
  backgroundColor: "transparent",
  boxShadow: "none",
  fontWeight: theme.font.weight.medium,
  display: "flex",
  alignItems: "center",
  justifyContent: align === "left" ? "flex-start" : "flex-end",
  "&>div": {
    marginLeft: theme.space.small,
  },
  "&:hover, &.open": {
    color: theme.color.white,
    backgroundColor: "hsla(0, 0%, 100%, 0.1)",
    boxShadow: "0 3px 6px rgba(0, 0%, 0%, 0.3)",
  },
}))

const ContainerWithCarat = styled(Container)(({ theme }: { theme?: OperationalStyleConstants }) => ({
  // downward caret.
  "&::after": {
    content: "''",
    position: "absolute",
    top: "50%",
    right: theme.space.content + theme.space.small,
    width: 0,
    height: 0,
    border: "4px solid transparent",
    borderTopColor: "#ffffff80",
    transform: "translateY(calc(-50% + 2px))",
  },
  "&:hover, &.open": {
    "&::after": {
      borderTopColor: theme.color.white,
    },
  },
}))

const StyledContextMenuItem = styled(ContextMenuItem)(
  ({ theme, align }: { theme?: OperationalStyleConstants; align: "left" | "right" }) => ({
    color: theme.color.text.default,
    textAlign: align,
  }),
)

const HeaderMenu: React.SFC<Props> = props => {
  const ContainerComponent: any = props.carat ? ContainerWithCarat : Container
  return (
    <ContextMenu noOffset>
      <ContainerComponent align={props.align}>{props.children}</ContainerComponent>
      {props.items.map((option: any) => {
        const onClick = option.onClick || (props.onClick && (() => props.onClick(option)))
        return (
          (option.label || option.value) && (
            <StyledContextMenuItem onClick={onClick} key={""} align={props.align}>
              {option.label || option.value}
            </StyledContextMenuItem>
          )
        )
      })}
    </ContextMenu>
  )
}

HeaderMenu.defaultProps = {
  align: "left",
  carat: false,
}

export default HeaderMenu