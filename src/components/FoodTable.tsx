import React from 'react';
import { auth } from '../service/firebase';

const FoodTable = () => {
    return (
        <div>
            FoodTable
            <button onClick={async () => await auth.signOut()}>sign out</button>
        </div>
    );
};

export default FoodTable;
