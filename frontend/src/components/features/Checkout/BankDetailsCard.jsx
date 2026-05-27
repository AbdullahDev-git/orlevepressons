function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    alert('Account number copied!');
  } catch {
    prompt('Copy this account number manually:', text);
  }
  document.body.removeChild(textarea);
}

export default function BankDetailsCard() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg p-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Bank Transfer Details
      </h3>

      {/* Bank Info */}
      <div className="space-y-4 mb-6">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Bank Name</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
            Easypaisa
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Account Title</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
            saleha asif
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Account Number</p>
          <div className="flex items-center gap-2">
            <p className="text-lg font-semibold text-gray-900 dark:text-white font-mono">
              4187 2900 3528 6354
            </p>
            <button
              onClick={() => {
                const text = '4187 2900 3528 6354';
                if (navigator.clipboard && navigator.clipboard.writeText) {
                  navigator.clipboard.writeText(text).then(() => {
                    alert('Account number copied!');
                  }).catch(() => {
                    fallbackCopy(text);
                  });
                } else {
                  fallbackCopy(text);
                }
              }}
              className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white/50 dark:bg-gray-900/50 p-4 rounded border border-blue-300 dark:border-blue-600">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Instructions:</strong> Transfer the exact amount to the bank details above, then upload a screenshot of the payment confirmation on the next section.
        </p>
      </div>
    </div>
  );
}
