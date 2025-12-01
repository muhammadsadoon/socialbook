"use client";
import type { InfiniteScrollComponent } from '@/utils/types/components-props';
import React from 'react'

const InfiniteScrollComponent = ({ children, functionality }: InfiniteScrollComponent) => {
    
    return (
        <div>
            {children}
        </div>
    )
}

export default InfiniteScrollComponent;
