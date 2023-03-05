import {useEffect, useState} from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource);
        console.log(response.data)
        setResources(resources.concat(response.data));
    }

    useEffect(() => {
        const getAll = async () => {
            const response = await axios.get(baseUrl);
            if (response) {
                setResources(response.data);
            }
        };

        getAll();
    }, [])

    const service = {
        create
    }

    return [
        resources, service
    ]
}
