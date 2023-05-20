


class Item{
    constructor(name,price,image){
        this.NAME = name
        this.PRICE = price
        this.IMAGE = image
    }
}



class User{
    constructor(){
        this.CART = {}
        this.totalCost = 0

        this.updateItemsCount = updateItemsCount
        this.updateCheckoutCartInfo =  updateCheckoutCartInfo

    }

    checkout(){
        //Checksout the Customer
        let itemsInCart = Object.keys(this.CART).filter(item=>{
            return this.CART[item].count > 0
        })

        alert(`Bought ${itemsInCart.length} products for ${this.totalCost}kr`)
        location.reload()

        
    }

    addToCart(button,itemId){
        //Adds an item to the Cart.
        this.clearCart()
        let itemsInCart = Object.keys(this.CART)
    
        if(!itemsInCart.includes(itemId)){
            let product = getProductById(itemId)
            if(product==null){console.log("Invalid Poduct");return}
            this.CART[itemId] = {
                productName:product.NAME,
                productPrice:product.PRICE,
                count:1,
            } 
        } else {
            this.CART[itemId].count += 1
        }
        
        let inCartCountElement = Array.from(button.parentNode.children).filter(infoDiv=>{return infoDiv.classList.contains("productsInCart")})[0]
        this.updateItemsCount(inCartCountElement, itemId)
        this.updateCheckoutCartInfo()
    }

    removeFromCart(button,itemId){
        //Removes an Item from the Cart
        this.clearCart()
        let itemsInCart = Object.keys(this.CART)

        if(!itemsInCart.includes(itemId)){
            console.log("Item not in cart")
            this.CART[itemId] = {
                count:0
            }
            return
        }

        if(this.CART[itemId].count>0) {this.CART[itemId].count -= 1}

        let inCartCountElement = Array.from(button.parentNode.children).filter(infoDiv=>{return infoDiv.classList.contains("productsInCart")})[0]
        this.updateItemsCount(inCartCountElement, itemId)
        this.updateCheckoutCartInfo()
    }

    clearCart(){
        //Removes all items that have a 0 item count from the Cart.
        let newCart = {}
        for(itemId of Object.keys(this.CART)){
            if(this.CART[itemId].count > 0){
                newCart[itemId] = this.CART[itemId]
            }
        }
        this.CART = newCart
    }

}

