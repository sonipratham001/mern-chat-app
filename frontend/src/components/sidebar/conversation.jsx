import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";
import useMediaQuery from "../../hooks/useMediaQuery"; // Adjust the path according to your project structure

const Conversation = ({ conversation, lastIdx, emoji }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id);
    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <>
            <div 
                className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
                    ${isSelected ? "bg-sky-500" : ""}
                `}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} alt="user avatar" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-3 justify-between`}>
                        <p className={`font-bold ${isMobile ? 'text-gray-200' : 'text-gray-800'}`}>{conversation.fullName}</p>
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className="divider my-0 py-0 h-1" />}  
        </>
    );
};

export default Conversation;
