# New Email Flow Implementation

## Overview
Updated the email system to implement expert selection for appointments and direct admin emails for cart orders as requested.

## ✅ Appointment Booking Flow

### 1. Expert Selection
- Added expert dropdown in appointment form
- Available experts:
  - Astro Achariya Rajveer Gupta (bhavikasmart15@gmail.com)
  - Dr. Priya Sharma (priya.sharma@astro.com)
  - Pandit Ramesh Kumar (ramesh.kumar@astro.com)
  - Astrologer Meera Devi (meera.devi@astro.com)

### 2. Email Flow
**Step 1: Form Submission**
- Email sent to **selected expert** 
- **CC: bhavikasmart15@gmail.com** (admin)
- Contains: Customer details, appointment info, "Payment pending" status

**Step 2: Payment Gateway**
- Razorpay payment window opens (₹3000)
- Customer completes payment

**Step 3: Payment Success**
- Confirmation email sent to **customer**
- **CC: bhavikasmart15@gmail.com** (admin)
- Contains: All booking details, transaction ID, amount paid

### 3. Backend Endpoints
```javascript
POST /api/book-appointment
- Sends initial email to expert + CC admin
- Triggered on form submission

POST /api/payment-success  
- Sends confirmation email to customer + CC admin
- Triggered after successful payment
- Saves appointment to database with "confirmed" status
```

## ✅ Cart/Product Order Flow

### 1. Email Flow
- All cart/order emails go **directly to bhavikasmart15@gmail.com**
- No emails sent to customers for product orders
- Contains: Order details, customer info, payment ID, itemized list

### 2. Backend Endpoint
```javascript
POST /api/send-order-email
- Sends order details only to admin
- Triggered after successful cart payment
```

## 📧 Email Templates

### Appointment - Initial Booking (to Expert + CC Admin)
```
Subject: New Appointment Booking - [Customer Name]

New Appointment Booking
Name: [Customer Name]
Email: [Customer Email]
Phone: [Customer Phone]
Address: [Customer Address]
Date: [Appointment Date]
Time: [Appointment Time]
Preferred Slot: [Morning/Afternoon/Evening]
Mode: [Online/Offline]
Expert: [Selected Expert Name]

Payment pending - customer will proceed to payment gateway.
```

### Appointment - Confirmation (to Customer + CC Admin)
```
Subject: Appointment Confirmed & Payment Received

Appointment Confirmed

Hi [Customer Name],

Your appointment has been confirmed and payment received successfully.

Appointment Details:
Expert: [Expert Name]
Date: [Date]
Time: [Time]
Mode: [Online/Offline]
Amount Paid: ₹3000
Transaction ID: [Payment ID]
Order ID: [Order ID]

Thank you for your booking! The expert will contact you soon.

Regards,
Astro Achariya Team
```

### Cart Order (to Admin Only)
```
Subject: New Order - Payment ₹[Total]

New Order Received

Customer: [Customer Name]
Email: [Customer Email]  
Phone: [Customer Phone]
Total Amount: ₹[Total]
Payment ID: [Payment ID]
Order ID: [Order ID]

Items Ordered:
- [Item Name] x[Quantity] — ₹[Price]
- [Item Name] x[Quantity] — ₹[Price]
```

## 🔧 Technical Implementation

### Frontend Changes
1. **Appointment.jsx**
   - Added expert selection dropdown
   - Updated form validation to include expert selection
   - Split email flow: initial booking + payment confirmation
   - Removed old email helper dependencies

2. **cart.jsx**
   - Updated to use server-side email endpoint
   - Emails sent only to admin
   - Removed customer email functionality for orders

### Backend Changes
1. **payment.controller.js**
   - Added `bookAppointment()` - sends email to expert + CC admin
   - Added `paymentSuccess()` - sends confirmation to customer + CC admin
   - Updated `sendOrderConfirmationEmail()` - sends only to admin for cart orders

2. **appointment.model.js**
   - Added `expertName` and `expertEmail` fields
   - Added `razorpay_payment_id` field
   - Added `status` field (pending/confirmed/cancelled)

3. **payment.routes.js**
   - Added `/book-appointment` route
   - Added `/payment-success` route

## 🎯 Email Recipients Summary

| Action | Primary Recipient | CC/BCC | Customer Email |
|--------|------------------|---------|----------------|
| Appointment Form Submit | Selected Expert | bhavikasmart15@gmail.com | No |
| Appointment Payment Success | Customer | bhavikasmart15@gmail.com | Yes |
| Cart/Product Order | bhavikasmart15@gmail.com | None | No |

## 🧪 Testing Checklist

### Appointment Flow
- [ ] Expert selection dropdown works
- [ ] Form submission sends email to selected expert + CC admin
- [ ] Payment gateway opens after form submission
- [ ] Payment success sends confirmation to customer + CC admin
- [ ] All appointment details included in emails
- [ ] Transaction ID and order ID included

### Cart Flow  
- [ ] Cart checkout sends email only to admin
- [ ] Order details and payment info included
- [ ] No emails sent to customers for cart orders
- [ ] Cart clears after successful payment

## 📝 Configuration Required

### Environment Variables
```
VITE_APP_USER_EMAIL_TO_SEND_EMAIL=bhavikasmart15@gmail.com
VITE_APP_GOOGLE_APP_PASSWORD=vtcm xkpw jsqk lyfx
VITE_HOST_URL_ENDPOINT=http://localhost:5000
```

### Gmail Setup
- Enable 2-factor authentication
- Generate app-specific password
- Use app password in environment variables

## 🚀 Deployment Notes

1. Update expert email addresses in production
2. Test email delivery with real email addresses
3. Monitor email sending success rates
4. Set up email logging for debugging

## 📞 Support

All emails are configured to include bhavikasmart15@gmail.com as either primary recipient (cart orders) or CC (appointments) to ensure admin visibility of all transactions.

The implementation follows the exact requirements:
- ✅ Appointment emails go to selected expert + CC admin
- ✅ Payment success emails go to customer + CC admin  
- ✅ Cart emails go directly to admin only
- ✅ All booking and payment details included
- ✅ Razorpay integration maintained