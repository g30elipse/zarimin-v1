import SectionWrapper from '@/components/layout/SectionWrapper';

export default async function Page() {
    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Artists</h1>
                    <div className="flex items-center gap-2 text-accent"></div>
                </div>

                {/* Main Content */}
            </SectionWrapper>
        </main>
    );
}
