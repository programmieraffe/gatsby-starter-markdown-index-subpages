import React from 'react';

const Layout = ({title,children}) =>
  <div>
    <div>{title}</div>
    <div>{children}</div>
  </div>

export default Layout;
