import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { motion } from "motion/react";

const Prismics = () => {
  const client = createClient();
  const [data, setData] = useState(null);
  const [rightData, setRightData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const json = await client
        .getByUID("page", "myfirstpage")
        .catch(() => notFound());

      const jsonRight = await client
        .getByUID("page", "rightanimation")
        .catch(() => notFound());

      setRightData(jsonRight);

      setData(json);
    };
    fetchData();
  }, []);

  if (!data) return null;
  if (!rightData) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ daration: 1 }}
      id="prismic"
      className="w-full px-[12%] py-10 scroll-mt-20"
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ daration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-Ovo"
      >
        My Prismic
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ daration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo"
      >
        Prismic component 1
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ daration: 0.5, delay: 0.3 }}
        className="w-11/12 max-w-9xl text-center mx-auto h-screen flex flex-col items-center justify-center mt-20"
      >
        <SliceZone slices={data.data.slices} components={components} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ daration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-Ovo mt-20"
      >
        Prismic component 2
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, x: -500 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ daration: 0.5, delay: 0.3 }}
        className="w-11/12 max-w-9xl text-center mx-auto h-screen flex flex-col items-center justify-center"
      >
        <SliceZone slices={rightData.data.slices} components={components} />
      </motion.div>
    </motion.div>
  );
};

export default Prismics;
