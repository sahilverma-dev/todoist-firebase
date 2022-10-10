export const variants = {
  container: {
    hidden: { rotate: 0 },
    show: {
      rotate: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },

  items: {
    hidden: { opacity: 0, x: -100, zIndex: 1 },
    show: { opacity: 1, x: 0, zIndex: 1 },
  },
};
