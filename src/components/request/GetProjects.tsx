import React, {useEffect} from 'react';

import { useGetAllProjectsQuery } from '../../generated/graphql';

function GetProjects() {
    const { error, loading, data } = useGetAllProjectsQuery();
    useEffect(() => {
        console.log(data?.getAllProjects);
    }, [data])
    return (
        <div>

        </div>
    )
}

export default GetProjects