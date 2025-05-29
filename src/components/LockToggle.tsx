
import styled from 'styled-components';
import { useState } from 'react';
import type { TileColour } from '../types/tiles';

const StyledLockToggle = styled.button<{ $colour?: TileColour}>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: clamp(6rem, 12vw, 12rem);
  height: clamp(6rem, 12vw, 12rem);
  position: absolute;
  z-index: 100;

  &.pos-0 {
    top: 0;
    left: 0;
  }
  &.pos-1 {
    top: 0;
    right: 0;
  }
  &.pos-2 {
    bottom: 0;
    left: 0;
  }
  &.pos-3 {
    bottom: 0;
    right: 0;
  }

  & > svg {
    fill: var(--color-board-bg);
    stroke: var(--color-tile-border);
    stroke-width: 0.8rem;
    transition: filter 0.15s ease-in-out, transform 0.15s ease-in-out;
    filter: drop-shadow(0.6rem 0.6rem rgba(0,0,0, 0.2));

    .inner {
      stroke-width: 0.4rem;
      fill: ${props => props.$colour ? `var(--color-tile-${props.$colour})` : 'transparent'};

    }
  }

  &:hover {
    svg {
      filter: brightness(1.1) drop-shadow(0.6rem 0.6rem rgba(0,0,0, 0.2));
    }
  }

  &:active {
    svg {
      filter: brightness(0.9);
      transform: translate(0.6rem, 0.6rem);
    }
  }

  &.unlocked {
    svg {
      fill: gold;
      transform: translate(0.6rem, 0.6rem);
      filter: none;
    }

    &:active {
      transform: none;
    }
  }
`;

export default function LockToggle({colour, pos, isUnlocked, onLockClick}) {
  return (
    <StyledLockToggle
      className={`pos-${pos} ${isUnlocked ? 'unlocked' : ''}`}
      $colour={colour}
      onClick={() => onLockClick(pos)}
    >
      <svg viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
        <polygon points="54 4, 104 54, 54 104, 4 54" />
        <polygon className="inner" points="54 20, 88 54, 54 88, 20 54" />
      </svg>
    </StyledLockToggle>
  );
}
