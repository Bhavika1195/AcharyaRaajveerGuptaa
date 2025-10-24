// Send appointment email using the same working method as cart
export async function sendAppointmentEmail(appointmentData = {}) {
  if (!window.emailjs) {
    console.error('EmailJS not loaded');
    return { success: false, error: 'EmailJS not available' };
  }

  try {
    const appointmentMessage = `NEW APPOINTMENT REQUEST

Customer Details:
Name: ${appointmentData.firstName} ${appointmentData.lastName}
Email: ${appointmentData.email}
Phone: ${appointmentData.mobileNumber}
Address: ${appointmentData.address}

Appointment Details:
Expert: ${appointmentData.expertName}
Date: ${appointmentData.date}
Time: ${appointmentData.time}
Preferred Slot: ${appointmentData.preferredSlot}
Consultation Mode: ${appointmentData.modeOfConsultation}

Status: Pending Confirmation`;

    const response = await window.emailjs.send(
      window.EMAILJS_SERVICE_ID,
      window.EMAILJS_TEMPLATE_ORDER_ADMIN,
      {
        to_email: "bhavikasmart15@gmail.com",
        subject: `New Appointment Request - ${appointmentData.expertName}`,
        email: "bhavikasmart15@gmail.com",
        title: "New Appointment Request",
        name: "Admin",
        customer_name: `${appointmentData.firstName} ${appointmentData.lastName}`,
        customer_email: appointmentData.email,
        customer_phone: appointmentData.mobileNumber,
        customer_address: appointmentData.address,
        message: appointmentMessage
      }
    );
    console.log("✅ Appointment email sent:", response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error("❌ Error sending appointment email:", error);
    return { success: false, error };
  }
}

// Send order email
export async function sendOrderEmail(orderData = {}) {
  if (!window.emailjs) {
    console.error('EmailJS not loaded');
    return { success: false, error: 'EmailJS not available' };
  }

  try {
    const response = await window.emailjs.send(
      window.EMAILJS_SERVICE_ID,
      window.EMAILJS_TEMPLATE_ORDER_ADMIN,
      {
        to_email: "bhavikasmart15@gmail.com",
        message: `NEW ORDER RECEIVED

Customer: ${orderData.customerName}
Email: ${orderData.email}
Total: ₹${orderData.total}
Payment ID: ${orderData.paymentId}

Items: ${orderData.items}`
      }
    );
    console.log("✅ Order email sent:", response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error("❌ Error sending order email:", error);
    return { success: false, error };
  }
}

export default {
  sendAppointmentEmail,
  sendOrderEmail,
};