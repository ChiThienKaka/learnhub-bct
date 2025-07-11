import './App.css'
import { Layout } from 'antd'
import ProductList from './features/products/ProductList'
import Header from './components/Header'
import { useState } from 'react'

const { Content } = Layout

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [cartItemCount, setCartItemCount] = useState(0) // Mock cart count

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
    </Layout>
  )
}

export default App
