import React from 'react';
export const navigationRef = React.createRef();
export function navigate(name, params) {
  console.log('naviagte to: ', name, params);

  navigationRef.current?.navigate(name, params);
}
export function navigationPopBack() {
  navigationRef.current?.pop();
}
