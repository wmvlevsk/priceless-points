import React from 'react';

const Mountain = ({image}) => {
  let style = {
    width: '100%',
    height: '50%',
    zIndex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url('${image}')`
  };
  return (
    <div className="mountain" style={style}>
    </div>
  );
};

export default Mountain;