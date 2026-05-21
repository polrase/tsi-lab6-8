import React, { Component } from 'react'

type SizeType = "small" | "middle" | "large";
type ColorType = "primary" | "secondnary";

interface ButtonProps {
    size: SizeType;
    color: ColorType;
    title: string;
    onClick: () => void;
    disaled?: boolean;
    children?: React.JSX.Element;
}

export const Button = (props: ButtonProps) => {
    const {size, color, title, onClick, disaled} = props;

    const defaultClass = 
    "flex items-center rounded-2 h-[40px] w-[max-conent] px-4 py-2 cursos-pointer transition duration-300";

    const classes = {
        color: {
            primary: {
                button: "bg-amber-700",
                text: "text-white",
            },
            secondary: {
                button: "bg-red-500",
                text: "text-white",
            },
        },
        sizes: {
            small: "rounded-[100px] text-sm",
            middle: "rounded-[14px] text-base",
            large: "rounded-[16px] text-base min-h-[56px]",
        },
        
    }
}