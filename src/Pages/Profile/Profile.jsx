import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContex';

export default function Profile() {
    const {user} = useContext(UserContext);
  return (
    <div>
        <h1>Hi! {!!user && (user.fullName)}</h1>
    </div>
  )
}
