import { SHOW_CHOOSED_SCREENSHOT, HIDE_CHOOSED_SCREENSHOT } from '../constants/action-types/screenshots'

export function showChoosedScreenshot(id) {
  return {
    type: SHOW_CHOOSED_SCREENSHOT,
    payload: id
  }
}

export function hideChoosedScreenshot() {
  return {
    type: HIDE_CHOOSED_SCREENSHOT
  }
}
