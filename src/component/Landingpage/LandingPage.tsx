
import type React from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion"
import { Trophy, ChevronRight, Sparkles, Star, Zap } from "lucide-react"
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import TopStudentsCard from "../Card/TopStudentsCard";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";


const Button = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`px-6 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`h-full bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl rounded-3xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={`p-8 text-center ${className}`}>{children}</div>
}
// Updated course data
const courses = [
  { "Bachelor of Computer Applications": "BCA" },
  { "Bachelor of Business Administration": "BBA" },
  { "Bachelor of Commerce": "BCOM" },
]


// Floating particles component
export const FloatingParticles = ({ bg = "bg-white/10" }:any) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`${bg} absolute w-2 h-2  rounded-full`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Dynamic background component
export const DynamicBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full blur-3xl opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-green-500 to-emerald-700 rounded-full blur-3xl opacity-15"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-3xl opacity-10"
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const y2 = useTransform(scrollY, [0, 300], [0, -100])

  return (
    <div className="min-h-screen w-full mt-0.5 rounded-xl bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 relative overflow-hidden">
      <DynamicBackground />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex items-center justify-center pt-20"
      > 

        {/* Glassmorphism container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">

            {/* Main heading with typewriter effect */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                Welcome to{" "}
                <motion.span
                  className="bg-gradient-to-r cursor-pointer from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 200%",
                  }}
                >
                  KIHEAT
                </motion.span>
              </h1>
              <motion.h2
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-3xl sm:text-4xl  text-center font-semibold text-emerald-300 mb-8"
              >
                Academic Excellence Hub
              </motion.h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-xl sm:text-2xl text-center text-green-100 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Discover rankings, celebrate achievements, and track academic performance across BCA, BBA, and BCOM
              programmes
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/search">
                  <Button
                    className="bg-gradient-to-r from-emerald-500 to-green-600 
        hover:from-emerald-600 hover:to-green-700 text-white text-lg 
        px-10 py-2 rounded-2xl font-semibold shadow-2xl border-0 
        group relative overflow-hidden flex items-center justify-center"
                  >
                    <span className="relative z-10 flex items-center justify-center w-full">
                      Explore Results
                      <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

          </div>
        </div>


      </motion.section>

      {/* Courses Section */}
      <motion.section style={{ y: y2 }} className="relative py-32 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-5 w-5 text-yellow-400" />
              <span className="text-emerald-200 font-medium">Student ranking</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              view {""}
              <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">course-wise rankings</span>
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Select your program to explore  performance rankings, academic,  analytics and many more...

            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const courseName = Object.keys(course)[0]
              const courseCode = Object.values(course)[0]

              const colors = [
                { from: "from-blue-500", to: "to-purple-600", accent: "text-blue-300" },
                { from: "from-emerald-500", to: "to-green-600", accent: "text-violet-300" },
                { from: "from-orange-500", to: "to-red-600", accent: "text-orange-300" },
              ]
              return (
                <motion.div
                  key={index}
                  onClick={() => navigate(`${courseCode.toLowerCase()}`)}
                  initial={{ opacity: 0, y: 100, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8, type: "spring" }}
                  viewport={{ once: true }}
                  whileHover={{ y: -20, rotateY: 5, scale: 1.02 }}
                  className="group cursor-pointer perspective-1000"
                >
                  <Card className="h-full bg-white/5 backdrop-blur-md border  border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl overflow-hidden rounded-3xl">
                    <CardContent className="p-8 relative">
                      {/* Background gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${colors[index].from} ${colors[index].to} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      />

                      {/* Floating elements */}
                      <motion.div
                        className="absolute top-4 right-4 opacity-20"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        <Star className="h-8 w-8 text-white" />
                      </motion.div>

                      <div className="relative z-10">
                        <motion.div
                          className={`w-20 h-20 bg-gradient-to-r ${colors[index].from} ${colors[index].to} rounded-2xl flex items-center justify-center shadow-2xl mb-8 mx-auto`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-white font-bold text-2xl">{courseCode}</span>
                        </motion.div>

                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors text-center">
                          {courseName}
                        </h3>

                        <p className="text-green-100 mb-8 text-center leading-relaxed">
                          Explore comprehensive rankings, performance analytics, and student achievements
                        </p>

                        <motion.div
                          className="flex items-center justify-center gap-2 text-emerald-400 font-semibold group-hover:text-emerald-300 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <Zap className="h-5 w-5" />
                          <span>View Result Ranklist</span>
                          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-32 bg-gradient-to-t from-black/40 to-transparent"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-2xl">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </motion.div>
          <FloatingParticles />

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Ready to Explore the Ranklists?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className=" text-green-100  text-md mb-12 max-w-2xl mx-auto"
          >
            Dive into detailed student result analytics and see who leads each course.

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center"
          >
            <Button
              onClick={() => setOpen((prev) => !prev)}
              className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white text-xl px-12 rounded-2xl font-semibold shadow-2xl border-0 relative overflow-hidden group"
            >
              <span className="relative z-10 flex justify-evenly items-center">
                <Sparkles className="mr-2 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
                Start Exploring
                {open ? (
                  <FaAngleDoubleUp className="ml-3.5 transition-all duration-300" />
                ) : (
                  <FaAngleDoubleDown className="ml-3.5 transition-all duration-300" />
                )}
              </span>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>

            <AnimatePresence>
              {open && (
                <motion.div
                  key="top-students"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden min-h-1/2 w-full mt-6"
                >
                  <TopStudentsCard />

                  <div className="w-full  border border-white/20"/>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

    </div>
  )
}

export default LandingPage

// src/components/ScrollToTop.tsx
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};

export  {ScrollToTop};
