"use client"; // 必须放在文件最顶部
import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "../prismicio";
import { components } from "../slices";
import { motion } from "motion/react";

import NavBar from "./components/Navbar.jsx";
import Header from "./components/Header.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Work from "./components/Work.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function Home() {
  const client = createClient();
  const [data, setData] = useState(null);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme:dark)").matches)
    ) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "";
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchData = async () => {
      const json = await client
        .getByUID("page", "myfirstpage")
        .catch(() => notFound());
      setData(json);
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <>
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ daration: 0.5, delay: 0.3 }}
        className="w-11/12 max-w-5xl text-center mx-auto h-screen flex flex-col items-center justify-center"
      >
        <SliceZone slices={data.data.slices} components={components} />
      </motion.div>
      <Services isDarkMode={isDarkMode} />
      <Work isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
}
