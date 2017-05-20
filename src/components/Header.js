import React from 'react';

/*
  Functional Component: only renders some with data passed from Containers
*/
function Header({title}) {
  return (
    <div className='headerClass'>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
