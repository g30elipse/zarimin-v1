import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
    bio: string;
    dob?: string;
}

export const TeamMember = ({ name, role, image, bio }: TeamMemberProps) => {
    // const age = dob ? new Date().getFullYear() - new Date(dob).getFullYear() : null;
    return (
        <Card className="overflow-hidden">
            <div className="relative">
                <img src={image} alt={name} className="w-full aspect-square object-cover" />
            </div>
            <CardHeader>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">{role}</p>
            </CardHeader>
            <CardContent>
                <p className="text-gray-600">{bio}</p>
            </CardContent>
        </Card>
    );
};
