const { errorMessage, notFoundError } = require("@/library/functions");
const { Order, Detail } = require("@/models");

class OrderController {
  index = async (req, res, next) => {
    try {
      let orders = await Order.find({ userId: req.user._id });

      for (let i in orders) {
        let details = await Detail.aggregate()
          .match({ orderId: orders[i]._id })
          .lookup({
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "product",
          });

        for (let j in details) {
          details[j].product = details[j].product[0];
        }
        orders[i] = {
          ...orders[i],
          details,
        };
      }
      res.send(orders);
    } catch (error) {
      errorMessage(next, error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await Brand.findById(id);

      if (order) {
        const { name, status } = req.body;

        await Order.findByIdAndUpdate(
          id,
          { name, status },
          { runValidators: true }
        );

        res.send({
          message: "Order updated.",
        });
      } else {
        notFoundError(next, "Order");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { id } = req.params;

      const order = await Order.findById(id);

      if (order) {
        await Order.findByIdAndDelete(id);

        res.send({
          message: "Brand deleted.",
        });
      } else {
        notFoundError(next, "Brand");
      }
    } catch (error) {
      errorMessage(next, error);
    }
  };
}

module.exports = new OrderController();
