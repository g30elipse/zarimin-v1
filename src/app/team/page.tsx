import type { Metadata } from 'next';
import SectionWrapper from '@/components/layout/SectionWrapper';
import { TeamMember } from '@/components/team/TeamMember';

export const metadata: Metadata = {
    title: 'Our Team - ZARIMIN',
    description:
        'Meet the passionate team behind ZARIMIN, led by founder Dakhwr, dedicated to promoting Bodo music and culture.',
    keywords: ['ZARIMIN team', 'Dakhwr', 'Bodo music', 'music magazine team'],
};

const teamMembers = [
    {
        name: 'Dakhwr',
        role: 'Founder & Editor-in-Chief',
        image: '/team/founder.jpg',
        bio: 'A passionate Bodo music enthusiast and entrepreneur who founded ZARIMIN with the vision of bringing Bodo music to the global stage.',
    },
    {
        name: 'Sarah Chen',
        role: 'Music Editor',
        image: '/team/editor.jpg',
        bio: 'An experienced music journalist with a deep appreciation for cultural diversity in music.',
    },
    {
        name: 'Rajesh Kumar',
        role: 'Technical Director',
        image: '/team/tech.jpg',
        bio: 'Oversees the digital presence of ZARIMIN, ensuring our platform reaches music lovers worldwide.',
    },
    // Add more team members as needed
];

export default function TeamPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-72 grid-pattern">
                <div className="absolute inset-0 bg-accent/60" />
                <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Team</h1>
                    <p className="text-lg text-white/90 max-w-2xl">Meet the passionate individuals behind ZARIMIN</p>
                </div>
            </div>

            <SectionWrapper>
                {/* Team Introduction */}
                <div className="max-w-3xl mb-12">
                    <p className="text-lg text-gray-600">
                        Our team consists of passionate individuals dedicated to promoting and preserving Bodo music
                        culture while connecting it with the global music community. Each member brings unique expertise
                        and perspective to our mission.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <TeamMember
                            key={member.name}
                            name={member.name}
                            role={member.role}
                            image={member.image}
                            bio={member.bio}
                        />
                    ))}
                </div>

                {/* Join Our Team Section */}
                <div className="mt-16 p-8 border-2 border-primary bg-secondary">
                    <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
                    <p className="text-gray-600 mb-6">
                        We're always looking for passionate individuals who share our vision for promoting and
                        preserving Bodo music culture. If you're interested in joining our team, we'd love to hear from
                        you.
                    </p>
                    <button className="boxy-button">View Open Positions</button>
                </div>
            </SectionWrapper>
        </main>
    );
}
