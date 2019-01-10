import { HEAL_HERO, DAMAGE_HERO, SET_HERO } from '../../constants/action-types/hero'
import { START_ROUND, INIT_STATE } from '../../constants/action-types/round'

const defaultState = { maxHealth: 100, currentHealth: 100, isDead: false, hero: null }

export default function(state = defaultState, action) {
  switch (action.type) {
    case SET_HERO: {
      return {
        ...state,
        hero: action.payload
      }
    }
    case HEAL_HERO: {
      let newHealth = state.currentHealth
      newHealth += action.payload

      if (newHealth > state.maxHealth) {
        newHealth = state.maxHealth
      }

      return {
        ...state,
        currentHealth: newHealth
      }
    }
    case DAMAGE_HERO: {
      let newHealth = state.currentHealth
      newHealth -= action.payload

      if (newHealth <= 0) {
        return {
          ...state,
          currentHealth: 0,
          isDead: true
        }
      }

      return {
        ...state,
        currentHealth: newHealth
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
