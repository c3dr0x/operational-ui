import * as React from "react"
import styled from "react-emotion"

import { OperationalStyleConstants } from "../utils/constants"
import Container, { Position } from "./Tooltip.Container"

/**
 * In order to allow for tooltips that have a sensible max-width that adjusts its width for shorter text,
 * and in order to have that working reliably across browsers, this implementation renders the tooltip offscreen
 * in order to determine how wide it would be were it to not do line breaks at any width.
 * The actual tooltip is rendered with this information extracted from the DOM node.
 */

/** @todo Type this more strongly with discriminated unions to prevent unexpected behavior for impossible prop combinations such as `<Tooltip right bottom />`. */
export interface Props {
  className?: string
  children?: React.ReactNode
  /** Smart-positioned tooltip, with positioning reversed so it doesn't flow out of the window's bounding box. Currently works for left and top-positioned tooltips. */
  smart?: boolean
  /** Top-positioned tooltip */
  top?: boolean
  /** Left-positioned tooltip */
  left?: boolean
  /** Right-positioned tooltip */
  right?: boolean
  /** Bottom-positioned tooltip */
  bottom?: boolean
}

export interface State {
  // bbTop is an abbreviation of boundingBoxTop
  bbTop: number
  bbBottom: number
  bbLeft: number
  bbRight: number
  singleLineTextWidth: number
}

/*
 * This class name is used as a selector when customizing the opacity for tooltips
 * that are only displayed when a particular parent of theirs is hovered.
 * The pattern replaces the https://emotion.sh/docs/babel#components-as-selectors
 * pattern to remove the need for babel plugin dependancy in projects that rely on
 * this library.
 */
export const dangerousTooltipContainerClassName = "operational-ui-tooltip"

class Tooltip extends React.Component<Props, State> {
  state = {
    bbTop: 0,
    bbLeft: 0,
    bbRight: 0,
    bbBottom: 0,
    singleLineTextWidth: 0,
  }

  containerNode: HTMLElement
  offScreenWidthTestNode: HTMLElement

  setDomProperties() {
    if (!this.offScreenWidthTestNode || !this.containerNode) {
      return
    }
    const bbOffScreen = this.offScreenWidthTestNode.getBoundingClientRect()
    const bbRect = this.containerNode.getBoundingClientRect()
    this.setState(prevState => ({
      bbTop: bbRect.top,
      bbBottom: bbRect.bottom,
      bbLeft: bbRect.left,
      bbRight: bbRect.right,
      singleLineTextWidth: bbOffScreen.width,
    }))
  }

  componentDidMount() {
    this.setDomProperties()
  }

  getPosition() {
    let position: Position = "right"

    if (this.props.left) {
      position = "left"
    }

    if (this.props.right) {
      position = "right"
    }

    if (this.props.bottom) {
      position = "bottom"
    }

    if (this.props.top) {
      position = "top"
    }

    return position
  }

  getDisplayPosition() {
    let position: Position = this.getPosition()

    if (this.props.smart) {
      /** @todo implement bounding box checks for right- and bottom-placed tooltips.
       * This should be easier once the OperationalUI provides window dimensions in context.
       */
      if (this.state.bbLeft < 0 && String(position) === "left") {
        position = "right"
      }

      if (this.state.bbTop < 0 && String(position) === "top") {
        position = "bottom"
      }
    }

    return position
  }

  render() {
    const displayPosition = this.getDisplayPosition()

    return (
      <>
        {/* Test node rendered to determine how wide the text is if it were written in a single line.
          * Note that the position is set arbitrarily since it does not influence text width.
          */}
        <Container
          position="bottom"
          offScreenWidthTest
          singleLineTextWidth={this.state.singleLineTextWidth}
          innerRef={node => {
            this.offScreenWidthTestNode = node
          }}
        >
          {/* Wrapping in a paragraph tag is necessary in order to have Safari read the correct single line width. */}
          <p>{this.props.children}</p>
        </Container>
        <Container
          className={dangerousTooltipContainerClassName}
          singleLineTextWidth={this.state.singleLineTextWidth}
          position={displayPosition}
          innerRef={node => {
            this.containerNode = node
          }}
        >
          {/* Wrapping in a paragraph tag is necessary in order to have Safari read the correct single line width. */}
          <p>{this.props.children}</p>
        </Container>
      </>
    )
  }
}

export default Tooltip
