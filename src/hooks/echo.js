import { useEffect, useState } from "react"
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
// import axios from "axios"
import { axios } from '../config/axios'
window.Pusher = Pusher

const useEcho = user => {
    const [echoInstance, setEchoInstance] = useState(null)
    
    useEffect(() => {
        if (typeof window !== 'undefined' && user) {
            window.Pusher = Pusher
            const echo = new Echo({
                broadcaster: 'reverb',
                key: import.meta.env.VITE_REVERB_KEY,
                authorizer: (channel) => {
                    return {
                        authorize: (socketId, callback) => {
                            axios.post('/api/broadcasting/auth', {
                                socket_id: socketId,
                                channel_name: channel.name
                            })
                            .then(response => {
                                console.log("Cooletta echo ", response)
                                callback(false, response.data);
                            })
                            .catch(error => {
                                console.log("Erreur echo ", error)
                                callback(true, error);
                            });
                        }
                    };
                },
                wsHost : import.meta.env.VITE_REVERB_HOST,
                wsPort : import.meta.env.VITE_REVERB_PORT ?? 80,
                wssPort : import.meta.env.VITE_REVERB_PORT ?? 443,
                forceTLS : (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
                // enabledTransports: ['ws'],
                enabledTransports: ['ws', 'wss'],
                
            });

            // const channel = echo.channel(`online-users`);

            // channel.listen("UserLoggedIn", (e) => {
            //     console.log("EEDDEDE ", e, e.user)
            // });

            echo.join('online').here((users) => {
              console.log("here ", users);
            })
            .joining((user) => {
              console.log("joining ", user);
            })
            .leaving((user) => {
              console.log("leaving ", user);
            })
            .error((error) => {
              console.error("error Join", error);
            });

            setEchoInstance(echo)
        }
    }, [user])

    return echoInstance
}

export default useEcho