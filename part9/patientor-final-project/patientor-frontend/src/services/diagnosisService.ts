import axios from "axios";
import { Diagnosis } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
    const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
    );

    return data;
};

// const getById = async (id: string) => {
//     const { data } = await axios.get<Diagnosis>(
//         `${apiBaseUrl}/diagnoses/${id}`
//     );
//
//     return data;
// }

// const create = async (object: DiagnosisFormValues) => {
//     const { data } = await axios.post<Diagnosis>(
//         `${apiBaseUrl}/diagnoses`,
//         object
//     );
//
//     return data;
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll,
    // getById
};

