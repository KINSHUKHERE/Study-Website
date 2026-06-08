import React, { useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { BsCheckLg } from "react-icons/bs";
import { PiFunnelSimpleBold } from "react-icons/pi";

const SPRING = {
  type: "spring",
  stiffness: 240,
  damping: 20,
  mass: 1,
};

export default function FilterDisclosure({
  items,
  activeId,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  const activeItem = items.find((i) => i.id === activeId);
  const ActiveIcon = activeItem ? activeItem.icon : PiFunnelSimpleBold;

  const handleSelect = (id) => {
    onChange?.(id);
    setTimeout(() => setOpen(false), 220);
  };

  return (
    <div style={{
      position: 'relative',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50
    }}>
      <MotionConfig
        transition={{
          type: "spring",
          bounce: 0.25,
          duration: 0.7,
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.div
              key="open"
              layoutId="filter-disclosure"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0 },
              }}
              style={{ 
                transformOrigin: "50% 100%", 
                borderRadius: 'var(--border-radius-lg)',
                position: 'absolute',
                top: 0,
                zIndex: 99,
                width: '280px',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--border-color)',
                padding: '8px',
                boxShadow: 'var(--shadow-lg), var(--shadow-glow)'
              }}
            >
              {items.map((item, index) => {
                const Icon = item.icon;
                const selected = activeId === item.id;

                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 1.1, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    onClick={() => handleSelect(item.id)}
                    whileTap={{ scale: 0.98 }}
                    transition={{ ...SPRING, delay: (3 + index) * 0.05 }}
                    style={{
                      display: 'flex',
                      width: '100%',
                      cursor: 'pointer',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: 'var(--border-radius-md)',
                      padding: '10px 12px',
                      border: 'none',
                      background: 'transparent',
                      color: 'var(--text-primary)',
                      transition: 'background var(--transition-fast)'
                    }}
                    className="filter-disclosure-item"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <Icon size={20} style={{ color: selected ? 'var(--primary)' : 'var(--text-secondary)' }} />
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                        {item.label}
                      </span>
                    </div>

                    <motion.div
                      animate={{
                        backgroundColor: selected ? "var(--primary)" : "rgba(0,0,0,0)",
                        borderColor: selected ? "var(--primary)" : "var(--border-color)",
                      }}
                      style={{
                        display: 'flex',
                        height: '22px',
                        width: '22px',
                        flexShrink: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        border: '2px solid'
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: selected ? 1 : 0,
                          opacity: selected ? 1 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 30,
                        }}
                      >
                        <BsCheckLg size={12} color="#fff" />
                      </motion.div>
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          ) : (
            <div key="close" style={{ display: 'flex', alignItems: 'center' }}>
              <motion.button
                layoutId="filter-disclosure"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0 },
                }}
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  borderRadius: '50%',
                  zIndex: 30,
                  display: 'flex',
                  height: '54px',
                  width: '54px',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: 'var(--shadow-sm)'
                }}
                className="filter-disclosure-trigger"
              >
                <PiFunnelSimpleBold size={24} style={{ color: 'var(--text-primary)' }} />
              </motion.button>

              <motion.div
                initial={{ x: -30 }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  bounce: 0,
                  duration: 1.2,
                }}
                style={{
                  zIndex: 10,
                  marginLeft: '-12px',
                  display: 'flex',
                  height: '54px',
                  width: '54px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid var(--border-color)',
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  opacity: 0.8,
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeId}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <ActiveIcon size={20} style={{ color: 'var(--primary)' }} />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </MotionConfig>
    </div>
  );
}
