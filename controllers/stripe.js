const prisma = require("../config/prisma");
const stripe = require("stripe")(process.env.VITE_STRIPE_SK);

exports.payment = async (req, res) => {
  try {
    console.log("User ID:", req.user.id);

    // Fetch cart
    const cart = await prisma.cart.findFirst({
      where: { orderedById: req.user.id },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    if (typeof cart.cartTotal !== "number" || cart.cartTotal <= 0) {
      return res.status(400).json({ message: "Invalid cart total" });
    }

    const amountTHB = cart.cartTotal * 100;

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountTHB,
      currency: "thb",
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

