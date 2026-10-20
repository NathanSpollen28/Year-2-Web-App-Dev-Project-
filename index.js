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

   for(let i=0; i< storeProduct.length;i++){ //looping through the xml to find=== all products 
        const product = (storeProduct[i])
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


        const col = document.createElement("div") //creating the type of elements 
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

        cardTitle.textContent = "Name: "+ name //labeling the text and taking the variables from the "textContent at the start of the loop"
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
       cardsRow.appendChild(col) 
       
        
       
        


        console.log(productCode,category,name,description,quantity,unitPrice)
        console.log(typeof unitPrice)
        console.log(typeof quantity)

    
   }

}
initialiseCards()
