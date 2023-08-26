import  { useEffect } from 'react';
import axios from 'axios';
const Logout = () => {
    let token = localStorage.getItem("Token")
    if (!token) {
        window.location.replace('/')
    }
    const handleSubmit = async () => {
        try {
            let config = {
                method: 'post',
                url: 'http://localhost:5000/api/v1/auth/logout',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.status));
                    if (JSON.stringify(response.status) === 495) {
                        window.location.replace('/')
                    }
                    if (JSON.stringify(response.data.status) === '200') {
                        localStorage.clear();
                        window.location.replace("/")
                    }

                })
        }
        catch (err) {
            console.log(err.code)
        }
    }
    useEffect(() => {
        if (token) {
            handleSubmit()
        }
    })
    return (
        <div>

        </div>
    );
}

export default Logout;