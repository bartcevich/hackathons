//'use client';
import React, { useState, useEffect } from 'react';
import AllIngredients from '@/components/AllIngredients';
//import Dinner from '@/components/Dinner';
import MenuGroups from '@/components/MenuGroups';
import MenuGroupsOpen from '@/components/MenuGroupsOpen';
//import Form from '@/components/Form';

export default function Home() {
    return (
        <>
            {/* <Form/> */}
            <AllIngredients />
            {/* <MenuGroupsOpen /> */}
            {/* <MenuGroups /> */}
            {/* <Dinner/> */}
        </>
    );
}
