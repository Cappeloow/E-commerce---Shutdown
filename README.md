## 2.Det skall gå att ange en rabattkod för att få rabatt på sitt köp (Detta görs genom Stripe)

# Webshop with Stripe Integration

## Description

This is a simple webshop application that allows users to place orders and make payments through Stripe integration. Users can register and log in, and their information is stored as customers in Stripe. Usernames/emails and encrypted passwords are saved in a JSON file on the server. User login is managed using cookies. All products are managed through Stripe.

## Requirements

- User registration and login.
- Stripe integration for payment processing.
- Order storage in a JSON file on the server.
- User storage in a JSON file on the server.
- Backend: Node.js/Express
- Frontend: React/Typescript

## Getting Started

To build and run the project, follow these steps:

1. Clone the GitHub repository
2. Open up two terminals, navigate using `cd server` and `cd client` on each terminal.
3. Install the necessary dependencies using `npm install` in both the server and client directories.
4. Configure your Stripe API keys in the server configuration file.
5. Start the server using `npm start` in the server directory.
6. Start the client using `npm start` in the client directory.
7. Access the webshop in your browser using `npm run dev` when you are in the `/client` directory.

## How to Use

1. Register for an account or log in if you already have one.
2. Browse the products and add them to your cart.
3. Proceed to checkout and make a payment using the provided test card information. - `https://stripe.com/docs/testing`
4. If you wish to use a Coupon to get some discount: `CAP15`
5. Upon successful payment validation, your order will be saved on the server and you will see the confirmation page if you successfully made an order.
