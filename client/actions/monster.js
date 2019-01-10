import { DAMAGE_MONSTER, SET_MAX_HEALTH, UPGRADE_MONSTER, SET_MONSTER } from '../constants/action-types/monster'


export function damageMonster(damagepoints) {
  return {
    type: DAMAGE_MONSTER,
    payload: damagepoints
  }
}

export function setMonster(monster) {
  return {
    type: SET_MONSTER,
    payload: monster
  }
}

export function upgradeMonster(newDamagepoints) {
  return {
    type: UPGRADE_MONSTER,
    payload: newDamagepoints
  }
}

export function setMaxHealth(health) {
  return {
    type: SET_MAX_HEALTH,
    payload: health
  }
}