const getBrowser = () => {
  if (!window.navigator) return null;
  if (window.navigator.userAgentData.brands.length < 3) return null;
  return `${window.navigator.userAgentData.brands[2].brand} ${window.navigator.userAgentData.brands[2].version}`;
};

export const getDeviceInfo = () => {
  return {
    isMobile: window.navigator ? window.navigator.userAgentData.mobile : null,
    OS: window.navigator ? window.navigator.userAgentData.platform : null,
    browser: getBrowser(),
    location: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};
