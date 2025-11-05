import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { motion, AnimatePresence } from "motion/react";

const EditDialog = ({ initialText, onSave, onCancel }) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = React.useState(false);
    const [text, setText] = React.useState(initialText);


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
                <Dialog.Root open={isOpen} onOpenChange={(val) => {if (!val) handleClose(onCancel); } }>
                <Dialog.Portal forceMount>
                    <Dialog.Overlay asChild forceMount>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 bg-black/75" />
                    </Dialog.Overlay>
                    <Dialog.Content asChild className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-xl 
                           -translate-x-1/2 -translate-y-1/2 rounded-md p-10 
                           shadow-lg bg-gradient-to-tr from-blue-700 to-blue-400">
                        <motion.div key="dialog" initial={{ opacity: 0, scale: 0.50 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.50 }} transition= {{ duration: 0.25 }}>
                        <Dialog.Title className="text-white m-0 text-2xl font-bold text-mauve12">
                            Edit Task
                        </Dialog.Title>
                        <Dialog.Description className="text-white font-bold mb-5 mt-2.5 text-[15px] leading-normal text-mauve11">
                            Make changes to your task here. Click save when you're done.
                        </Dialog.Description>
                        <fieldset className="mb-[15px] flex items-center gap-5">
                            <label
                                className="text-white w-[90px] text-right text-[15px] text-violet11"
                                htmlFor="name"
                            >
                                Name
                            </label>
                            <input
                                className="bg-white inline-flex h-[35px] w-full flex-1 items-center justify-center rounded px-2.5 text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                                id="name"
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Katsuki Bakugo"
                            />
                        </fieldset>
                        <div className="mt-[25px] flex justify-end">
                            <Dialog.Close asChild>
                                <button onClick={() => handleClose(() => onSave(text))} className="bg-yellow-400 p-2.5 rounded-md font-bold shadow-black text-shadow-2xl cursor-pointer transition-all duration-300 ease-in-out hover:scale-105">
                                    Save changes
                                </button>
                            </Dialog.Close>
                        </div>
                        <Dialog.Close asChild>
                            <button
                                className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-white bg-gray-900 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none cursor-pointer transition-all ease-in-out duration-300 hover:scale-110"
                                aria-label="Close"
                            >
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </motion.div>
                    </Dialog.Content>
                </Dialog.Portal>
	        </Dialog.Root>
            )}
        </AnimatePresence>
    );
};

export default EditDialog;
