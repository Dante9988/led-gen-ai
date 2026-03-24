# Local Stripe Webhook Testing

Use the **Stripe CLI** to forward webhook events to your local dev server.

> The Stripe CLI is a developer machine tool — it is NOT an npm dependency.

## Setup (one-time)

1. **Install Stripe CLI**
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Linux (Debian/Ubuntu)
   curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
   echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee /etc/apt/sources.list.d/stripe.list
   sudo apt update && sudo apt install stripe
   ```

2. **Authenticate**
   ```bash
   stripe login
   ```

## Usage (every dev session)

1. **Start webhook forwarding**
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
   Copy the `whsec_...` signing secret it prints and set it in `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

2. **Start your dev server** in another terminal
   ```bash
   npm run dev
   ```

3. **Trigger test events** (optional)
   ```bash
   stripe trigger checkout.session.completed
   stripe trigger invoice.payment_failed
   ```

## Handled Webhook Events

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Creates/updates subscription row |
| `customer.subscription.updated` | Syncs plan and status changes |
| `customer.subscription.deleted` | Reverts user to free plan |
| `invoice.payment_failed` | Marks subscription as `past_due` |
