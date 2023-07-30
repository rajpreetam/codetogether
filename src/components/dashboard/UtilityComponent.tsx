'use client';
import React, { useState } from 'react';
import { InformationCircleIcon, UserGroupIcon, InboxIcon, PaintBrushIcon } from '@heroicons/react/24/outline';
import RoomInfo from './utility/RoomInfo';
import UtilityNav from './utility/UtilityNav';
import ActiveUsers from './utility/ActiveUsers';
import LiveChat from './utility/LiveChat';
import CodeBoard from './utility/CodeBoard';
import { ActiveUsersDT, User } from '@/types';

type Props = {
    room_id: string;
    activeUsers: ActiveUsersDT[]
};

const UtilityComponent = ({room_id, activeUsers}: Props) => {
    const [roomInfoClicked, setRoomInfoClicked] = useState(true);
    const [activeUsersClicked, setActiveUsersClicked] = useState(false);
    const [chatClicked, setChatClicked] = useState(false);
    const [boardClicked, setBoardClicked] = useState(false);

    const itemToSHow = () => {
        if(roomInfoClicked) return <RoomInfo room_id={room_id} />
        else if(activeUsersClicked) return <ActiveUsers activeUsers={activeUsers} />
        else if(chatClicked) return <LiveChat room_id={room_id} />
        else if(boardClicked) return <CodeBoard />
        else return <p>Something went wrong</p>; 
    };
    
    return (
        <div className='card-light w-[50%]'>
            <UtilityNav
                roomInfoClicked={roomInfoClicked}
                setRoomInfoClicked={setRoomInfoClicked}
                activeUsersClicked={activeUsersClicked}
                setActiveUsersClicked={setActiveUsersClicked}
                chatClicked={chatClicked}
                setChatClicked={setChatClicked}
                boardClicked={boardClicked}
                setBoardClicked={setBoardClicked}
            />

            <div className='h-[calc(100vh-121px)] p-2'>
                {itemToSHow()}
            </div>

        </div>
    );
};

export default UtilityComponent;