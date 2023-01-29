/// <reference types="react" />
import React from 'react';

interface ButtonProps {
    text: string;
    onClick: () => void;
}
declare const Button: ({ text, onClick }: ButtonProps) => JSX.Element;

declare const Input: React.FC;

export { Button, Input };
