import { motion } from 'framer-motion';
import { FaBookmark, FaBook, FaBookOpen, FaCheck, FaShoppingCart } from 'react-icons/fa';

const statusVariants = {
  unread: { rotate: 0, scale: 1 },
  read:   { rotate: 360, scale: 1.2 },
};

const bgColors = {
  'À lire':    'bg-yellow-300',
  'En cours':  'bg-blue-300',
  'Lu':        'bg-green-300',
  'À acheter': 'bg-red-300',
};

const icons = {
  'À lire':    <FaBook className="text-white" />,
  'En cours':  <FaBookOpen className="text-white" />,
  'Lu':        <FaCheck className="text-white" />,
  'À acheter': <FaShoppingCart className="text-white" />,
};

export default function StatusToggle({ status, onClick }) {
  // Determine variant key and background color
  const variantKey = status === 'Lu' ? 'read' : 'unread';
  const bgColor = bgColors[status] || 'bg-sepia';

  return (
    <motion.button
      onClick={onClick}
      initial={false}
      animate={variantKey}
      variants={statusVariants}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`absolute top-2 left-2 p-2 rounded-full ${bgColor} transition-shadow shadow-md`}
    >
      {icons[status] || <FaBookmark className="text-white" />}
    </motion.button>
  );
}