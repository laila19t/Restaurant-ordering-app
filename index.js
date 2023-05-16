import { menuArray } from './data.js'
const cardForm = document.getElementById('card-form')


document.addEventListener('click',function(e){
    if(e.target.id==='add-btn'){
        getOrderMenu(e.target.dataset.id)
    }
    else if(e.target.dataset.removeid){
        removeOrder(e.target.dataset.removeid)
    }
    else if(e.target.id==='complete-btn'){
        document.getElementById('module').classList.remove('hiddin')
    }
    else if(e.target.id==='pay-btn'){
        if(cardForm.checkValidity()){
            e.preventDefault()
            const cardFormData = new FormData(cardForm)
            const fullName = cardFormData.get('user-name')
            renderConfirmation(fullName)
            document.getElementById('module').classList.add('hiddin')
        }
    }
})


let orderArray=[]

function getOrderMenu(itemId){
    const targetItem = menuArray.filter(function(it){
        return it.id===parseInt(itemId)
    })[0]

    orderArray.push(targetItem)
    renderOrder()
}

function renderOrder(){
    let orderString=''
    let totalPrice=0
    orderArray.forEach(function(order){
      orderString+=`
      <div class="cart-item">
      <div class="space-class">
          <h3 class="margin-class">${order.name}</h3>
          <button class="remove-btn margin-class" data-removeid="${order.id}">remove</button>
      </div>
      <h3 class="margin-class">$${order.price}</h3>
  </div>
      `
      totalPrice+=order.price
    })
    
    let orderHTML = `
    <h3>Your order</h3>
    ${orderString}
    <div class="total">
        <h3 class="margin-class">total price:</h3>
        <h3 class="margin-class">$${totalPrice}</h3>
    </div>
    <button id="complete-btn">Complete order</button>
    `
    document.getElementById('order').innerHTML= orderHTML
}


function removeOrder(itemId){
    const targetItem = menuArray.filter(function(it){
        return it.id===parseInt(itemId)
    })[0]

    orderArray.pop(targetItem)
    renderOrder()
}


function renderConfirmation(name){
    let conformationString = `
    <div class="confirmation">
             <h3>Thanks, ${name}! Your order is on the way! </h3>
            </div>
    `
    document.getElementById('order').innerHTML= conformationString
}


function getProductsHTML(){
let myProducts=''

menuArray.forEach(function(item){
    let myIngredients=''

    for(let i=0;i<item.ingredients.length;i++){
        if(item.ingredients.length-i===1){
            myIngredients+= `${item.ingredients[i]} `
        }
        else{
            myIngredients+= `${item.ingredients[i]}, `
        }
    }

    myProducts+=`
    <div class="item">
    <img class="item-img" src="${item.image}">
    <div class="item-info">
        <p class="item-name">${item.name}</p>
        <p class="item-ing">${myIngredients}</p>
        <p class="item-price">$${item.price}</p>
    </div>
    <button class="add-btn" id="add-btn" data-id="${item.id}">+</button>
    </div>
    `
})
return myProducts
}


function render(){
    document.getElementById('products').innerHTML = getProductsHTML()
}


render()



