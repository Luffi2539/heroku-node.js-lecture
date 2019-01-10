import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import flow from '../../../../../../../helpers/flow'

const letterSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const letterTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get middle of the letter
    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()
    const hoverClientX = clientOffset.x - hoverBoundingRect.left

    // Only perform the move when the mouse has crossed half of the items width
    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return
    }

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return
    }

    props.moveLetter(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

class Letter extends React.Component {
  render() {
    const { isDragging, connectDragSource, connectDropTarget, letter } = this.props
    const opacity = isDragging ? 0 : 1

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className="letter" style={{ opacity: opacity }}>
            {letter}
          </div>
        )
      )
    )
  }
}

export default flow(
  DragSource('letter', letterSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget('letter', letterTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Letter)
