import { HEAL_HERO, DAMAGE_HERO, SET_HERO } from '../constants/action-types/hero'

export function healHero(healpoints) {
  return {
    type: HEAL_HERO,
    payload: healpoints
  }
}

export function damageHero(damagepoints) {
  return {
    type: DAMAGE_HERO,
    payload: damagepoints
  }
}

export function setHero(hero) {
  return {
    type: SET_HERO,
    payload: hero
  }
}