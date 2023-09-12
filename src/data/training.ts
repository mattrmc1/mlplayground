import { TrainingExample } from "goddard/dist/@types/NetworkTraining";

export const training: TrainingExample[] = [
  {
    input: {
      r: 0.62,
      g: 0.72,
      b: 0.88,
    },
    output: {
      isLight: 1,
      isDark: 0,
    },
  },
  {
    input: {
      r: 0.1,
      g: 0.84,
      b: 0.72,
    },
    output: {
      isLight: 1,
      isDark: 0,
    },
  },
  {
    input: {
      r: 0.33,
      g: 0.24,
      b: 0.29,
    },
    output: {
      isLight: 0,
      isDark: 1,
    },
  },
  {
    input: {
      r: 0.74,
      g: 0.78,
      b: 0.86,
    },
    output: {
      isLight: 1,
      isDark: 0,
    },
  },
  {
    input: {
      r: 0.31,
      g: 0.35,
      b: 0.41,
    },
    output: {
      isLight: 0,
      isDark: 1,
    },
  },
  {
    input: {
      r: 1,
      g: 0.99,
      b: 0,
    },
    output: {
      isLight: 1,
      isDark: 0,
    },
  },
  {
    input: {
      r: 1,
      g: 0.42,
      b: 0.52,
    },
    output: {
      isLight: 0,
      isDark: 1,
    },
  },
  {
    input: {
      r: 164 / 255,
      g: 174 / 255,
      b: 19 / 255,
    },
    output: {
      isLight: 0,
      isDark: 1,
    },
  },
  {
    input: {
      r: 255 / 255,
      g: 200 / 255,
      b: 0,
    },
    output: {
      isLight: 1,
      isDark: 0,
    },
  },
];
