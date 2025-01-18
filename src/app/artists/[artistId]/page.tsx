import { getArtistById } from '@/lib/api/base';
import { getSocialLinkMeta } from '@/lib/constants';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ArtistPageProps {
    params: Promise<{
        artistId: string;
    }>;
}

export async function generateMetadata({ params }: ArtistPageProps, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const id = (await params).artistId;

    // fetch data
    const artist = await getArtistById(id);

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const images = [artist?.image, ...previousImages].filter(Boolean) as string[];
    return {
        title: artist?.name,
        openGraph: {
            images,
        },
    };
}

// function get

export default async function ArtistPage({ params }: ArtistPageProps) {
    const { artistId } = await params;
    const artist = await getArtistById(artistId);

    if (!artist) {
        notFound();
    }

    const dateOfBirth = artist.dob ? new Date(artist.dob) : null;
    // format date of birth: DD MMM YYYY
    const formattedDateOfBirth = dateOfBirth
        ? `${dateOfBirth.getDate()} ${dateOfBirth.toLocaleString('default', {
              month: 'short',
          })} ${dateOfBirth.getFullYear()}`
        : null;

    return (
        <main className="min-h-screen p-4 md:p-8">
            <article className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hero Section */}
                <div className="relative col-span-1 md:col-span-1  mb-8">
                    <img src={artist.image} alt={artist.name} className="w-full aspect-[3/4] object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
                {/* Artist Info */}
                <div className="space-y-6 col-span-1 md:col-span-1">
                    <div className="boxy-card p-6">
                        <h1 className="text-4xl font-bold ">{artist.name}</h1>
                        {formattedDateOfBirth ? (
                            <p className="text-gray-600 text-sm">DOB: {formattedDateOfBirth}</p>
                        ) : null}
                        <div className="flex flex-wrap gap-2 mt-8">
                            {artist.genre.map((g) => (
                                <span
                                    key={g}
                                    className="text-sm border-2 text-gray-500 border-secondary bg-secondary px-3 py-1"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                        {/* <p className="text-gray-600">{artist.bio}</p> */}
                        <p className="max-w-4xl prose text-gray-600  mt-6">
                            {documentToReactComponents(artist.bio, { preserveWhitespace: true })}
                        </p>
                    </div>
                    <div className="boxy-card p-6">
                        <h1 className="font-bold mb-8">LINKS</h1>
                        <div className="flex flex-col flex-wrap gap-4">
                            {artist.socialLinks.map((link) => {
                                const meta = getSocialLinkMeta(link);
                                return (
                                    <a
                                        key={link}
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 hover:text-primary flex items-center gap-2"
                                    >
                                        <Image
                                            src={meta.icon}
                                            width={24}
                                            height={24}
                                            className="h-6"
                                            alt={meta.label}
                                        />
                                        <span className="ml-2">{meta.label}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </article>
        </main>
    );
}
