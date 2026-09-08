const fs = require('fs');

let bill = fs.readFileSync('src/components/customer/TransparentBillModal.tsx', 'utf8');

const replaceStr = `          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}`;

const targetStr = `          <div className="flex gap-2 w-full sm:w-auto">
            {(booking.status !== 'completed' && invoice?.status !== 'paid') && (
              <button
                onClick={() => onProceedToPayment(totalAmount)}
                className="flex-1 sm:flex-none px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm transition shadow-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}`;

bill = bill.replace(replaceStr, targetStr);
fs.writeFileSync('src/components/customer/TransparentBillModal.tsx', bill);
