import React from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { motion, AnimatePresence } from "motion/react";

const AlertDialogDemo = ({ onConfirm, onCancel }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);

  const handleClose = (action) => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      action?.(); 
    }, 250); 
  };

  return (
    <AnimatePresence>
      {isOpen && !isAnimatingOut && (
        <AlertDialog.Root open={isOpen} onOpenChange={(val) => { if (!val) handleClose(onCancel); }}>
          <AlertDialog.Portal forceMount>
            <AlertDialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 bg-black/75"
              />
            </AlertDialog.Overlay>

            {/* Dialog content */}
            <AlertDialog.Content asChild>
              <motion.div
                key="dialog"
                initial={{ opacity: 0, scale: 0.50 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.50 }}
                transition={{ duration: 0.25 }}
                className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-xl 
                           -translate-x-1/2 -translate-y-1/2 rounded-md p-10 
                           shadow-lg bg-gradient-to-tr from-blue-700 to-blue-400"
              >
                <AlertDialog.Title className="text-2xl font-bold text-white mb-3">
                  Are you absolutely sure?
                </AlertDialog.Title>

                <AlertDialog.Description className="text-white mb-5">
                  This action cannot be undone. This will permanently delete your task.
                </AlertDialog.Description>

                <div className="flex justify-center gap-4">
                  <AlertDialog.Cancel asChild>
                    <button
                      onClick={() => handleClose(onCancel)}
                      className="bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md 
                                 hover:scale-105 transition"
                    >
                      Cancel
                    </button>
                  </AlertDialog.Cancel>

                  <AlertDialog.Action asChild>
                    <button
                      onClick={() => handleClose(onConfirm)}
                      className="bg-yellow-400 text-black px-4 py-2 rounded-lg shadow-md 
                                 hover:scale-105 transition"
                    >
                      Yes, delete
                    </button>
                  </AlertDialog.Action>
                </div>
              </motion.div>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>
      )}
    </AnimatePresence>
  );
};

export default AlertDialogDemo;
