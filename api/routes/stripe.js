const router = require("express").Router();
const Stripe = require("stripe");
// const stripe = require("stripe")(
//
// );

const stripe = require("stripe")(
  "sk_test_51MBfIkJVRvIvayvgtRS1GjWdHxsBeMFsz7teccz00r3y8h5SPbEw6KQukyXt2W6i4oXZs8LykwAahgYQPxSOMf5c00HxqBwTy3"
);

router.post("/payment", (req, res) => {
  console.log(req.body);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "EGP",
      source: "tok_visa",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr.message);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
