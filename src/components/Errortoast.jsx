import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import { useEffect } from "react";

const Errortoast = ({ error, onClose, duration = 4000 }) => {
	useEffect(() => {
		if (error) {
			const timer = setTimeout(onClose, duration);
			return () => clearTimeout(timer);
		}
	}, [error, onClose, duration]);

	return (
		<AnimatePresence>
			{error && (
				<motion.div
					initial={{ x: 300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 300, opacity: 0 }}
					transition={{ type: "spring", stiffness: 300, damping: 30 }}
					className="fixed top-[80px] right-5 z-50"
				>
					<div className="relative flex items-start gap-3 bg-white dark:bg-slate-900 border-l-4 border-red-500 shadow-lg rounded-xl p-4 w-[320px]">
						{/* Error Message */}
						<p className="text-sm font-medium text-red-600 flex-1">{error}</p>

						{/* Close Button */}
						<button
							onClick={onClose}
							className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
						>
							<MdClose size={18} />
						</button>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Errortoast;
