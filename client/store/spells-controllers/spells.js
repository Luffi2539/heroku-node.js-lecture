import {
  SET_SPELLS_CONTROLLERS,
  START_SPELL_CASTING,
  FINISH_SPELL_CASTING
} from '../../constants/action-types/spells'

import {
  START_ROUND,
  INIT_STATE
} from '../../constants/action-types/round'

const defaultState = {
  fireSpell: null,
  healingSpell: null,
  iceSpell: null,
  lightingSpell: null,
  isSpellCasting: false
}

export default function spells(state = defaultState, action) {
  switch (action.type) {
    case SET_SPELLS_CONTROLLERS: {
      return {
        fireSpell: action.payload[0],
        healingSpell: action.payload[1],
        iceSpell: action.payload[2],
        lightingSpell: action.payload[3]
      }
    }
    case START_SPELL_CASTING: {
      return {
        ...state,
        isSpellCasting: true
      }
    }
    case FINISH_SPELL_CASTING: {
      return {
        ...state,
        isSpellCasting: false
      }
    }
    case START_ROUND: {
      return {
        ...defaultState
      }
    }
    case INIT_STATE: {
      return {
        ...defaultState
      }
    }
    default: {
      return state
    }
  }
}
