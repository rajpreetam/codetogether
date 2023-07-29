'use client';
import React, { useState } from 'react';
import { InformationCircleIcon, UserGroupIcon, InboxIcon, PaintBrushIcon } from '@heroicons/react/24/outline';

type Props = {
    roomInfoClicked: boolean;
    setRoomInfoClicked: (value: boolean) => void;

    activeUsersClicked: boolean;
    setActiveUsersClicked: (value: boolean) => void;

    chatClicked: boolean;
    setChatClicked: (value: boolean) => void;

    boardClicked: boolean;
    setBoardClicked: (value: boolean) => void;
};

const activeClass = 'border-b border-text-l dark:border-text-d py-1';

const UtilityNav = ({
    roomInfoClicked,
    setRoomInfoClicked,
    activeUsersClicked,
    setActiveUsersClicked,
    chatClicked,
    setChatClicked,
    boardClicked,
    setBoardClicked
}: Props) => {

    const handleRoomInfoClick = () => {
        setRoomInfoClicked(true);
        setActiveUsersClicked(false);
        setChatClicked(false);
        setBoardClicked(false);
        
    };
    const handleActiveUsersClick = () => {
        setActiveUsersClicked(true);
        setRoomInfoClicked(false);
        setChatClicked(false);
        setBoardClicked(false);

    };
    const handleChatClick = () => {
        setChatClicked(true);
        setActiveUsersClicked(false);
        setRoomInfoClicked(false);
        setBoardClicked(false);

    };
    const handleBoardClick = () => {
        setBoardClicked(true);
        setActiveUsersClicked(false);
        setChatClicked(false);
        setRoomInfoClicked(false);
    };

    return (
        <div className='card p-2 fr-ic-sx4'>
            <div
                className={`fr-ic-sx2 cursor-pointer ${roomInfoClicked ? activeClass : ''}`}
                onClick={handleRoomInfoClick}
            >
                <InformationCircleIcon className='icon-sm' />
                <p>Room Info</p>
            </div>
            <div
                className={`fr-ic-sx2 cursor-pointer ${activeUsersClicked ? activeClass : ''}`}
                onClick={handleActiveUsersClick}
            >
                <UserGroupIcon className='icon-sm' />
                <p>Active Users</p>
            </div>
            <div
                className={`fr-ic-sx2 cursor-pointer ${chatClicked ? activeClass : ''}`}
                onClick={handleChatClick}
            >
                <InboxIcon className='icon-sm' />
                <p>Chat</p>
            </div>
            <div
                className={`fr-ic-sx2 cursor-pointer ${boardClicked ? activeClass : ''}`}
                onClick={handleBoardClick}
            >
                <PaintBrushIcon className='icon-sm' />
                <p>Code Board</p>
            </div>
        </div>
    );
};

export default UtilityNav;