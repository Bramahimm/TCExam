import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";

export default function FlashMessage() {
  const { flash } = usePage().props;
  const [isVisible, setIsVisible] = useState(false);

  // Context: System must support success and failure notifications
  useEffect(() => {
    if (flash.success || flash.error || flash.message) {
      setIsVisible(true);

      // Automatically hide notification after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [flash]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[9999] min-w-[300px] animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Success Notification */}
      {flash.success && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 shadow-md rounded-r relative"
          role="alert">
          <div className="flex items-center">
            <span className="material-icons mr-2">check_circle</span>
            <div>
              <p className="font-bold">Success</p>
              <p className="text-sm">{flash.success}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-green-500 hover:text-green-700">
            <span className="material-icons text-sm">close</span>
          </button>
        </div>
      )}

      {/* Error Notification */}
      {flash.error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 shadow-md rounded-r relative"
          role="alert">
          <div className="flex items-center">
            <span className="material-icons mr-2">error</span>
            <div>
              <p className="font-bold">Error</p>
              <p className="text-sm">{flash.error}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700">
            <span className="material-icons text-sm">close</span>
          </button>
        </div>
      )}

      {/* General Info Notification */}
      {flash.message && !flash.success && !flash.error && (
        <div
          className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 shadow-md rounded-r relative"
          role="alert">
          <div className="flex items-center">
            <span className="material-icons mr-2">info</span>
            <div>
              <p className="font-bold">Information</p>
              <p className="text-sm">{flash.message}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-blue-500 hover:text-blue-700">
            <span className="material-icons text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
