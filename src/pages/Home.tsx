import '../App.css'
import { Button, Layout } from 'antd'
import ProductList from '../features/products/ProductList'
import Header from '../components/Header'
import { useState } from 'react'
import SupportChatBox from '../features/ChatBox/SupportChatBox';
import { MessageOutlined } from '@ant-design/icons';
import ProductAIBotChatBox from '../features/ChatBox/ProductAIBotChatBox'

const { Content } = Layout

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [cartItemCount, setCartItemCount] = useState(0) // Mock cart count
  const [showChat, setShowChat] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handlePriceFilter = (range: string) => {
    setPriceFilter(range)
  }

  return (
    <Layout className="app-layout">
      <Header 
        onSearch={handleSearch}
        onPriceFilter={handlePriceFilter}
        cartItemCount={cartItemCount}
      />
      <Content className="app-content">
        <ProductList 
          searchTerm={searchTerm}
          priceFilter={priceFilter}
        />
      </Content>
      {/* Nút chatbox nổi */}
      <div style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}>
        {showChat && (
          <div style={{
            marginBottom: 24, // tăng margin để nút không che input
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            borderRadius: 16,
            overflow: 'hidden',
            background: '#fff',
            maxWidth: '95vw',
            width: 360,
            height: 480,
            maxHeight: '80vh',
            transition: 'all 0.2s',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <ProductAIBotChatBox/>
          </div>
        )}
        <Button
          onClick={() => setShowChat((v) => !v)}
          icon={<MessageOutlined style={{fontSize:20, color:"#4076ed"}} />}
          type="default"
          shape="circle"
          style={{
            width: 56,
            height: 56,
            // borderRadius: '50%',
            // background: '#4076ed',
            // color: '#fff',
            // border: 'none',
            // boxShadow: '0 2px 8px rgba(64,118,237,0.18)',
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            // fontSize: 28,
            // cursor: 'pointer',
            // transition: 'background 0.2s',
          }}
        >
        </Button>
        <style>{`
          @media (max-width: 600px) {
            .app-content {
              padding-bottom: 80px !important;
            }
            // button[style] {
            //   width: 48px !important;
            //   height: 48px !important;
            //   font-size: 22px !important;
            // }
            div[style*='width: 360px'] {
              width: 98vw !important;
              height: 60vh !important;
              min-width: unset !important;
              min-height: unset !important;
              max-height: 60vh !important;
              margin-bottom: 20px !important;
            }
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default Home