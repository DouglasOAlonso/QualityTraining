/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useQuery } from 'react-apollo'

import Query from './Query.gql'

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

  const [skuInput, setSkuInput] = useState('')


  const { data } = useQuery(Query, {
    ssr: false,
    variables: {
        account: "estagioacct",
        acronym: "DG",
        fields: ["orderID", "name", "lastName", "recipeTitle", "recipeDesc", "SKUrecipe"]
    }
})

// eslint-disable-next-line no-console
console.log(data)

/* const getDoc = data?.documents?.map((item : any) =>
item.fields.reduce(
  (previousValue : any, currentValue : any) => ({
    ...previousValue,
    [currentValue.key]: currentValue.value
  }),
  {}
))
 */


// eslint-disable-next-line no-console
/* console.log(getDoc.map((item: any) => item)) */


  const handleFilter = () => {
    const filteredResults = listOfRecipes.filter(
      (recipe) => recipe.SKUrecipe === Number(skuInput)
    )

    setFilteredRecipe(filteredResults)
    setListOfRecipes([]) // Removendo a lista completa ao filtrar um item específico
  }






  return (
    <div>
      <h1>Bem vinde!</h1>
      <input
        type="text"
        value={skuInput}
        onChange={(e) => setSkuInput(e.target.value)}
        placeholder="Digite o número do SKU"
      />
      <button onClick={handleFilter}>Filtrar</button>
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
