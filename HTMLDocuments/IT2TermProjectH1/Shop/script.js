

const Customer = new User()


const PRODUCTS = {
    BROOM: new Item(name="Broom", price=75, image="https://th.bing.com/th/id/R.2b629468fe1e4a6bf7f845d6be321e6b?rik=ECy3%2fS7QJQbUAg&riu=http%3a%2f%2fs3-ap-southeast-2.amazonaws.com%2fwc-prod-pim%2fJPEG_1000x1000%2fLEB10404F_oates_general_indoor_broom_handle_white.jpg&ehk=dy1QO1HMR%2fxSoyCw6QWvxnhOWwlVh0qNcODTuogIQvo%3d&risl=&pid=ImgRaw&r=0"),
    CAR: new Item(name="Car", price=1000, image="https://th.bing.com/th/id/R.5d1b5a852feb67534d9b91f0d99ff437?rik=nPltdhOoUlVOQg&pid=ImgRaw&r=0"),
    BARROW: new Item(name="Barrow", price=100, image="https://th.bing.com/th/id/R.d9ec1d0e0d7e883f928cc5ac32039022?rik=J1Kf5a7muyWniw&pid=ImgRaw&r=0"),
    HOUSE: new Item(name="House", price=2000, image="https://th.bing.com/th/id/R.0d81a45576b49d11b9742829e0d839e6?rik=riryll4xK85PEQ&pid=ImgRaw&r=0"),
    COMPUTER: new Item(name="Computer", price=750, image="https://th.bing.com/th/id/R.149f30991d4004266cf7227b1e463bc8?rik=VeEvvAAqutAZ9Q&pid=ImgRaw&r=0")
}



function initialiseVariables() {
    createProducts()
}

function createProducts() {
    productsContainer = document.querySelector(".productsContainer")
    if (productsContainer == null) {
        location.href = location.href
    }

    for (let productID of Object.keys(PRODUCTS)) {
        product = PRODUCTS[productID]
        product.ID = productID
        productHTMLELEMENT = createProductHTMLElement(product)
        productsContainer.append(productHTMLELEMENT)
    }

    console.log(productsContainer)
}


function createProductHTMLElement(product) {
    //Am gonna use innerHTML because its faster than creating all the elements by myself, and also because I control the inputs.
    productEL = document.createElement("div")
    productEL.setAttribute("class", "product")
    productTemplate = `
                    <div class="productImage"
                        style="background-image:url(${product.IMAGE});">
                    </div>
                    <div class="productInfo">
                        <h2 class="productName">${product.NAME}</h2>
                        <h2 class="productPrice">${product.PRICE}kr</h2>
                        <h4 class="productsInCart">
                            In cart: 0
                        </h4>
                        <button class="addProductToCartButton" data-productID="${product.ID}"
                            onclick="Customer.addToCart(button=this, itemId='${product.ID}')">Add to Cart</button>
                        <button class="removeProductToCartButton" data-productID="${product.ID}"
                            onclick="Customer.removeFromCart(button=this, itemId='${product.ID}')">Remove from Cart</button>
                    </div>
    `
    productEL.innerHTML = productTemplate
    return productEL
}



function getProductById(itemId){
    product = PRODUCTS[itemId]
    if(product==undefined) return null
    else return product
}

function updateItemsCount(countElement, itemId){
    product = Customer.CART[itemId] || null
    product != null ? count = product.count : count = 0

    countElement.innerText = `In cart: ${count}`
}

function updateCheckoutCartInfo(){
    CART = Customer.CART
    template = ``
    totalCost = 0

    checkOutCartInfoDiv = document.querySelector(".checkoutCartInfo")
    totalPriceCartInfo = document.querySelector(".checkoutCartInfoTotalCost")

    checkOutCartInfoDiv.innerHTML = template
    totalPriceCartInfo.innerText= "Total Cost: 0kr"

    let itemsInCart = Object.keys(CART).filter(item=>{
        return this.CART[item].count > 0
    })

    itemsInCart.forEach(item=>{
        template += `<span>${CART[item].count} ${CART[item].productName}: ${(CART[item].count)*CART[item].productPrice}kr </span>`
        totalCost += (CART[item].count)*CART[item].productPrice

        checkOutCartInfoDiv.innerHTML = template
        console.log(template)
    })

    Customer.totalCost = totalCost
    
    totalPriceCartInfo.innerText = `Total Cost: ${totalCost}kr`
}
