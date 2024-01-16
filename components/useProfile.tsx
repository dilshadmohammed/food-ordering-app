'use client'
import { useEffect, useState } from "react";


export function useProfile() {
    const [data, setData] = useState({
        email:'',
        phone:'',
        streetAddress:'',
        postalCode:'',
        city:'',
        country:'',
        isAdmin:false
    });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        setLoading(true);
        fetch('/api/profile')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    return { loading, data };
}
