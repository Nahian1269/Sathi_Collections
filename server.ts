import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Routes
  app.post("/api/checkout", async (req: Request, res: Response) => {
    const { customer, items, total } = req.body;

    console.log("Order Received:", { customer, items, total });

    const gmailUser = process.env.GMAIL_USER || "nahian1269@gmail.com";
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    const recipient = "nahindip1269@gmail.com";
    const ccRecipient = "nahian12169@gmail.com";

    // Create email content
    const itemsHtml = items.map((item: any) => `
      <li style="padding: 10px 0; border-bottom: 1px font-size: 14px;">
        <strong>${item.name}</strong><br/>
        <span style="color: #666;">${item.quantity} x $${item.price}</span>
      </li>
    `).join("");

    const emailBody = `
      <div style="font-family: 'Inter', sans-serif; padding: 30px; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #f0f0f0;">
        <h1 style="font-family: serif; color: #000; text-align: center; letter-spacing: 2px; text-transform: uppercase;">Shathi Fashion Brand</h1>
        <div style="background: #fafaf8; padding: 20px; margin: 20px 0;">
          <h2 style="font-family: serif; font-size: 18px; border-bottom: 1px solid #1a1a1a; padding-bottom: 10px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Order Details</h2>
          <p style="margin: 5px 0;"><strong>Customer:</strong> ${customer.name}</p>
          <p style="margin: 5px 0;"><strong>Address:</strong> ${customer.address}</p>
          <p style="margin: 5px 0;"><strong>Phone:</strong> ${customer.phone}</p>
          <p style="margin: 5px 0;"><strong>Postal Code:</strong> ${customer.postalCode}</p>
        </div>
        <div>
          <h3 style="font-family: serif; font-size: 16px; text-transform: uppercase; letter-spacing: 1px;">Selected Items</h3>
          <ul style="list-style: none; padding: 0;">${itemsHtml}</ul>
        </div>
        <div style="margin-top: 30px; padding-top: 15px; border-top: 2px solid #1a1a1a; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 20px; font-weight: bold; font-family: serif;">TOTAL PREVIEW:</span>
          <span style="font-size: 20px; font-weight: bold; color: #c5a059;">$${total}</span>
        </div>
        <p style="text-align: center; color: #999; font-size: 10px; margin-top: 40px; text-transform: uppercase; letter-spacing: 1px;">
          Handcrafted Elegance since 2026
        </p>
      </div>
    `;

    if (gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: gmailUser,
            pass: gmailPass,
          },
        });

        await transporter.sendMail({
          from: `"Shathi Fashion Brand" <${gmailUser}>`,
          to: recipient,
          cc: ccRecipient,
          subject: "Order Confirmation - Shathi Fashion Brand",
          html: emailBody,
        });

        console.log("SUCCESS: Order email sent to", recipient);
      } catch (error: any) {
        console.error("GMAIL ERROR DETAIL:", error.message);
        if (error.code === 'EAUTH' || (error.message && error.message.includes('535'))) {
          console.error("!!! GMAIL CONFIGURATION ERROR !!!");
          console.error("Google rejected the password. This is usually because you used a regular password.");
          console.error("REQUIRED: You must use a 16-character 'App Password' from Google Account Settings.");
          console.error("Step 1: Enable 2-Step Verification on nahian1269@gmail.com");
          console.error("Step 2: Search for 'App Passwords' in your Google Account security settings.");
          console.error("Step 3: Generate a 16-character code and use it as GMAIL_APP_PASSWORD.");
        } else {
          console.error("General Mail Error:", error);
        }
      }
    } else {
      console.log("------------------------------------------------------------------");
      console.log("EMAILS ARE NOT ACTIVE YET:");
      console.log("To enable real emails, set GMAIL_APP_PASSWORD in the Secrets panel.");
      console.log("Logging Order Details to Console instead:");
      console.log("To:", recipient);
      console.log("Order Total:", total);
      console.log("------------------------------------------------------------------");
    }

    res.status(200).json({ 
      success: true, 
      message: "Order placed successfully!",
      details: "An order summary has been logged."
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
