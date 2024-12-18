import ChatRoom from "@/components/chat/ChatRoom";
import Gameboard from "@/components/gameboard/Gameboard";

export default function Home() {
  return (
    <div className="flex mt-24 justify-center w-full">
      <ChatRoom />
      <Gameboard />
    </div>
  );
}
