import { useState } from 'react';
import Button from '../../common/Button';
import { useCart } from '../../../hooks/useCart';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function PaymentScreenshot({ customerData, onOrderPlaced }) {
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { items, getTotal, clearCart } = useCart();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setScreenshot(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!screenshot) {
      alert('Please select a file');
      return;
    }

    setUploading(true);

    try {
      // Upload the screenshot file first
      const formData = new FormData();
      formData.append('file', screenshot);
      const uploadRes = await fetch(`${API}/upload`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      const screenshotUrl = uploadData.success ? uploadData.data.url : screenshot.name;

      const subtotal = getTotal();
      const shipping = 250;
      const total = subtotal + shipping;

      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
      }));

      const orderData = {
        customerName: customerData.fullName,
        customerEmail: customerData.email,
        customerPhone: customerData.phone,

        shippingAddress: `${customerData.address}, ${customerData.city}, ${customerData.postalCode}, ${customerData.country}`,
        total: total,
        items: orderItems,
        paymentScreenshot: screenshotUrl,
      };

      const orderRes = await fetch(`${API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const orderResult = await orderRes.json();

      if (!orderResult.success) {
        throw new Error(orderResult.message || 'Failed to create order');
      }

      const orderId = orderResult.data.orderNumber;

      setUploading(false);
      setUploadSuccess(true);
      clearCart();

      setTimeout(() => {
        onOrderPlaced?.(orderId);
      }, 2000);
    } catch (err) {
      alert('Failed to place order: ' + err.message);
      setUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Upload Payment Proof
      </h3>

      {/* File Input */}
      <div className="mb-6">
        <label className="block">
          <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-accent-500 hover:bg-accent-50 dark:hover:bg-accent-500/10 transition">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div>
              <div className="text-3xl mb-2">📷</div>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          </div>
        </label>
      </div>

      {/* Preview */}
      {preview && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Preview:
          </p>
          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden max-h-64">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-auto max-h-64 object-contain"
            />
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            File: {screenshot?.name}
          </p>
        </div>
      )}

      {/* Upload Button */}
      <div className="space-y-3">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={handleUpload}
          disabled={!screenshot || uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Screenshot'}
        </Button>

        {screenshot && !uploadSuccess && (
          <button
            onClick={() => {
              setScreenshot(null);
              setPreview(null);
            }}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Success Message */}
      {uploadSuccess && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm">
          ✓ Payment screenshot uploaded successfully! Our team will verify and process your order shortly.
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          <strong>💡 Tip:</strong> Make sure the screenshot clearly shows the payment confirmation with date, amount, and transaction reference.
        </p>
      </div>
    </div>
  );
}
