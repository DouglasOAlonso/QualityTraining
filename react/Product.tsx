import React, { useState } from 'react'

interface Product {
  id: number
  name: string
  description: string
  sku: string
}

const products: Product[] = [
  { id: 1, name: 'Produto 1', description: 'Descrição do Produto 1', sku: '1' },
  { id: 2, name: 'Produto 2', description: 'Descrição do Produto 2', sku: '2' },
  { id: 3, name: 'Produto 3', description: 'Descrição do Produto 3', sku: '3' },
]

const App = () => {
  const [searchSKU, setSearchSKU] = useState('')
  const [foundProduct, setFoundProduct] = useState<Product | null>(null)

  const handleSearch = () => {
    const found = products.find((product) => product.sku === searchSKU)

    setFoundProduct(found || null)
  }

  return (
    <div>
      <h1>Buscar Produto por SKU</h1>
      <input
        type="text"
        placeholder="Digite o SKU do produto"
        value={searchSKU}
        onChange={(e) => setSearchSKU(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>

      {foundProduct !== null ? (
        <div>
          <h2>Produto Encontrado</h2>
          <p>ID: {foundProduct.id}</p>
          <p>Nome: {foundProduct.name}</p>
          <p>Descrição: {foundProduct.description}</p>
          <p>SKU: {foundProduct.sku}</p>
        </div>
      ) : (
        <p>Nenhum produto encontrado com o SKU informado.</p>
      )}
    </div>
  )
}

export default App
