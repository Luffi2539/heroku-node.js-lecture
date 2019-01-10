import {
  SET_SPELLS_CONTROLLERS,
  START_SPELL_CASTING,
  FINISH_SPELL_CASTING
} from '../constants/action-types/spells'

export function setSpellsControllers(spells) {
  return {
    type: SET_SPELLS_CONTROLLERS,
    payload: spells
  }
}

export function startSpellCasting() {
  return {
    type: START_SPELL_CASTING
  }
}

export function finishSpellCasting() {
  return {
    type: FINISH_SPELL_CASTING
  }
}
