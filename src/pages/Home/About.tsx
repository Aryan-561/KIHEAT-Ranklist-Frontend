"use client"

import type React from "react"
import { motion } from "framer-motion"
import {
    GraduationCap,
    Users,
    Target,
    Eye,
    Globe,
} from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"



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


const team = [
    {
        name: "Aryan",
        role: "Developer",
        description: "Fullstack  enthusiast with a focus on accessibility and UI performance.",
        image: "/icon.png",
        links: {
            github: "https://github.com/Aryan-561?tab=repositories",
            linkedin: "https://www.linkedin.com/in/aryan-ab64822ba/",
        },
    },
    {
        name: "Himanshu Tamoli",
        role: "Full-Stack Developer",
        description: "Passionate MERN stack developer with a focus on scalable, real-time applications.",
        image: "/icon.png",
        links: {
            github: "https://github.com/himanshutamoli24",
            linkedin: "https://www.linkedin.com/in/himanshutamoli24/",
        },
    },
];


// Dynamic background component
const AboutBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <motion.div
                className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-green-600/20 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 25,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
            />
            <motion.div
                className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-purple-700/15 rounded-full blur-3xl"
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                }}
            />
            <motion.div
                className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-full blur-3xl"
                animate={{
                    x: [-50, 50, -50],
                    y: [-30, 30, -30],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
        </div>
    )
}

const AboutPage: React.FC = () => {
    return (
        <div className="min-h-screen rounded-2xl bg-gradient-to-br from-green-600  to-emerald-600 relative overflow-hidden">
            <AboutBackground />

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative pt-32 pb-20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                            className="flex justify-center mb-8"
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute -inset-4 bg-gradient-to-r from-emerald-400 via-green-500 to-blue-600 rounded-full blur-lg opacity-60"
                                    animate={{
                                        rotate: [0, 360],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: "linear",
                                    }}
                                />
                                <div className="relative bg-white/10 backdrop-blur-md rounded-full p-8 border border-white/20">
                                    <GraduationCap className="h-20 w-20 text-white" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-5xl sm:text-7xl font-bold text-white mb-6"
                        >
                            About{" "}
                            <span className="bg-gradient-to-br from-white via-green-500   to-white bg-clip-text text-transparent">
                                KIHEAT
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-xl sm:text-2xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed"
                        >
                            Empowering academic excellence through innovative ranking systems and transparent performance tracking
                        </motion.p>

                    </div>
                </div>
            </motion.section>



            {/* Mission & Vision */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative py-20"
            >
                <div className="max-w-6xl  mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Card className="h-full  bg-white/5 backdrop-blur-md border border-white/20 hover:border-emerald-400/50 transition-all duration-500 hover:shadow-2xl rounded-3xl overflow-hidden">
                                <CardContent className="p-10 relative">
                                    <motion.div
                                        className="absolute top-6 right-6 opacity-20"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    >
                                        <Target className=" sm:h-16  sm:w-16 text-emerald-400" />
                                    </motion.div>

                                    <div className="relative z-10">


                                        <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-emerald-300 transition-colors">
                                            Our Mission
                                        </h3>
                                        <p className="text-green-100 text-lg leading-relaxed">
                                            To provide a comprehensive and transparent academic ranking system that promotes excellence,
                                            encourages healthy competition, and helps students achieve their full potential across BCA, BBA,
                                            and BCOM programs.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <Card className="h-full bg-white/5 backdrop-blur-md border border-white/20 hover:border-blue-400/50 transition-all duration-500 hover:shadow-2xl rounded-3xl overflow-hidden">
                                <CardContent className="p-10 relative">
                                    <motion.div
                                        className="absolute top-6 right-6 opacity-20"
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                    >
                                        <Eye className=" sm:h-16  sm:w-16 text-blue-400" />
                                    </motion.div>

                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors">
                                            Our Vision
                                        </h3>
                                        <p className="text-green-100 text-lg leading-relaxed">
                                            To become the leading academic excellence platform that transforms how educational institutions
                                            track, measure, and celebrate student achievements, fostering a culture of continuous improvement
                                            and success.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Team Section */}

            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative py-16"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-8">
                            <Users className="h-5 w-5 text-blue-400" />
                            <span className="text-emerald-200 font-medium">Leadership Team</span>
                        </div>
                    </motion.div>

                    <div className="flex items-center flex-col sm:flex-row gap-8 justify-center">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group"
                            >
                                <Card className="h-full bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/40 transition-all duration-500 hover:shadow-2xl rounded-3xl overflow-hidden">
                                    <CardContent className="text-center p-6 sm:p-8">
                                        <motion.div
                                            className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-emerald-400/50 transition-colors duration-300"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <img
                                                src={member.image || "/placeholder.svg"}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        <h3 className="text-3xl uppercase font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                                            {member.name}
                                        </h3>
                                        <div className=" text-white/85 text-xl font-semibold mb-4">
                                            {member.role}
                                        </div>
                                        <p className="text-green-200 font-semibold text-sm leading-relaxed max-w-xs mx-auto mb-4">
                                            {member.description}
                                        </p>

                                        <div className="flex justify-center gap-4 mt-4">
                                            {member.links?.github && (
                                                <a
                                                    href={member.links.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-emerald-400 transition hover:border p-2 hover:rounded-full"
                                                >
                                                    <FaGithub size={20} />
                                                </a>
                                            )}
                                            {member.links?.linkedin && (
                                                <a
                                                    href={member.links.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-white hover:text-emerald-400 transition hover:border p-2 hover:rounded-full"
                                                >
                                                    <FaLinkedin size={20} />
                                                </a>
                                            )}
                                           
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative py-20"
            >
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-2xl">
                            <Globe className="h-12 w-12 text-white" />
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl sm:text-5xl font-bold text-white mb-6"
                    >
                        Join Our Academic Journey
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-xl text-green-100 mb-8 max-w-2xl mx-auto"
                    >
                        Be part of an institution that values excellence, transparency, and student success above all else.
                    </motion.p>
                </div>
            </motion.section>
        </div>
    )
}

export default AboutPage
