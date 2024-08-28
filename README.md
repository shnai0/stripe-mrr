# Stripe MRR Dashboard

This project is a dashboard that combines MRR (Monthly Recurring Revenue) data from two Stripe accounts, providing a comprehensive view of your business's recurring revenue.

## Features

- Combines MRR data from two separate Stripe accounts
- Displays total MRR and volume for each account and combined
- Shows historical MRR and volume trends with interactive charts
- Responsive design for both desktop and mobile viewing
- Simple, clean UI with a navbar and footer

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Recharts for data visualization
- Stripe API
- VO 
- shadcn



## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Stripe account(s) with API access

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/shnai0/stripe-mrr.git
   cd stripe-mrr-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Stripe API keys:
   ```
   STRIPE_SECRET_KEY_1=sk_test_...
   STRIPE_SECRET_KEY_2=sk_test_...
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Configuration

You can customize the dashboard by modifying the following files:

- `lib/stripe.ts`: Adjust Stripe API calls and data processing
- `pages/index.tsx`: Modify the main dashboard layout and components
- `components/ui/charts.tsx`: Customize chart appearance and behavior



## Deployment

This project can be easily deployed to Vercel or any other Next.js-compatible hosting platform. Make sure to set up your environment variables in your hosting provider's settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. I would love to improve Gross volume and exact number of MRR currently they not correlate on 100 %


## Acknowledgments

- [Stripe](https://stripe.com) for their excellent API and documentation
- [Next.js](https://nextjs.org) for the React framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Recharts](https://recharts.org) for the charting library
- [Recharts](https://recharts.org) for the charting library


## Support

If you have any questions or need help with setup, please open an issue in this repository.

---
