"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import RoleItem, { roleItemVariants } from './role-item';

// You can move this data to a separate file, e.g., @/data/roles.ts
const roles = [
  { title: "AI Researcher", href: "/careers/ai-researcher" },
  { title: "Cyber Researcher", href: "/careers/cyber-researcher" },
  { title: "Research Engineer", href: "/careers/research-engineer" },
  { title: "Technical Policy Researcher", href: "/careers/technical-policy-researcher" },
  { title: "The Role You Are Perfect For", href: "/careers/general-application" },
];

interface FeaturedRolesProp {
  visible: boolean
}

const roleListVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const FeaturedRolesSection= ({visible = true}: FeaturedRolesProp) => {
  return (
    <section className="bg-background py-24">
      <div className="max-w-[1230px] 2xl:max-w-[1390px] mx-auto py-5 px-6 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden outline">
        {/* Left Column: Section Title */}
        <div>
          {visible && <h2 className="text-lg font-medium text-foreground">Featured Roles</h2>}
        </div>

        {/* Right Column: Description and Roles List */}
        <div className="md:col-span-2">
          <motion.p
            className="text-lg text-foreground/80 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={roleItemVariants} // Reusing the variant for a simple fade-in effect
          >
            We&apos;re looking for curious minds from a wide range of disciplines and backgrounds.
          </motion.p>
          
          {/* Roles List with staggered animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={roleListVariants}
          >
            {roles.map((role) => (
              <RoleItem key={role.title} title={role.title} href={role.href} />
            ))}
          </motion.div>

          {visible && <motion.div 
            className="mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={roleItemVariants}
          >
            <Link href="/careers" className="text-sm font-medium tracking-widest text-foreground/70 hover:text-foreground">
              CAREERS &rarr;
            </Link>
          </motion.div>}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRolesSection;