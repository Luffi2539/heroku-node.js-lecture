export function getResponsiveX(screenWidth, defaultPos) {
  const defaultWidth = 1980
  return ((screenWidth * defaultPos) / defaultWidth)
}

export function getResponsiveY(screenHeight, defaultPos) {
  const defaultHeight = 1120
  const posToReturn = ((screenHeight * defaultPos) / defaultHeight)
  return posToReturn
}