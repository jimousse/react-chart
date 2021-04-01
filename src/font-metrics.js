const latoMetrics = {
  unitsPerRem: 2000,
  capitalHeight: 1433,
  ascender: 1974,
  descender: 426
};

const lineHeightNormal = ( latoMetrics.ascender + latoMetrics.descender ) / latoMetrics.unitsPerRem;

export {
  latoMetrics,
  lineHeightNormal
};