export const onMouseMove = (event: MouseEvent) => {

  // console.log(event);
  // if ( scope.isLocked === false ) return;

  return event;

};


export const onMouseClick = (event: MouseEvent) => {

  // N.B.: this APPARENTLY has to stay in an input event
  document.body.requestPointerLock();

  return event;
};
