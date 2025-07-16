import { useState } from 'react'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
  InfoButton,
} from '@chatscope/chat-ui-kit-react'
import type { MessageModel } from '@chatscope/chat-ui-kit-react'
export default function SupportChatBox() {
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: 'Chào bạn! Tôi có thể giúp gì cho bạn hôm nay?',
      direction: 'incoming',
      sender: 'Support',
      position:"single",
    },
  ])

  const handleSend = (text: string) => {
    if (text.trim() === '') return

    // Thêm tin nhắn người dùng
    const userMsg: MessageModel = {
      message: text,
      direction: 'outgoing',
      sender: 'You',
      position:"single"
    }

    // Giả lập phản hồi từ bot
    const botMsg: MessageModel = {
      message: `Bạn vừa nói: "${text}". Cảm ơn bạn đã liên hệ!`,
      direction: 'incoming',
      sender: 'Support',
      position:"single"
    }

    setMessages((prev) => [...prev, userMsg, botMsg])
  }

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MainContainer style={{ height: '100%', width: '100%' }}>
        <ChatContainer style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* ✅ Thêm Header ở đây */}
          <ConversationHeader>
            <Avatar
              name="Support Bot"
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            />
            <ConversationHeader.Content
              userName="Chuyên viên tư vấn"
              info="Đang hoạt động"
            />
            <ConversationHeader.Actions>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          
          <MessageList style={{ flex: 1, overflow: 'auto' }}>
            {messages.map((msg, index) => (
              <Message key={index} model={msg} />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Nhập tin nhắn..."
            onSend={handleSend}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}
