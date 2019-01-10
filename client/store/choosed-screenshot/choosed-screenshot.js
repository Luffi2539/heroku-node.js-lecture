import {
  SHOW_CHOOSED_SCREENSHOT,
  HIDE_CHOOSED_SCREENSHOT
} from '../../constants/action-types/screenshots'

export default function choosedScreenshot(
  state = { id: undefined, needsToBeShown: false },
  action
) {
  switch (action.type) {
    case SHOW_CHOOSED_SCREENSHOT: {
      return {
        id: action.payload,
        needsToBeShown: true
      }
    }
    case HIDE_CHOOSED_SCREENSHOT: {
      return {
        id: undefined,
        needsToBeShown: false
      }
    }
    default: {
      return state
    }
  }
}
