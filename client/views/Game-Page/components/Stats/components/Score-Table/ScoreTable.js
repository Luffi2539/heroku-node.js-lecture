import React from 'react'
import { connect } from 'react-redux'

import './score-table.scss'

import TableRow from './components/TableRow'

class ScoreTable extends React.Component {
  render() {
    const { users } = this.props

    return (
      <div className="table100 ver1 m-b-110">
        <div className="table100-head">
          <table>
            <thead>
              <tr className="row100 head">
                <th className="cell100 column1">Nickname</th>
                <th className="cell100 column2">Score</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="table100-body js-pscroll">
          <table>
            <tbody>
              {users &&
                users.map((user, id) => {
                  return <TableRow key={id} name={user.name} score={user.score} />
                })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users.users
  }
}

export default connect(
  mapStateToProps,
  null
)(ScoreTable)
