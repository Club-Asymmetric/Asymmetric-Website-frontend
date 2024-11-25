'use client';
import React from 'react';

export default function GlowyThing(props : { color: string, left: string, top: string }) {
    return (
        <div 
            style={{
                width: '30vw', // 30% of viewport width
                height: '30vw', // Keep it square by using same unit
                left: props.left,
                top: props.top,
                position: 'absolute',
                background: props.color,
                boxShadow: '0 0px 100px',
                borderRadius: '50%', // More semantic than 9999px
                filter: 'blur(15vw)', // Responsive blur
                transform: 'translate3d(0,0,0)',
                willChange: 'transform',
                minWidth: '200px', // Prevent too small on mobile
                minHeight: '200px', // Prevent too small on mobile
                maxWidth: '500px', // Prevent too large on big screens
                maxHeight: '500px' // Prevent too large on big screens
            }} 
        />
    );
}