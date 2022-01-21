import React, {useEffect} from 'react';

import { useGetAllTasksQuery } from '../../generated/graphql';

function GetTasks() {
    const { error, loading, data } = useGetAllTasksQuery();
    useEffect(() => {
        console.log(data?.getAllTasks);
    }, [data])
    return (
        <div>

        </div>
    )
}

export default GetTasks