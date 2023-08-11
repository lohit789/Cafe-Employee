/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { Link, useParams } from 'react-router-dom'


const reducer = (state, action) => {
    switch (action.type) {
        case 'EMPLOYEES_REQUEST':
            return { ...state, loading: true };
        case 'EMPLOYEES_SUCCESS':
            return { ...state, loading: false, post: action.payload, error: '' };
        case 'EMPLOYEES_ERROR':
            return { ...state, loading: false, error: action.payload };
        default: return state;
    }
}
export default function EmployeesPage() {
    const { userId } = useParams();
    const [state, dispatch] = useReducer(reducer, { loading: false, employee: {}, error: '' });
    const { loading, error, employee } = state;
    const fetchpost = async () => {
        dispatch({ type: 'EMPLOYEES_REQUEST' });
        try {
            // const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            const { data } = await axios.get(`http://localhost:3000/Employee/user/${userId}`);
            dispatch({ type: 'EMPLOYEES_SUCCESS', payload: data });
        } catch (err) {
            dispatch({ type: 'EMPLOYEES_FAIL', payload: err.message });
        }
    };
    useEffect(() => {
        fetchpost();
    }, [])
    return (
        <div>
            <Link to={"/"}>back to cafe details</Link>
            <div className="blog">
                <div className="content">
                    {loading ? <div>loading...</div>
                        :
                        error ? <div>Error:{error}</div>
                            :
                            (
                                <div>
                                    <h1>{employee.name}</h1>
                                    <p>{employee.email}</p>
                                    <p>{employee.phone}</p>
                                    <p>{employee.daysworked}</p>
                                    <p>{employee.caféname}</p>
                                </div>
                            )}
                </div>
                <div className="sidebar">

                </div>
            </div>
        </div>
    )
}
