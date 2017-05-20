import React from 'react';

/*
  Functional Component: only renders some with data passed from Containers
*/
function Container({world, isClicked}) {
  const clicked = (
    <div>
      I live in {world.city}, {world.country}.
      {world.message}
    </div>
  );

  const notClicked = (
    <div>
      Wating for the message...
    </div>
  );

  return (
    <div className='containerClass'>
      {
        isClicked ?
          clicked
          :
          notClicked
      }
    </div>
  );
};

export default Container;
