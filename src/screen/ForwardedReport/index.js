import React from 'react';
import Agency from './Agency';
import {useSelector} from 'react-redux';
export default function() {
  // const {user} = useSelector(state => state.user);
  // if (user.groupId == 2 || user.groupId == 3) return <Agency />;
  // if (user.groupId == 4) return <Department />;
  // return null;
  return <Agency />;
}
