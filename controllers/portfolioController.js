const sendEmailController = (db) => {
  return async (req, res) => {
    try {
      const { name, email, msg } = req.body;

      if (!name || !email || !msg) {
        return res.status(500).send({
          success: false,
          message: "Please provide all fields",
        });
      }

      // Example database operation
      const emailDocument = {
        name,
        email,
        message: msg,
        timestamp: new Date(),
      };
      await db.collection("emails").insertOne(emailDocument);

      return res.status(200).send({
        success: true,
        message: "Your Message Sent Successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "API Error",
      });
    }
  };
};

module.exports = { sendEmailController };
