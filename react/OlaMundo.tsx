/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'

interface Recipe2 {
  orderID: number
  name: string
  lastName: string
  recipeTitle: string
  recipeDesc: string
  SKUrecipe: number
}

const OlaMundo = () => {



  const [listOfRecipes, setListOfRecipes] = useState<Recipe2[]>([])
  const [filteredRecipe, setFilteredRecipe] = useState<Recipe2[]>([])

  useEffect(() => {
    fetch(
      'https://testebrabo3--estagioacct.myvtex.com/api/dataentities/podrao_dg/search?_fields=_all',
      {
        headers: {
          method: 'GET',
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Cookie:
            'eyJhbGciOiJFUzI1NiIsImtpZCI6IjgyRTg3RjdGODZFM0E4NkMwMkY4OTYyRTE1QkUyREJEODMzMEJENzgiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJkb3VnbGFzLmFsb25zb0BhY2N0Lmdsb2JhbCIsImFjY291bnQiOiJhY2N0Z2xvYmFsIiwiYXVkaWVuY2UiOiJhZG1pbiIsInNlc3MiOiIyNTIwNGQzZC05ZTc2LTQ2MjgtOWZhNC1mNzdhNDFhZTE1MzYiLCJleHAiOjE2ODkwODA4NDMsInVzZXJJZCI6Ijg2YjVlNTlkLWVkNzUtNGEzZS04NDZmLWJlZjUxZDAyNzEzNiIsImlhdCI6MTY4ODk5NzE4MCwiaXNzIjoidG9rZW4tZW1pdHRlciIsImp0aSI6IjYxZTg1NWJlLWY1NGMtNDBhNS1hMDZkLTdlYzY2ZjYzZTM1ZCJ9.sT67giaK_l3OD-PiHhVBK7fUu3sQgLUhHx6sC_w9-sdJbVo36W0h4KWWbvuBTHm_4zfFp7V1S8Jxis7MWzUiEw',
          // Outros cabeçalhos podem ser adicionados aqui
          // Mudar sempre o Cookie, o mesmo dura 24H
        },
      }
    )
      .then((response) => response.json())
      .then((data: Recipe2[]) => {
        setListOfRecipes(data)
      })
  }, [])

  const productContextValue = useProduct()
  const skuContext = productContextValue?.selectedItem?.itemId

  useEffect(() => {

    getRecipe()

  }, [listOfRecipes]) 

  function getRecipe () {
    const filteredResults = listOfRecipes.filter(
      (recipe) => recipe.SKUrecipe === Number(skuContext)
    )

    setFilteredRecipe(filteredResults)
  }

  
  return (
    <div>
      <h1>Bem vinde!</h1>
      <div>
        {filteredRecipe ? (
          filteredRecipe.map((recipe: Recipe2) => {
            return (
              <div key={recipe.SKUrecipe}>
                <h2>Pelo SkU foi encontrado:</h2>
                <p>Nome: {recipe.name}</p>
                <p>lasName: {recipe.lastName}</p>
                <p>recipeTitle: {recipe.recipeTitle}</p>
                <p>SKU: {recipe.SKUrecipe}</p>
                <p>Desc: {recipe.recipeDesc}</p>
              </div>
            )
          })
        ) : (
          <p>Nada encontrado</p>
        )}
      </div>
    </div>

  )
}

export default OlaMundo
