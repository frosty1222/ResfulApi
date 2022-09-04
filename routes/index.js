const testRouter = require('./tests');
const productRouter = require('./products');
const beRouter = require('./beverages');
const caterRouter = require('./caters');
const userRouter = require('./users');
const cartRouter = require('./carts');
const couponRouter = require('./coupons');
const paymentRouter = require('./payments');
function route(app) {
  app.use('/product',productRouter);
  app.use('/beverage',beRouter); 
  app.use('/cater',caterRouter);
  app.use('/user',userRouter);
  app.use('/cart',cartRouter);
  app.use('/coupon',couponRouter);
  app.use('/payment',paymentRouter);
  app.use('/test',testRouter);
}
module.exports = route;