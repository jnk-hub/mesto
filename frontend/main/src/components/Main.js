import React from 'react';

const Profile = React.lazy(() => import('profile/Profile').catch(() => {
  return { default: () => <div className='error'>Profile is not available!</div> };
}));
const Cards = React.lazy(() => import('card/Cards').catch(() => {
  return { default: () => <div className='error'>Cards is not available!</div> };
}));

function Main() {
  return (
    <main className="content">
      <Profile />
      <Cards />
    </main>
  );
}

export default Main;
