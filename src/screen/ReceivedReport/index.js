import React from 'react';
import Agency from './Agency';
import Province from './Province';
import Department from './Department';
import {useSelector} from 'react-redux';
export default function() {
  const {user} = useSelector(state => state.user);
  if (user.groupId === 4) return <Agency />;
  if (user.groupId === 5) return <Department />;
  return <Province />;
}
