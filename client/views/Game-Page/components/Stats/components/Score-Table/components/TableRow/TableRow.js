import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

class TableRow extends React.Component {
  render() {
    const { name, score, userName } = this.props
    const isUserRow = userName === name

    return (
      <tr className={cx('row100', { 'user-row': isUserRow })}>
        <td className="cell100 column1">{name}</td>
        <td className="cell100 column2">{score}</td>
      </tr>
    )
  }
}

function mapStateToProps(state) {
  return {
    userName: state.userInfo.name
  }
}

export default connect(
  mapStateToProps,
  null
)(TableRow)
