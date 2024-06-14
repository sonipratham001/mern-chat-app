import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

 const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const newSocket = io("http://localhost:5001", {
                query:{
                    userId: authUser._id,
                }
            });

            newSocket.on('connect', () => {
                console.log('Connected to server', newSocket.id);
            });

            newSocket.on('disconnect', () => {
                console.log('Disconnected from server');
            });

            setSocket(newSocket);
            newSocket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            } )

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
