import React, {useEffect} from 'react';

import { useGetAllUsersQuery } from '../../generated/graphql';

function GetUsers() {
    const { error, loading, data } = useGetAllUsersQuery();
    useEffect(() => {
        console.log(data?.getAllUsers);
    }, [data])
    return (
        <div>

        </div>
    )
}

export default GetUsers