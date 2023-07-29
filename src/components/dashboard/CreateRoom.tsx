'use client';
import React, { FormEvent, useState } from 'react';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import {v4 as uuidv4} from 'uuid';

const CreateRoom = () => {
    const router = useRouter();
    const [roomId, setRoomId] = useState('');

    const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/dashboard/room/${roomId}`);
    };

    const handleCreateRoom = () => {
        const room_id = uuidv4();
        toast.success(`Room created successfully.\nRoom ID: ${room_id}`);
        router.push(`/dashboard/room/${room_id}`);
    };

    return (
        <div className='card p-10 max-w-[450px] w-full mt-20 fc space-y-6'>
            <div className='fr-ic-sx4 p-2 cursor-pointer' onClick={handleCreateRoom}>
                <FolderPlusIcon className='icon' />
                <p className='brand'>Create a new room</p>
            </div>
            <div className='fr-ic-sx2'>
                <div className='border-b border-text-d dark:border-text-l w-full' />
                <span>OR</span>
                <div className='border-b border-text-d dark:border-text-l w-full' />
            </div>
            <div className='fc-sy4'>
                <p className='brand'>Join a room</p>
                <form className='fc-sy4' onSubmit={handleJoinRoom}>
                    <div className='fc-sy2'>
                        <label htmlFor="room_id">Room Id</label>
                        <input
                            type="text"
                            className='input'
                            placeholder='Room ID'
                            name='room_id'
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                        />
                    </div>
                    <button className='btn-outlined'>Join</button>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;