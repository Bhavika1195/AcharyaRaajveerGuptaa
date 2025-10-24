import React, { useState } from "react";
import BottomNavbar from "../components/BottomNavbar";
import Footer from "../components/Footer";
import banner3 from "../images/sliderImages/slide2.jpg";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendAppointmentEmail } from "../email.js";

const Appointment = () => {
  const experts = [
    { name: "Astro Achariya Rajveer Gupta", email: "bhavikasmart15@gmail.com" },
    { name: "Dr. Priya Sharma", email: "priya.sharma@astro.com" },
    { name: "Pandit Ramesh Kumar", email: "ramesh.kumar@astro.com" },
    { name: "Astrologer Meera Devi", email: "meera.devi@astro.com" }
  ];

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const initialFormValue = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    address: "",
    date: new Date().toISOString().substr(0, 10),
    time: getCurrentTime(),
    preferredSlot: "morning",
    modeOfConsultation: "online",
    expertName: "Astro Achariya Rajveer Gupta",
    expertEmail: "bhavikasmart15@gmail.com",
  };

  const [formData, setFormData] = useState(initialFormValue);
  const [loading, setLoading] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  // ✅ Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobileNumber" && !/^\d{0,10}$/.test(value)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ Expert selection
  const handleExpertChange = (e) => {
    const selectedExpert = experts.find(ex => ex.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      expertName: selectedExpert.name,
      expertEmail: selectedExpert.email
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, mobileNumber, address, email } = formData;

    if (!firstName || !lastName || !mobileNumber || !address || !email) {
      toast.error("Please fill all the required fields.");
      return;
    }

    setLoading(true);

    try {
      const result = await sendAppointmentEmail(formData);
      
      if (result.success) {
        toast.success("Appointment request sent successfully! We will contact you soon.");
        setFormData(initialFormValue);
      } else {
        toast.error("Failed to send appointment request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("Failed to send appointment request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen pt-16">
      <BottomNavbar />
      <div className="w-full">
        <img src={banner3} alt="banner" className="h-[50vh] object-cover w-full" />
      </div>

      <div className="w-[90%] mx-auto py-8 grid md:flex gap-6">
        {/* Left Section */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-semibold font-philosopher mb-2">
            Book an Appointment
          </h2>
          <p className="text-gray-600 italic mb-4">Unlock Solutions, Embrace Serenity.</p>
          <p>Every problem is a lock with a key. Whether it's astrology, tarot, or palmistry, I help you unlock happiness.</p>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-lg border border-blue-300">
          <h2 className="text-2xl font-semibold text-center mb-4">Appointment Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="firstName" placeholder="First Name*" value={formData.firstName} onChange={handleInputChange} className="input" />
            <input name="lastName" placeholder="Last Name*" value={formData.lastName} onChange={handleInputChange} className="input" />
            <input name="mobileNumber" placeholder="Mobile Number*" value={formData.mobileNumber} onChange={handleInputChange} className="input" />
            <input name="email" placeholder="Email*" value={formData.email} onChange={handleInputChange} className="input" />
            <textarea name="address" placeholder="Address*" value={formData.address} onChange={handleInputChange} rows="3" className="input"></textarea>

            <div className="grid grid-cols-2 gap-4">
              <input type="date" name="date" min={currentDate} value={formData.date} onChange={handleInputChange} className="input" />
              <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="input" />
            </div>

            <select name="expertName" value={formData.expertName} onChange={handleExpertChange} className="input">
              {experts.map(ex => <option key={ex.email}>{ex.name}</option>)}
            </select>

            <div className="grid grid-cols-2 gap-4">
              <select name="preferredSlot" value={formData.preferredSlot} onChange={handleInputChange} className="input">
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </select>
              <select name="modeOfConsultation" value={formData.modeOfConsultation} onChange={handleInputChange} className="input">
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
              {loading ? <span className="flex justify-center"><LuLoader2 className="animate-spin mr-2" />Processing...</span> : "Book Appointment"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Appointment;