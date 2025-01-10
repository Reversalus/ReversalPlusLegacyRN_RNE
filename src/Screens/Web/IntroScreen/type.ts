import React from "react";

export interface CustomHeaderProps {
    onNavigate: (index: number) => void;
    currentSection?: number;
}
export interface NavButtonProps {
    title: string;
    isActive: boolean;
    onPress: () => void;
}

export interface InfoItemProps {
    iconUri: string;
    text: string;
}

export interface SectionProps {
    title: string;
    children: React.ReactNode;
    minHeight?: number
}
