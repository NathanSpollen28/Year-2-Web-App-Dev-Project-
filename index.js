async function loadXML(){ // getting the xml file 

    
   const response = await fetch("products.xml")
    if(!response.ok){
        console.error("Error XML not found")
        return
   }
   console.log(response)
   
   const responseResult = await response.text()
   console.log(responseResult)

   const xmlFile = new DOMParser() .parseFromString(responseResult,"text/xml")//converting the xml in DOM doc 
   
   if(xmlFile.querySelector("parsererror")){
        console.error("XML not formatted correctly")//warnings if not correctly formatted 
   
        return 
   }
   console.log(xmlFile)
   return xmlFile 
   
}


function displaySearchCard(product){
     const productCode = product.getAttribute("code")
        const category = product.querySelector("category").textContent
        const name = product.querySelector("name").textContent
        const description = product.querySelector("description").textContent
        const quantity = parseInt(product.querySelector("quantity").textContent,10)
        const unitPrice = parseFloat(product.querySelector("unitPrice").textContent)
        const readCurrency = product.querySelector("unitPrice").getAttribute("currency")
        let quantityWarning 

        if(quantity === 0){ //quantity checker 
            quantityWarning ="Out of stock"

        }
        else{
            quantityWarning ="Quantity: "+ quantity
        }


        const col = document.createElement("div") //creating elements  
        const card = document.createElement("div")
        const cardBody = document.createElement("div")
        const cardTitle = document.createElement("h5")
        const cardSubtitle = document.createElement("h6")
        const cardSubtitle2 = document.createElement("h6")
        const cardSubtitle3 = document.createElement("h6")
        const cardSubtitle4 = document.createElement("h6")
        const cardText = document.createElement("p")

        col.classList.add("col") //bootstrap card styling 
        card.classList.add("card")
        cardBody.classList.add("card-body")
        cardTitle.classList.add("card-title")
        cardSubtitle.classList.add("card-subtitle","mb-2", )
        cardSubtitle2.classList.add("card-subtitle","mb-2",)
        cardSubtitle3.classList.add("card-subtitle","mb-2",)
        cardSubtitle4.classList.add("card-subtitle","mb-2",)
        cardText.classList.add("card-text")

        cardTitle.textContent = "Name: "+ name //labeling the text
        cardSubtitle.textContent = "Category: "+ category
        cardSubtitle2.textContent = "Product Code: " +productCode
        cardSubtitle3.textContent = "Price: " +unitPrice.toFixed(2) + " " + readCurrency
        cardSubtitle4.textContent = quantityWarning
        cardText.textContent =  description

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
async function initialiseCards(){ //creating the cards 
    const holdXML = await loadXML() //getting the xml file 
    if(!holdXML){
        console.error("No XML found")
        return

    }
   const storeProduct =  holdXML.getElementsByTagName("product")
   console.log(storeProduct.length)

   const cardsRow = document.getElementById("cards-row") //targeting the cards row id from html 
   console.log(cardsRow)

   for(let i=0; i< storeProduct.length;i++){ //looping through the xml to find all products 
        const product = (storeProduct[i])
        
    
       cardsRow.appendChild(displaySearchCard(product))
       
        
       
        


       

    
   }

}


initialiseCards()

//form time 

const form = document.getElementById("mainForm")
form.addEventListener("submit",async function(event){
    event.preventDefault()
    const productCodeInput = document.getElementById("productCode")
    const userProductCodeInput = productCodeInput.value.trim()
    const errorMsg = document.getElementById("result")
    if(userProductCodeInput === ""){ //empty check 
        errorMsg.textContent = "Error: No input. Valid format 100-01."
        return
    }
    const codePattern = /^[0-9]{3}-[0-9]{2}$/ //format of code 
    if(!codePattern.test(userProductCodeInput)){ //if not user input 
        errorMsg.textContent = "Wrong format. Valid format 100-01."
        return
    }
    errorMsg.textContent = ""//stops cards stacking 

    const waitLoadXML = await loadXML()
    if(!waitLoadXML){
        errorMsg.textContent ="Products not loading."
        console.error("XML not found")
        return
    }
    const findProduct = waitLoadXML.querySelector('product[code ="'+ userProductCodeInput +'" ]')
    if(findProduct === null){
        errorMsg.textContent = "Your product code does not exist, please try again." 
        return
    }
    errorMsg.appendChild(displaySearchCard(findProduct))


    


})




