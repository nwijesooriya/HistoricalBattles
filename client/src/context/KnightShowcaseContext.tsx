"use client";
import React, { createContext, useContext, ReactNode, useState } from 'react';

export interface KnightShowcaseSettings {
  videoSrc: string;
  width: number; // 0 = natural width
  height: number; // 0 = natural height
  bgAlpha: number; // 0 (transparent) to 1 (opaque)
  muted: boolean;
  playbackRate: number; // 1 = normal speed
}

export interface KnightShowcaseContextProps extends KnightShowcaseSettings {
  setVideoSrc: (src: string) => void;
  setWidth: (w: number) => void;
  setHeight: (h: number) => void;
  setBgAlpha: (a: number) => void;
  setMuted: (m: boolean) => void;
  setPlaybackRate: (r: number) => void;
}

const defaultSettings: KnightShowcaseSettings = {
  videoSrc: '/knight.mp4',
  width: 0,
  height: 0,
  bgAlpha: 0,
  muted: true,
  playbackRate: 1,
};

const KnightShowcaseContext = createContext<KnightShowcaseContextProps | undefined>(undefined);

export const KnightShowcaseProvider = ({ children }: { children: ReactNode }) => {
  const [videoSrc, setVideoSrc] = useState(defaultSettings.videoSrc);
  const [width, setWidth] = useState(defaultSettings.width);
  const [height, setHeight] = useState(defaultSettings.height);
  const [bgAlpha, setBgAlpha] = useState(defaultSettings.bgAlpha);
  const [muted, setMuted] = useState(defaultSettings.muted);
  const [playbackRate, setPlaybackRate] = useState(defaultSettings.playbackRate);

  return (
    <KnightShowcaseContext.Provider
      value={{
        videoSrc,
        width,
        height,
        bgAlpha,
        muted,
        playbackRate,
        setVideoSrc,
        setWidth,
        setHeight,
        setBgAlpha,
        setMuted,
        setPlaybackRate,
      }}
    >
      {children}
    </KnightShowcaseContext.Provider>
  );
};

export const useKnightShowcase = () => {
  const ctx = useContext(KnightShowcaseContext);
  if (!ctx) {
    throw new Error('useKnightShowcase must be used within KnightShowcaseProvider');
  }
  return ctx;
};
