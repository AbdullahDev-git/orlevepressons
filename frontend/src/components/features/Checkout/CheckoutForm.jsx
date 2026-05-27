import { useState } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';

export default function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
      setSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Shipping Information
        </h3>
        {submitted && (
          <span className="text-sm font-medium text-green-600 dark:text-green-400">✓ Saved</span>
        )}
      </div>

      {submitted ? (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mb-6">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>✓ Shipping details saved</strong> - Proceed to payment below
          </p>
        </div>
      ) : null}

      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Your name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />

        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <Input
            label="Phone"
            type="tel"
            name="phone"
            placeholder="+92 300 1234567"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
        </div>

        <Input
          label="Address"
          type="text"
          name="address"
          placeholder="Street address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          required
        />

        <div className="grid sm:grid-cols-3 gap-4">
          <Input
            label="City"
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            required
          />

          <Input
            label="Postal Code"
            type="text"
            name="postalCode"
            placeholder="12345"
            value={formData.postalCode}
            onChange={handleChange}
            error={errors.postalCode}
            required
          />

          <Input
            label="Country"
            type="text"
            name="country"
            placeholder="Pakistan"
            value={formData.country}
            onChange={handleChange}
            error={errors.country}
            required
          />
        </div>

        <Button type="submit" variant="primary" size="lg" className="w-full">
          Save Shipping Details
        </Button>
      </div>
    </form>
  );
}
