import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { findDOMNode } from 'react-dom'
import flow from '../../../../../../../../helpers/flow'

const numberSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const numberTarget = {
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

    props.moveNumber(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

class Number extends React.Component {
  render() {
    const { isDragging, connectDragSource, connectDropTarget, number } = this.props
    const opacity = isDragging ? 0 : 1

    return (
      connectDragSource &&
      connectDropTarget &&
      connectDragSource(
        connectDropTarget(
          <div className="number" style={{ opacity: opacity }}>
            {number}
          </div>
        )
      )
    )
  }
}

export default flow(
  DragSource('number', numberSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget('number', numberTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Number)
