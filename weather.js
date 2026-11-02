///form validation
const weatherURL = "https://api.weatherapi.com/v1/current.json?key=64cbce19fd8c45d0918123710262110&q="
const form = document.getElementById("citySearchForm")

function weatherCard(weatherData){
    const country = weatherData.location.country
    const city = weatherData.location.name
    const condition = weatherData.current.condition.text
    const tempC = weatherData.current.temp_c
    const feelsLikeC = weatherData.current.feelslike_c
    const windKph = weatherData.current.wind_kph
    const chanceOfRain = weatherData.current.chance_of_rain

    const col = document.createElement("div") //creating elements  
    const card = document.createElement("div")
     const cardBody = document.createElement("div")
    const cardTitle = document.createElement("h5")
    const cardSubtitle = document.createElement("h6")
    const cardSubtitle2 = document.createElement("h6")
    const cardSubtitle3 = document.createElement("h6")
    const cardSubtitle4 = document.createElement("h6")
    const cardText = document.createElement("h6")
    
    
    col.classList.add("col") //bootstrap card styling    
    card.classList.add("card")
    cardBody.classList.add("card-body")
    cardTitle.classList.add("card-title")
    cardSubtitle.classList.add("card-subtitle","mb-2", )
    cardSubtitle2.classList.add("card-subtitle","mb-2",)
    cardSubtitle3.classList.add("card-subtitle","mb-2",)
    cardSubtitle4.classList.add("card-subtitle","mb-2",)
    cardText.classList.add("card-text")

    cardTitle.textContent = "Country: "+ country //labeling the text
    cardSubtitle.textContent = "City: "+ city
    cardSubtitle2.textContent = "Condition: " + condition
    cardSubtitle3.textContent = "Feels Like: " + " °C" + feelsLikeC
    cardSubtitle4.textContent =  "Temperture:"  + " °C"+ tempC
    cardText.textContent =  "Wind Speed : " +  windKph + "km/h"

    //building the cards  
    cardBody.appendChild(cardTitle)  
    cardBody.appendChild(cardSubtitle)
    cardBody.appendChild(cardSubtitle2)
    cardBody.appendChild(cardSubtitle3)
    cardBody.appendChild(cardSubtitle4)
    cardBody.appendChild(cardText)
    card.appendChild(cardBody)  
    col.appendChild(card)
    
    return col

}

form.addEventListener("submit", async function (event){
    event.preventDefault()
    const citySearchInput = document.getElementById("citySearch")
    const userCitySearchInput = citySearchInput.value.trim()
    const result = document.getElementById("cityResult")

    if(userCitySearchInput === ""){
        result.textContent = "Please enter a city name"
        return 

    }

    const cityPattern = /^[\p{L}' ,-]{2,}$/u 


 if(!cityPattern.test(userCitySearchInput)){ 
        result.textContent = "Please enter a valid city."
        return
    }

    result.textContent = ""
    const urlRequest = weatherURL + encodeURIComponent(userCitySearchInput)
    const urlResponse = await fetch (urlRequest)
    const weatherData = await urlResponse.json()
   
    if(!urlResponse.ok){
        if(weatherData.error.code === 1006){
            result.textContent = "We couldn't find "+userCitySearchInput+"."+"Please try again."
            return 
        }
        else{
              result.textContent = "Weather service is unavailable right now."
            return 

        }
       
    }

    
  const card = weatherCard(weatherData)
  result.appendChild(card)
})