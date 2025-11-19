# Paystack Configuration Update

## Overview
Updated Paystack payment integration across the entire website to support configurable currency (defaulting to KES for Kenyan operations) and improved error handling.

## Changes Made

### Server-Side Updates

#### 1. `/server/routes/paystack.js`
- **Config Endpoint** (`GET /api/paystack/config`):
  - Now reads currency from `PAYSTACK_CURRENCY` environment variable
  - Defaults to `KES` if not set (previously hardcoded to `NGN`)
  - Returns `isConfigured: true` flag for frontend checks

- **Initialize Endpoint** (`POST /api/paystack/initialize`):
  - Uses `PAYSTACK_CURRENCY` environment variable as default
  - Accepts currency from request body, falls back to environment default

#### 2. `/server/routes/paystackOrders.js`
- **Order Initialize** (`POST /api/paystack/orders/initialize`):
  - Removed hardcoded KES to NGN conversion
  - Now uses order currency directly or `PAYSTACK_CURRENCY` environment variable
  - Properly handles KES currency for Kenyan merchants

#### 3. `/server/routes/payments.js`
- **Unified Payment Initialization**:
  - Updated to use `PAYSTACK_CURRENCY` environment variable
  - Defaults to `KES` for Kenyan operations

### Frontend Updates

#### 1. `/client/src/pages/Donate.js`
- **Currency Symbol Display**:
  - Updated `getCurrencySymbol()` to properly handle KES, USD, GHS, ZAR, and NGN
  - Shows `KSh` for KES currency
  - Falls back to appropriate symbol based on Paystack config

- **Payment Initialization**:
  - Now uses `paystackConfig?.currency` from API config
  - Defaults to `KES` if config not available
  - Properly passes currency to payment initialization

#### 2. `/client/src/pages/Checkout.js`
- Already using correct endpoint `/paystack/orders/initialize`
- No changes needed - uses server-side currency configuration

#### 3. `/client/src/pages/ProfessionalCheckout.js`
- Already using correct endpoint `/paystack/orders/initialize`
- No changes needed - uses server-side currency configuration

## Environment Variables

### Required for Production

Add to your `server/.env` file:

```env
# Paystack Configuration
PAYSTACK_SECRET_KEY=sk_live_your_secret_key_here
PAYSTACK_PUBLIC_KEY=pk_live_your_public_key_here
PAYSTACK_CURRENCY=KES  # Options: KES, NGN, GHS, ZAR, USD
```

### Currency Support

Paystack supports the following currencies:
- **KES** - Kenyan Shilling (Default for Kenyan operations)
- **NGN** - Nigerian Naira
- **GHS** - Ghanaian Cedi
- **ZAR** - South African Rand
- **USD** - US Dollar

## Testing

### Test Paystack Configuration

1. **Check Config Endpoint**:
   ```bash
   curl http://localhost:5000/api/paystack/config
   ```
   Should return:
   ```json
   {
     "success": true,
     "data": {
       "publicKey": "pk_test_...",
       "currency": "KES",
       "supportedCurrencies": ["NGN", "GHS", "ZAR", "KES", "USD"],
       "isConfigured": true
     }
   }
   ```

2. **Test Donation Payment**:
   - Go to `/donate` page
   - Select Paystack payment method
   - Verify currency symbol shows `KSh` for KES
   - Complete test payment

3. **Test Checkout Payment**:
   - Add items to cart
   - Go to checkout
   - Select Paystack payment method
   - Verify payment initialization works

## Migration Notes

### For Existing Deployments

1. **Add Environment Variable**:
   ```bash
   PAYSTACK_CURRENCY=KES
   ```

2. **Update Paystack Account**:
   - Ensure your Paystack account is configured for Kenyan operations
   - Verify KES currency is enabled in your Paystack dashboard

3. **Test Payments**:
   - Test with small amounts first
   - Verify currency conversion is correct
   - Check that payment callbacks work properly

## Benefits

1. **Flexible Currency Support**: Can easily switch between supported currencies
2. **Kenyan-First Default**: Defaults to KES for Kenyan operations
3. **Better Error Handling**: Improved error messages and configuration checks
4. **Consistent Configuration**: All payment endpoints use the same currency source
5. **Environment-Based**: Easy to configure for different environments (dev/staging/prod)

## Notes

- Paystack requires different API keys for different currencies/regions
- Make sure your Paystack account supports the currency you're using
- Test payments in sandbox mode before going live
- Currency conversion is handled by Paystack automatically

