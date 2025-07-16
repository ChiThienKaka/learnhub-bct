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
import courses from '../../data/data.json';

type Course = typeof courses[number];

export default function ProductAIBotChatBox() {
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: 'Chào bạn! Hãy nhập từ khóa hoặc nhu cầu, tôi sẽ gợi ý khóa học phù hợp.',
      direction: 'incoming',
      sender: 'AI',
      position: 'single',
    },
  ])

  const handleSend = (text: string) => {
    if (text.trim() === '') return

    // Thêm tin nhắn người dùng
    const userMsg: MessageModel = {
      message: text,
      direction: 'outgoing',
      sender: 'You',
      position: 'single',
    }
    setMessages((prev) => [...prev, userMsg])

    setTimeout(() => {
      // Lọc khóa học phù hợp
      const keyword = text.toLowerCase();
      const matched: Course[] = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(keyword) ||
          c.shortDescription.toLowerCase().includes(keyword) ||
          c.fullDescription.toLowerCase().includes(keyword)
      );
      if (matched.length > 0) {
        setMessages((prev) => [
          ...prev,
          {
            message: `Tôi gợi ý cho bạn ${matched.length} khóa học phù hợp:`,
            direction: 'incoming',
            sender: 'AI',
            position: 'single',
          },
          ...matched.slice(0, 3).map((c) => ({
            message: `<b>${c.title}</b><br/><img src='${c.image}' style='width:80px;height:50px;object-fit:cover;border-radius:8px;margin:6px 0;'/><br/><span style='font-size:13px;'>${c.shortDescription}</span>`,
            direction: 'incoming',
            sender: 'AI',
            position: 'single',
            contentType: 'html',
          } as any)),
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            message: 'Xin lỗi, tôi chưa tìm thấy khóa học phù hợp với từ khóa này. Bạn hãy thử từ khóa khác nhé!',
            direction: 'incoming',
            sender: 'AI',
            position: 'single',
          },
        ])
      }
    }, 800)
  }

  return (
    <div style={{ position: 'relative', height: 480, width: '100%' }}>
      <MainContainer style={{ height: '100%', width: '100%' }}>
        <ChatContainer style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <ConversationHeader>
            <Avatar
              name="AI tư vấn"
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
            />
            <ConversationHeader.Content
              userName="Chatbot AI tư vấn sản phẩm"
              info="Đang hoạt động"
            />
            <ConversationHeader.Actions>
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList style={{ flex: 1, overflow: 'auto' }}>
            {messages.map((msg, index) =>
              (msg as any).contentType === 'html' ? (
                <div key={index} style={{ background: '#f4f6fb', borderRadius: 8, padding: 8, margin: '6px 0', maxWidth: 260, color: '#222', fontSize: 14, wordBreak: 'break-word', alignSelf: 'flex-start' }}>
                  <div dangerouslySetInnerHTML={{ __html: String(msg.message || '') }} />
                </div>
              ) : (
                <Message key={index} model={msg} />
              )
            )}
          </MessageList>
          <MessageInput
            placeholder="Nhập từ khóa hoặc nhu cầu sản phẩm..."
            onSend={handleSend}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
      <style>{`
        @media (max-width: 600px) {
          div[style*='height: 480px'] {
            height: 60vh !important;
            min-height: 320px !important;
            max-height: 60vh !important;
          }
        }
      `}</style>
    </div>
  )
}
