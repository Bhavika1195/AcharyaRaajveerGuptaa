# Email Setup Guide for Astrology Website

## Overview
This guide explains the email functionality implemented for the astrology website, including appointment bookings and cart orders.

## Email Features Implemented

### 1. Appointment Booking Emails
- **Admin Email**: Receives appointment details when user books an appointment
- **Customer Confirmation**: Sends confirmation to customer with appointment details
- **Payment Integration**: Includes Razorpay payment details and order ID

### 2. Cart Order Emails  
- **Admin Email**: Receives order details when customer purchases crystals
- **Customer Confirmation**: Sends order confirmation with item details and payment info
- **Payment Integration**: Includes Razorpay payment ID and order summary

## EmailJS Configuration Required

### Environment Variables (.env)
```
VITE_EMAILJS_PUBLIC_KEY=FUOpDfmFkzeMAu-Xz
VITE_EMAILJS_SERVICE_ID=service_1jvj89d
VITE_EMAILJS_TEMPLATE_APPOINTMENT_ADMIN=template_p7m1u6t
VITE_EMAILJS_TEMPLATE_APPOINTMENT_REPLY=template_8ius8u1
VITE_EMAILJS_TEMPLATE_ORDER_ADMIN=template_8ius8u1
VITE_EMAILJS_TEMPLATE_ORDER_REPLY=template_order_reply
VITE_EMAILJS_TEMPLATE_CONTACT_ADMIN=template_contact_admin
VITE_EMAILJS_TEMPLATE_CONTACT_REPLY=template_contact_reply
```

## Email Templates Required in EmailJS

### 1. Appointment Admin Template (template_appointment_admin)
**Template Variables:**
- `{{to_email}}` - Admin email (bhavikasmart15@gmail.com)
- `{{from_name}}` - Customer full name
- `{{from_email}}` - Customer email
- `{{subject}}` - Email subject
- `{{name}}` - Customer name
- `{{email}}` - Customer email
- `{{phone}}` - Customer phone
- `{{address}}` - Customer address
- `{{date}}` - Appointment date
- `{{time}}` - Appointment time
- `{{preferredSlot}}` - Morning/Afternoon/Evening
- `{{modeOfConsultation}}` - Online/Offline
- `{{razorpay_order_id}}` - Payment order ID
- `{{payment_amount}}` - ₹3000
- `{{message}}` - Complete appointment details

### 2. Appointment Customer Reply Template (template_appointment_reply)
**Template Variables:**
- `{{to_email}}` - Customer email
- `{{to_name}}` - Customer name
- `{{subject}}` - Confirmation subject
- `{{name}}` - Customer name
- `{{date}}` - Appointment date
- `{{time}}` - Appointment time
- `{{preferredSlot}}` - Time slot
- `{{modeOfConsultation}}` - Consultation mode
- `{{payment_amount}}` - ₹3000
- `{{razorpay_order_id}}` - Order ID
- `{{message}}` - Confirmation message

### 3. Order Admin Template (template_8ius8u1)
**Template Variables:**
- `{{to_email}}` - Admin email
- `{{from_name}}` - Customer name
- `{{from_email}}` - Customer email
- `{{subject}}` - Order subject
- `{{order_id}}` - Order ID
- `{{total}}` - Total amount
- `{{items}}` - JSON string of items
- `{{items_text}}` - Plain text items list
- `{{items_html}}` - HTML items list
- `{{customer_name}}` - Customer name
- `{{customer_email}}` - Customer email
- `{{customer_phone}}` - Customer phone
- `{{razorpay_payment_id}}` - Payment ID
- `{{message}}` - Complete order details

### 4. Order Customer Reply Template (template_order_reply)
**Template Variables:**
- `{{to_email}}` - Customer email
- `{{to_name}}` - Customer name
- `{{subject}}` - Order confirmation subject
- `{{order_id}}` - Order ID
- `{{total}}` - Total amount
- `{{items}}` - JSON string of items
- `{{items_text}}` - Plain text items list
- `{{items_html}}` - HTML items list
- `{{customer_name}}` - Customer name
- `{{razorpay_payment_id}}` - Payment ID
- `{{message}}` - Confirmation message

## Email Flow

### Appointment Booking Flow
1. User fills appointment form
2. User proceeds to Razorpay payment (₹3000)
3. On form submission (before payment): Initial appointment email sent
4. On payment success: Confirmation email with payment details sent
5. Both admin and customer receive respective emails

### Cart Order Flow
1. User adds crystals to cart
2. User proceeds to checkout
3. Razorpay payment gateway opens
4. On payment success: Order confirmation emails sent
5. Cart is cleared after successful payment
6. Both admin and customer receive order details

## Email Content Examples

### Appointment Admin Email
```
Subject: New Appointment Booking - [Customer Name]

New appointment booking received:

Customer: [Name]
Email: [Email]
Phone: [Phone]
Address: [Address]
Date: [Date]
Time: [Time]
Slot: [Morning/Afternoon/Evening]
Mode: [Online/Offline]
Amount: ₹3000
Order ID: [Razorpay Order ID]
```

### Cart Order Admin Email
```
Subject: New Order - Payment ₹[Total]

New order received:

Customer: [Name]
Email: [Email]
Phone: [Phone]
Total: ₹[Amount]
Payment ID: [Razorpay Payment ID]

Items:
- [Item Name] x[Quantity] — ₹[Price]
- [Item Name] x[Quantity] — ₹[Price]
```

## Implementation Notes

1. **Frontend-Only Approach**: Uses EmailJS for client-side email sending
2. **Payment Integration**: Emails sent after successful Razorpay payment
3. **Error Handling**: Graceful fallback if email sending fails
4. **Form Validation**: Complete form validation before payment
5. **User Feedback**: Toast notifications for success/error states

## Testing

1. Test appointment booking with valid form data
2. Test cart checkout with multiple items
3. Verify both admin and customer emails are received
4. Test payment success and failure scenarios
5. Verify email content includes all required details

## Troubleshooting

1. **Emails not sending**: Check EmailJS configuration and API keys
2. **Missing template variables**: Verify template setup in EmailJS dashboard
3. **Payment issues**: Check Razorpay configuration
4. **Form validation**: Ensure all required fields are filled

## Admin Email
All emails are sent to: **bhavikasmart15@gmail.com**

## Support
For technical support, contact the development team or refer to EmailJS documentation.