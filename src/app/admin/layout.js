// src/app/admin/layout.js
"use client";

import SidebarAdmin from '@/app/components/SidebarAdmin';
import React, { useState } from 'react';
import { SlArrowRight } from "react-icons/sl";

export default function AdminLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex">
        {!showSidebar && (
        <SlArrowRight
          onClick={() => setShowSidebar(true)}
          className="md:hidden m-3 text-lg"
        />
      )}
      <SidebarAdmin show={showSidebar} setter={setShowSidebar} /> 
      <div className="flex-grow">
        {children} 
      </div>
    </div>
  );
}