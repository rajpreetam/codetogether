import { ActiveUsersDT, User } from '@/types';
import React from 'react';

type Props = {
    activeUsers: ActiveUsersDT[]
};

const ActiveUsers = ({activeUsers}: Props) => {
    
    return (
        <div className='w-full h-full'>
            {activeUsers.map(user => (
                <p key={user.user.username}>{user.user.username}</p>
            ))}
        </div>
    );
};

export default ActiveUsers;