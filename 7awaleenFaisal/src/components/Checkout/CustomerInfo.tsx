import React, { useState } from 'react';

export interface CustomerInfoData {
  name: string;
  phone: string;
  address: string;
  notes?: string;
}

export interface CustomerInfoProps {
  initialData?: Partial<CustomerInfoData>;
  onNext: (data: CustomerInfoData) => void;
  onBack?: () => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ initialData, onNext, onBack }) => {
  const [formData, setFormData] = useState<CustomerInfoData>({
    name: initialData?.name || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    notes: initialData?.notes || '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfoData, string>>>({});

  const handleChange = (field: keyof CustomerInfoData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfoData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!/^(01[0-2,5]\d{8}|(\+20|20)1[0-2,5]\d{8})$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'العنوان مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          الاسم الكامل <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-4 py-3 rounded-md border ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#3C50E0] focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          placeholder="أدخل اسمك الكامل"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          رقم الهاتف <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`w-full px-4 py-3 rounded-md border ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#3C50E0] focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white`}
          placeholder="01xxxxxxxxx"
          dir="ltr"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
        <p className="mt-1 text-xs text-gray-500">مثال: 01012345678</p>
      </div>

      {/* Address Field */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          العنوان <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          rows={3}
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          className={`w-full px-4 py-3 rounded-md border ${
            errors.address ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-[#3C50E0] focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none`}
          placeholder="أدخل عنوانك بالتفصيل"
        />
        {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
      </div>

      {/* Notes Field (Optional) */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          ملاحظات (اختياري)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3C50E0] focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
          placeholder="أي ملاحظات خاصة بالطلب..."
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3 rounded-md border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            رجوع
          </button>
        )}
        <button
          type="submit"
          className="w-full sm:flex-1 px-6 py-3 rounded-md bg-[#3C50E0] text-white font-medium hover:bg-[#2633A8] transition-colors shadow-md hover:shadow-lg"
        >
          التالي
        </button>
      </div>
    </form>
  );
};

export default CustomerInfo;
