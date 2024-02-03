export type Recipe = {
    uri: string
    label: string
    image: string
    images: {
        THUMBNAIL: {
            url: string
            width: number
            height: number
        }
        SMALL: {
            url: string
            width: number
            height: number
        }
        REGULAR: {
            url: string
            width: number
            height: number
        }
        LARGE: {
            url: string
            width: number
            height: number
        }
    }
    source: string
    url: string
    shareAs: string
    yield: number
    dietLabels: [string]
    healthLabels: [string]
    cautions: [string]
    ingredientLines: [string]
    ingredients: [
        {
            text: string
            quantity: number
            measure: string
            food: string
            weight: number
            foodId: string
        }
    ]
    calories: number
    glycemicIndex: number
    totalCO2Emissions: number
    co2EmissionsClass: 'A+'
    totalWeight: number
    totalTime: number
    cuisineType: [string]
    mealType: [string]
    dishType: [string]
    totalNutrients: {}
    totalDaily: {}
    digest: [
        {
            label: string
            tag: string
            schemaOrgTag: string
            total: number
            hasRDI: true
            daily: number
            unit: string
            sub: {}
        }
    ]
}

export type RecipeSearchResults = {
    nextPageUrl: string
    recipes: Recipe[]
}

interface Nutrient {
    label: string
    quantity: number
    unit: string
}

export type TotalNutrients = {
    [key: string]: Nutrient
}

export type digest = [
    {
        label: string
        tag: string
        schemaOrgTag: string
        total: number
        hasRDI: true
        daily: number
        unit: string
        sub: {}
    }
]

export type AutocompleteValues = {
    [key: string]: string | null
}

export type AutocompleteConfig = {
    label: string
    options: string[]
}
