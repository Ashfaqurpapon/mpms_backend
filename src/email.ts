import nodemailer from "nodemailer";
import config from "./app/config";

export const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.smtp_email,      // your gmail
        pass: config.smtp_password,   // app password
    },
});
export const sendOrderNotification = async (orderData: any) => {
    const mailOptions = {
        from: `"Patabahari" <${config.smtp_email}>`,
        to: config.admin_email,    // your personal email
        subject: `New Order Received #${orderData._id}`,
        html: `
      <h2>New Order Received</h2>
      <p><strong>Customer:</strong> ${orderData.userName}</p>
      <p><strong>Phone:</strong> ${orderData.userPhone}</p>
      <p><strong>Plant:</strong> ${orderData.plantName}</p>
      <p><strong>Quantity:</strong> ${orderData.quantity}</p>
      <p><strong>Total:</strong> ${orderData.totalPrice} BDT</p>
      <p><strong>Order Time:</strong> ${new Date(orderData.createdAt).toLocaleString()}</p>
    `,
    };

    await mailTransporter.sendMail(mailOptions);
};
