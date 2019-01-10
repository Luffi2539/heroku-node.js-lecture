import { SET_CASTED_SPELL_INFO } from '../constants/action-types/spell-info'

export function setCastedSpellInfo (spellInfo) {
  return {
    type: SET_CASTED_SPELL_INFO,
    payload: spellInfo
  }
}