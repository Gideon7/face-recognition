import React from "react";
import { motion } from "framer-motion";
import "./Logo.css"


export const Logo = () => {
    return(
        <div className="ma4 mt0">
            <motion.div
                className="container"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.8, rotate: -90, borderRadius: "100%" }}
            />
        </div>
    )
}