# Email Setup Instructions

## EmailJS Setup

1. **Create EmailJS Account**
   - Go to https://www.emailjs.com/
   - Sign up for free account

2. **Create Email Service**
   - Add Gmail service
      - Connect your Gmail account (bhavikasmart15@gmail.com)

3. **Create Email Templates**

### Template 1: Appointment Booking (template_appointment)
```
Subject: New Appointment Booking

Dear Achariya Debdutta,

You have received a new appointment booking:

Customer Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}
Service: {{service}}
Preferred Date: {{preferred_date}}
Message: {{message}}

Please contact the customer to confirm the appointment.

Best regards,
Website System
```

### Template 2: Order Notification (template_order)
```
Subject: New Crystal Order Received

Dear Achariya Debdutta,

You have received a new order:

Order Details:
{{order_details}}

Total Amount: ₹{{total_amount}}
Order Date: {{order_date}}

Please process this order.

Best regards,
Website System
```

### Template 3: Contact Form (template_contact)
```
Subject: New Contact Message - {{subject}}

Dear Achariya Debdutta,

You have received a new message:

From: {{customer_name}} ({{customer_email}})
Subject: {{subject}}
Message: {{message}}

Please respond to the customer.

Best regards,
Website System
```

### Template 4: Customer Confirmation (template_confirmation)
```
Subject: Appointment Confirmation - Achariya Debdutta

Dear {{customer_name}},

Thank you for booking an appointment with Achariya Debdutta.

Service: {{service}}
Preferred Date: {{preferred_date}}

We will contact you soon to confirm the exact time and details.

Blessings,
Achariya Debdutta Team
```

### Template 5: Customer Reply (template_reply)
```
Subject: Thank you for contacting Achariya Debdutta

Dear {{customer_name}},

Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.

Blessings,
Achariya Debdutta Team
```

4. **Update Configuration**
   - Replace 'YOUR_PUBLIC_KEY' in index.html with your EmailJS public key
   - Replace 'service_id' in script.js with your actual service ID
   - Replace template names with your actual template IDs

5. **Test the Setup**
   - Submit appointment form
   - Add items to cart and checkout
   - Send contact message
   - Check both your email and customer email for confirmations