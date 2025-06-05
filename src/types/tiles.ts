export const TileColours = {
  BLACK: 'black',
  BLUE: 'blue',
  GREY: 'grey',
  GREEN: 'green',
  ORANGE: 'orange',
  PINK: 'pink',
  PURPLE: 'purple',
  RED: 'red',
  WHITE: 'white',
  YELLOW: 'yellow',
} as const;

export type TileColour = typeof TileColours[keyof typeof TileColours];
