import { useContext } from "react";
import axios from "axios"; 
import useSWR from "swr";

import { AuthContext } from "../context/AuthContext";
import { apiUri } from "./uri";
import { IUser } from "./interfaces/user";


async function fetcher(url: string, token?: string | null) {
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })

    return res.json();
}

async function fetcherSimple(url: string) {
    const res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })

    return res.json();
}

export async function login(username: string, password: string) {
    interface IResponse {
        refresh: string;
        access: string;
        user: IUser;
    }

    const res = await axios.post<IResponse>(`${apiUri}/login/`, 
        {
            username,
            password,
        },
        {
            timeout: 10000,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        }
    )

    return res.data;

}