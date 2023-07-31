'use client';
import React, { useState } from 'react';
import RoomInfo from './utility/RoomInfo';
import UtilityNav from './utility/UtilityNav';
import ActiveUsers from './utility/ActiveUsers';
import LiveChat from './utility/LiveChat';
import CodeBoard from './utility/CodeBoard';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

type Props = {
    room_id: string;
};

const UtilityComponent = ({room_id}: Props) => {
    const activeUsers = useSelector((state: RootState) =>  state.codeWs.activeUsers);
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