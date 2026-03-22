export type Booking = {
  id: string;
  bookingReference: string;
  customerName: string;
  packageName: string;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropLocation: string;
  whatsappNumber: string;
  bookingStatus: "Pending" | "Accepted" | "In Progress" | "Completed" | "Cancelled";
  totalPrice: number;
};