# UPI Payment Integration Plan for GoHF

## Overview
Implement UPI payment donations for Guardians of Hope Foundation with dual approach:
- **Simple UPI QR Code** - For quick, no-fee donations
- **Razorpay Gateway** - For verified donations with multiple payment options

Guest donations enabled (no login required).

---

## Prerequisites (Information Needed Before Implementation)

Before starting, you'll need:

### For UPI QR Code
- [ ] UPI ID (e.g., `guardiansofhope@upi` or `9876543210@paytm`)
- [ ] Account holder name (for display)
- [ ] Optional: Bank account details for reference

### For Razorpay Gateway
- [ ] Razorpay account (sign up at https://razorpay.com)
- [ ] API Key ID (`RAZORPAY_KEY_ID`)
- [ ] API Key Secret (`RAZORPAY_KEY_SECRET`)
- [ ] Webhook Secret (`RAZORPAY_WEBHOOK_SECRET`)
- [ ] PAN card and bank account linked to Razorpay

---

## Implementation Plan

### Phase 1: Database Setup

**File:** Supabase Dashboard

Update `donations` table schema:
```sql
ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50);
ALTER TABLE donations ADD COLUMN IF NOT EXISTS payment_gateway VARCHAR(50);
ALTER TABLE donations ADD COLUMN IF NOT EXISTS razorpay_order_id VARCHAR(100);
ALTER TABLE donations ADD COLUMN IF NOT EXISTS razorpay_payment_id VARCHAR(100);
ALTER TABLE donations ADD COLUMN IF NOT EXISTS upi_reference VARCHAR(100);
ALTER TABLE donations ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'pending';
-- status: 'pending', 'completed', 'failed', 'refunded'
```

### Phase 2: Environment Configuration

**File:** `.env.local`

```env
# Existing
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# New - UPI QR Code
NEXT_PUBLIC_UPI_ID=your-upi-id@bank
NEXT_PUBLIC_UPI_NAME=Guardians of Hope Foundation

# New - Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxx
```

### Phase 3: Install Dependencies

**File:** `package.json`

```bash
npm install razorpay qrcode
npm install -D @types/qrcode
```

### Phase 4: Create Donation Page

**File:** `src/app/donate/page.tsx`

Structure:
```
/donate
├── Hero Section
│   └── "Support Our Mission" headline
├── Impact Section
│   └── Show what donations achieve (meals, books, etc.)
├── Donation Form
│   ├── Preset amounts: ₹500, ₹1000, ₹2500, ₹5000, Custom
│   ├── Donor info: Name, Email, Phone (optional), Message (optional)
│   └── Payment method selection
├── Payment Options
│   ├── Option A: UPI QR Code (0% fee)
│   │   └── Generate QR with amount pre-filled
│   └── Option B: Pay Online (Razorpay)
│       └── UPI, Cards, Netbanking, Wallets
└── Trust Indicators
    └── 80G tax exemption info, secure payment badges
```

### Phase 5: UPI QR Code Component

**File:** `src/components/UPIQRCode.tsx`

Features:
- Generate UPI payment link: `upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=INR&tn=DONATION`
- Convert to QR code using `qrcode` library
- Display amount and UPI ID clearly
- Instructions for scanning
- "I've completed payment" button → records pending donation for manual verification

### Phase 6: Razorpay Integration

**Files to create:**

1. **`src/app/api/donations/create-order/route.ts`**
   - Create Razorpay order
   - Store pending donation in database
   - Return order_id to frontend

2. **`src/app/api/donations/verify/route.ts`**
   - Verify payment signature
   - Update donation status to 'completed'

3. **`src/app/api/donations/webhook/route.ts`**
   - Handle Razorpay webhooks
   - Auto-update payment status
   - Handle refunds if needed

4. **`src/components/RazorpayButton.tsx`**
   - Load Razorpay checkout script
   - Handle payment flow
   - Show success/failure states

### Phase 7: Donation Flow

```
User Journey:

1. User visits /donate
2. Selects/enters amount
3. Enters name & email
4. Chooses payment method:

   Path A: UPI QR Code
   ├── QR code displayed with amount
   ├── User scans and pays via their UPI app
   ├── Clicks "I've completed payment"
   ├── Donation recorded as 'pending_verification'
   └── Admin manually verifies and updates status

   Path B: Razorpay
   ├── Click "Pay Online"
   ├── Razorpay checkout opens
   ├── User completes payment (UPI/Card/etc.)
   ├── Webhook confirms payment
   └── Donation auto-marked 'completed'

5. Thank you page/message shown
6. Email confirmation sent (optional, Phase 2)
```

### Phase 8: Admin Dashboard Updates

**File:** `src/app/admin/page.tsx`

Add to Donations tab:
- Filter by status: All, Pending, Completed, Failed
- Filter by method: QR Code, Razorpay
- Action buttons for pending QR donations:
  - "Mark as Verified" → status = 'completed'
  - "Mark as Failed" → status = 'failed'
- Show payment method and gateway info

### Phase 9: Header/Navigation Update

**File:** `src/components/Header.tsx`

- Add "Donate" link in navigation (prominent placement)
- Consider replacing or complementing "Get Involved" CTA

---

## File Structure Summary

```
src/
├── app/
│   ├── donate/
│   │   └── page.tsx          # New donation page
│   └── api/
│       └── donations/
│           ├── route.ts       # Existing (update)
│           ├── create-order/
│           │   └── route.ts   # New - Razorpay order
│           ├── verify/
│           │   └── route.ts   # New - Payment verification
│           └── webhook/
│               └── route.ts   # New - Razorpay webhook
├── components/
│   ├── UPIQRCode.tsx          # New - QR code generator
│   ├── RazorpayButton.tsx     # New - Payment button
│   └── DonationForm.tsx       # New - Reusable form
└── lib/
    └── razorpay.ts            # New - Razorpay client config
```

---

## Security Considerations

1. **Never expose Razorpay secret key** - Only use in server-side API routes
2. **Verify webhook signatures** - Prevent fake payment confirmations
3. **Validate amounts server-side** - Don't trust client-sent amounts
4. **Rate limiting** - Prevent donation spam
5. **HTTPS only** - Already handled by Vercel/GitHub Pages

---

## Testing Checklist

Before going live:
- [ ] Test QR code generation with various amounts
- [ ] Test Razorpay in test mode (use test API keys)
- [ ] Verify webhook handling
- [ ] Test on mobile devices (QR scanning)
- [ ] Test admin verification flow
- [ ] Verify database records are created correctly

---

## Future Enhancements (Not in Initial Scope)

- Email receipts after donation
- 80G certificate generation
- Recurring donations
- Donation campaigns with goals
- Social sharing after donation
- Donor wall/recognition page

---

## Quick Start Commands

When ready to implement:

```bash
# Install dependencies
npm install razorpay qrcode
npm install -D @types/qrcode

# Add environment variables to .env.local
# Then run dev server
npm run dev
```

---

## Cost Summary

| Method | Transaction Fee | Settlement Time |
|--------|-----------------|-----------------|
| UPI QR Code | 0% | Instant to your bank |
| Razorpay UPI | ~2% | T+2 business days |
| Razorpay Cards | ~2% | T+2 business days |

---

## Timeline Estimate

| Phase | Effort |
|-------|--------|
| Phase 1-3: Setup | 1 hour |
| Phase 4-5: Donate page + QR | 2-3 hours |
| Phase 6-7: Razorpay integration | 3-4 hours |
| Phase 8: Admin updates | 1-2 hours |
| Phase 9: Navigation | 30 mins |
| Testing | 1-2 hours |

**Total: ~10-12 hours of implementation**

---

## Ready to Implement?

When you have:
1. UPI ID ready
2. Razorpay account created and verified
3. API keys obtained

Just say "implement UPI payments" and we'll start with Phase 1!
