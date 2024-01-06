//'use client';
import React, { useState, useEffect } from "react";
import AllIngredients from "@/components/AllIngredients";
//import Dinner from '@/components/Dinner';
import MenuGroups from "@/components/MenuGroups";
import MenuGroupsOpen from "@/components/MenuGroupsOpen";
import { MenuProvider } from "@/context/IngredientsContext";

export default function Home() {
  return (
    <MenuProvider>
      {/* <Form/> */}
      <AllIngredients />
      {/* <MenuGroupsOpen /> */}
      {/* <MenuGroups /> */}
      {/* <Dinner/> */}
    </MenuProvider>
  );
}
