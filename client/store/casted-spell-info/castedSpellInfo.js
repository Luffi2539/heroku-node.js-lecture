import { SET_CASTED_SPELL_INFO } from '../../constants/action-types/spell-info'

const defaultState = {
  spellType: undefined,
  spellPoints: undefined,
  spellElement: undefined
}

export default function castedSpellInfo(state = defaultState, action) {
  switch (action.type) {
    case SET_CASTED_SPELL_INFO: {
      return {
        ...action.payload
      }
    }
    default: {
      return state
    }
  }
}
