'use client';
import React from 'react';

export default function GlowyThing(props : { color: string ,left: string, top: string }) {
return (
    <div 
    style={{
        width: 584, 
        height: 554, 
        left: props.left, 
        top: props.top, 
        position: 'absolute', 
        background: props.color, 
        boxShadow: '450px 450px 450px ', 
        borderRadius: 9999, 
        filter: 'blur(450px)',
        transform: 'translate3d(0,0,0)',
        willChange: 'transform'
    }} 
    />
);
}