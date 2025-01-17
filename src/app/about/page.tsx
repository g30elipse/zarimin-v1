/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { OG_IMAGE_LOGO } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'About ZARIMIN - Bodo Music and Entertainment Magazine',
    openGraph: {
        images: [OG_IMAGE_LOGO],
    },
    description:
        'Learn about ZARIMIN, a dynamic music and entertainment magazine founded in 2024, dedicated to celebrating and promoting Bodo music culture globally.',
    keywords: ['ZARIMIN', 'Bodo music', 'music magazine', 'entertainment', 'music culture'],
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-72 grid-pattern">
                <div className="absolute inset-0 bg-accent/60" />
                <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About ZARIMIN</h1>
                    <p className="text-lg text-white/90 max-w-2xl">Celebrating the Rich Heritage of Bodo Music</p>
                </div>
            </div>

            <SectionWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Our Story */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                            <p className="text-gray-600 mb-4">
                                ZARIMIN was founded in 2024 by Dakhwr, a passionate Bodo music enthusiast and
                                entrepreneur. The name "ZARIMIN" comes from the Bodo language, meaning "history,"
                                reflecting our commitment to documenting and celebrating the rich cultural legacy of
                                Bodo music.
                            </p>
                            <p className="text-gray-600">
                                Our journey began with a vision to create a platform that would not only promote Bodo
                                music but also connect it with the global music community.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Our Mission */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                            <p className="text-gray-600 mb-4">
                                ZARIMIN's primary mission is to bring Bodo music and entertainment to the global stage.
                                We strive to create a space where the vibrant Bodo music culture can thrive while
                                embracing the diversity of the global music scene.
                            </p>
                            <p className="text-gray-600">
                                Through our platform, we aim to document, preserve, and promote the unique sounds and
                                stories of Bodo artists, connecting them with music lovers worldwide.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* What We Do */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">What We Do</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Music Charts',
                                description:
                                    'We track and showcase the most popular tracks through our Hot 100 and Global 200 charts.',
                            },
                            {
                                title: 'Artist Coverage',
                                description:
                                    'We provide comprehensive coverage of both established and emerging Bodo artists.',
                            },
                            {
                                title: 'Cultural Preservation',
                                description: 'We document and preserve Bodo music history for future generations.',
                            },
                        ].map((item, index) => (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
