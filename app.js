console.log('now loading mr Mick Burger')

// const menu in this context just protects menu from being changed, not any of the data inside of it.
const menu = [
  {
    name: 'Big Baddie Burger',
    price: 9,
    quantity: 0,
    inventory: 10 //just an example not used
  },
  {
    name: 'Bogus Burger',
    price: 12,
    quantity: 0
  },
  {
    name: 'Meat Tornado',
    price: 15.00, // adding the .00 does nothing, js will scrape that off when it loads
    quantity: 0
  },
  {
    name: 'Twenty Dollar Burger',
    price: 19.99,
    quantity: 0
  }
]

function addBaddie() {
  console.log('added baddie')
  let burger = menu[0] // creating an 'alias'
  // console.log(burger.name, menu[0].name);
  burger.quantity++
  console.log(burger);
}

function addBurger(name) {
  // console.log('adding burger', name);
  const burger = menu.find(burg => burg.name == name)
  burger.quantity++
  //   if (burger.quantity > burger.inventory)
  //  burger.quantity = burger.inventory
  console.log(burger.name);
  console.log('found your burger madam or sir', burger);

  drawCart()
}

function drawCart() {
  let total = 0
  let template = ''
  menu.forEach(burg => {
    // REVIEW total is used to get a total cost of the cart
    total += burg.price * burg.quantity
    if (burg.quantity) {
      // REVIEW the template creates an itemized cart
      // REVIEW when injecting data into HTML if you want strings to stay strings and not be turned to html, you must trick the html by wrapping it in quotes, see the onclick argument for example.
      template += `
      <div class="item"><b>${burg.name}</b> 
      <span class="btn" onclick="editQuantity('${burg.name}')">${burg.quantity} -
        $${(burg.quantity * burg.price).toFixed(2)}</span>
        <button class="btn text-danger" onclick="deleteBurger('${burg.name}')"><i class="mdi mdi-delete"></i></button></div>
      `
    }
  })
  console.log('total: $', total);
  // console.log('the template', template);
  document.getElementById('total').innerText = total.toFixed(2)
  document.getElementById('items').innerHTML = template
}

function checkout() {
  // NOTE window.confirm will let you get a bool from the user, the code will pause and wait for their input
  if (window.confirm('Are you ready to checkout?')) {

    console.log('checking out');
    menu.forEach(burg => burg.quantity = 0)

    drawCart()
  }
}

function deleteBurger(name) {
  console.log('deleting', name)
  const burger = menu.find(burg => burg.name == name)
  burger.quantity--

  drawCart()
}

function editQuantity(name) {
  const burger = menu.find(burg => burg.name == name)
  let amount = parseInt(window.prompt()) // you have to parse int on window prompt cause everything from is string
  if (amount < 0 || Number.isNaN(amount)) { //NaN is for if they don't enter a number
    window.alert('please enter a valid quantity')
    return
  }
  burger.quantity = amount

  drawCart()
}

