import React, {useEffect} from 'react';

import { useGetCommentsTaskQuery, useGetAllTasksQuery } from '../../generated/graphql';
import GetTasks  from './GetTasks';

function GetComments() {
    const { error, loading, data } = useGetCommentsTaskQuery({
        variables: {
            taskId: "1"
        }
         });
    useEffect(() => {
        console.log(data);
    }, [data])
    return (
        <div>

        </div>
    )
}

export default GetComments