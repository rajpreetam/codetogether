import React, { useState } from 'react';
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

type Props = {
    room_id: string;
};

const RoomInfo = ({room_id}: Props) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        navigator.clipboard.writeText(room_id);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className='w-full h-full'>
            <div className='fr-ic-sx4'>
                <p className='brand'>Room ID:</p>
                <p>{room_id}</p>
                {copied ? <ClipboardDocumentCheckIcon className='icon' /> : <ClipboardDocumentIcon className='icon' onClick={handleCopy} />}
            </div>
        </div>
    );
};

export default RoomInfo;