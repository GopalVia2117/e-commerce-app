const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY);

const Order = require("../models/Order");



router.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});






 async function mapToPrice(products){
  let prices = [];
  try{
    
    for(let product of products){
      let price = await stripe.prices.create({
        currency: 'usd',
        unit_amount: product.price * 100,
        product_data: {
          name: product.title,
        }
      });

      prices.push(price);
    }
      
  }
  catch(err){
    console.log(err);
  }

  return prices;
}
router.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const { user } = req.body;
  
  let prices = await mapToPrice(products);
  console.log(prices);
  const lineItems = prices.map((price, index) => {
    return {
      price: price.id,
      quantity: products[index].quantity,
      
    }
  })

  const YOUR_DOMAIN = "http://localhost:3000"

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  })

  let order_products = [];
  let amount = 0;
  for(let product of products){
    order_products.push({productId: product._id, quantity: product.quantity});
    amount += product.price * product.quantity;
  }

  let order = new Order({
    userId: user.currentUser._id,
    products: order_products,
    amount: amount,
    address: "ABC Colony, New Jersey, Holland",
    status: 'paid'
  }); 

  await order.save();

  res.send({
    url: session.url,
    session: session
  });

});



module.exports = router;

