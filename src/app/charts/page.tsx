import SectionWrapper from '@/components/layout/SectionWrapper';
import { getAllCharts } from '@/lib/api/base';

export default async function ChartsPage() {
    const charts = await getAllCharts();

    return (
        <main className="min-h-screen p-4 md:p-8">
            <SectionWrapper>
                <h1 className="text-4xl font-bold mb-8">Music Charts</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {charts.map((chart) => (
                        <div key={chart.id} className="boxy-card p-6">
                            <h2 className="text-2xl font-bold mb-6">{chart.title}</h2>
                            <div className="space-y-4">
                                {chart.songs.map((song, index) => (
                                    <div
                                        key={song.id}
                                        className="flex items-center gap-4 p-3 hover:bg-secondary border-2 
                           border-transparent hover:border-border transition-colors"
                                    >
                                        <span className="text-lg font-bold w-8">{index + 1}</span>
                                        <img
                                            src={song.albumCover}
                                            alt={song.title}
                                            className="w-12 h-12 object-cover"
                                        />
                                        <div>
                                            <h3 className="font-bold">{song.title}</h3>
                                            <p className="text-sm text-gray-600">{song.artist}</p>
                                        </div>
                                        <div className="ml-auto text-sm text-gray-500">{song.duration}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </main>
    );
}
