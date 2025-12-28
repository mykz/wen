'use client'

import { ComponentType, useState } from 'react'

import { AnimatePresence, motion, MotionProps } from 'motion/react'

import { Icon } from './logo'

const containerProps: MotionProps = {
  variants: {
    initial: { y: 80, opacity: 0 },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        y: {
          type: 'spring',
          stiffness: 420,
          damping: 28,
          mass: 0.9,
          duration: 0.5,
        },
      },
    },
    exit: { y: 80, opacity: 0, transition: { duration: 0.2 } },
  },
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
}

const linksProps: MotionProps = {
  variants: {
    hidden: {},
    show: {
      transition: { delayChildren: 0.08, staggerChildren: 0.06 },
    },
  },
  initial: 'hidden',
  animate: 'show',
  exit: 'hidden',
}

const linkProps: MotionProps = {
  variants: {
    hidden: { x: -18, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 700, damping: 40 },
    },
    exit: { x: -18, opacity: 0, transition: { duration: 0.12 } },
  },
}

type ControlBarProps = {
  actions?: {
    Component: ComponentType<{ className?: string }>
    onClick: () => void
  }[]
}

export function ControlBar({ actions = [] }: ControlBarProps) {
  const [showLinks, setShowLinks] = useState(false)

  const onAnimationComplete = () => {
    if (!actions.length) return

    setShowLinks(true)
  }

  return (
    <AnimatePresence>
      <motion.div
        {...containerProps}
        onAnimationComplete={onAnimationComplete}
        className="px-2 pt-2 pb-3 fixed bottom-0 left-0 flex items-center justify-center gap-2 w-full bg-background mask-[linear-gradient(to_bottom,transparent,black_16px,black)]"
      >
        <div className="px-2.5 flex items-center justify-center gap-4">
          <motion.div layout>
            <Icon className="mx-auto w-11 h-auto" />
          </motion.div>
          <AnimatePresence initial={false}>
            {showLinks && (
              <motion.div
                {...linksProps}
                className="flex items-center justify-center gap-4.5"
              >
                {actions.map((action, index) => {
                  const Component = action.Component

                  return (
                    <motion.div
                      key={index}
                      {...linkProps}
                      onClick={action.onClick}
                      className="cursor-pointer rounded p-1"
                    >
                      <Component className="size-6" />
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
