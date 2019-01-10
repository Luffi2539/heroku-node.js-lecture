import { createStore, combineReducers, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'

import choosedScreenshot from './choosed-screenshot/choosed-screenshot'
import userInfo from './user-info/userInfo'
import spellsControllers from './spells-controllers/spells'
import heroInfo from './hero-info/heroInfo'
import castedSpellInfo from './casted-spell-info/castedSpellInfo'
import monsterInfo from './monster-info/monsterInfo'
import questionInfo from './question-info/questionInfo'
import roundInfo from './round-info/roundInfo'
import scoreInfo from './score/score'
import users from './users/users'
import error from './error/error'

const reducer = combineReducers({
  choosedScreenshot,
  userInfo,
  spellsControllers,
  heroInfo,
  castedSpellInfo,
  monsterInfo,
  questionInfo,
  roundInfo,
  scoreInfo,
  users,
  error
})

const middlewares = [thunk]
middlewares.push(logger)

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
