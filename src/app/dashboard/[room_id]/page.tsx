import CodeComponent from '@c/dashboard/CodeComponent';
import UtilityComponent from '@c/dashboard/UtilityComponent';
import React from 'react';

const RoomPage = () => {
    return (
        <div className='container-db min-w-[800px] fr-ic-sx2 py-2'>
            <UtilityComponent />
            <CodeComponent />
        </div>
    );
};

export default RoomPage;