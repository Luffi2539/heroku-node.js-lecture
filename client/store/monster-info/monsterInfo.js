import {
  DAMAGE_MONSTER,
  SET_MAX_HEALTH,
  UPGRADE_MONSTER,
  SET_MONSTER
} from '../../constants/action-types/monster'

import { START_ROUND, INIT_STATE } from '../../constants/action-types/round'

const defaultState = {
  maxHealth: 100,
  currentHealth: 100,
  isDead: false,
  monster: null,
  monsterName: undefined,
  damage: 30
}

export default function monsterInfo(state = defaultState, action) {
  switch (action.type) {
    case SET_MONSTER: {
      return {
        ...state,
        monster: action.payload,
        monsterName: action.payload.name
      }
    }
    case DAMAGE_MONSTER: {
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
    case SET_MAX_HEALTH: {
      return {
        ...state,
        maxHealth: action.payload,
        currentHealth: action.payload
      }
    }
    case UPGRADE_MONSTER: {
      return {
        ...state,
        damage: action.payload
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
