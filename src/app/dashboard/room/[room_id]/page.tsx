import React from 'react';
import RoomSocketProvider from '@/components/dashboard/RoomSocketProvider';

const RoomPage = ({ params }: { params: { room_id: string } }) => {
    const room_id = params.room_id;

    return (
        <RoomSocketProvider room_id={room_id} />
    );
};

export default RoomPage;