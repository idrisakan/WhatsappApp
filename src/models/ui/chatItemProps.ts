interface Chat {
  id: number;
  name: string;
  surname: string;
  image: string;
  lastMessage: string;
  date: string;
  profileImageUrl: string;
}
interface ChatItemProps {
  item: Chat;
}
export type {ChatItemProps};
