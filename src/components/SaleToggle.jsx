import { motion } from 'framer-motion';
import { FaDollarSign } from 'react-icons/fa';

const saleVariants = {
  off: { scale: 1, opacity: 0.6 },
  on:  { scale: 1.2, opacity: 1 },
};

export default function SaleToggle({ isForSale, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={false}
      animate={isForSale ? 'on' : 'off'}
      variants={saleVariants}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="absolute top-14 left-2 p-2 rounded-full bg-sepia text-parchment transition"
    >
      <FaDollarSign />
    </motion.button>
  );
}