/**
 * WhatsApp Utilities
 * Helper functions for WhatsApp integration
 */

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  address?: string;
}

export interface WhatsAppOrderData {
  items: OrderItem[];
  customerInfo: CustomerInfo;
  total: number;
  notes?: string;
  orderNumber?: string;
}

/**
 * Format order details for WhatsApp message (Arabic format)
 */
export function formatOrderForWhatsApp(data: WhatsAppOrderData): string {
  const { items, customerInfo, total, notes, orderNumber } = data;

  let message = 'السلام عليكم، لدي طلب جديد عبر موقع 7awaleen:\n\n';

  if (orderNumber) {
    message += `رقم الطلب: ${orderNumber}\n\n`;
  }

  message += '📦 *المنتجات:*\n';
  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   الكمية: ${item.quantity}\n`;
    message += `   السعر: ${item.price.toLocaleString('ar-EG')} جنيه\n\n`;
  });

  message += `💰 *الإجمالي:* ${total.toLocaleString('ar-EG')} جنيه\n\n`;

  message += '👤 *معلومات العميل:*\n';
  message += `الاسم: ${customerInfo.name}\n`;
  message += `الهاتف: ${customerInfo.phone}\n`;
  
  if (customerInfo.address) {
    message += `العنوان: ${customerInfo.address}\n`;
  }

  if (notes) {
    message += `\n📝 *ملاحظات:* ${notes}`;
  }

  return message;
}

/**
 * Generate WhatsApp deep link
 * Works on both web and mobile
 */
export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  
  // Remove any non-numeric characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  
  // Use wa.me for universal compatibility
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Open WhatsApp with pre-filled message
 */
export function openWhatsApp(phoneNumber: string, message: string): void {
  const link = generateWhatsAppLink(phoneNumber, message);
  window.open(link, '_blank');
}

/**
 * Format single product for quick WhatsApp order
 */
export function formatProductForWhatsApp(
  productName: string,
  price: number,
  quantity: number = 1
): string {
  return `السلام عليكم، أريد طلب:\n\n📦 ${productName}\nالكمية: ${quantity}\nالسعر: ${price.toLocaleString('ar-EG')} جنيه\n\nالمجموع: ${(price * quantity).toLocaleString('ar-EG')} جنيه`;
}

/**
 * Validate Egyptian phone number
 */
export function isValidEgyptianPhone(phone: string): boolean {
  // Egyptian phone numbers: +20 followed by 10 digits
  // Or just 11 digits starting with 01
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's 11 digits starting with 01
  if (/^01[0-2,5]\d{8}$/.test(cleanPhone)) {
    return true;
  }
  
  // Check if it's 10 digits (without the leading 0)
  if (/^1[0-2,5]\d{8}$/.test(cleanPhone)) {
    return true;
  }
  
  // Check if it starts with +20 or 20
  if (/^(20|(\+20))1[0-2,5]\d{8}$/.test(cleanPhone)) {
    return true;
  }
  
  return false;
}

/**
 * Format phone number to Egyptian format
 */
export function formatEgyptianPhone(phone: string): string {
  const cleanPhone = phone.replace(/\D/g, '');
  
  // If it starts with 20, add +
  if (cleanPhone.startsWith('20')) {
    return `+${cleanPhone}`;
  }
  
  // If it's 10 digits, add +20
  if (/^1[0-2,5]\d{8}$/.test(cleanPhone)) {
    return `+20${cleanPhone}`;
  }
  
  // If it's 11 digits and starts with 01, add +20 and remove the 0
  if (/^01[0-2,5]\d{8}$/.test(cleanPhone)) {
    return `+20${cleanPhone.substring(1)}`;
  }
  
  return phone;
}
