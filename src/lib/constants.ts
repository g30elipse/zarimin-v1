export const OG_IMAGE_LOGO = {
    url: '/logo-black.jpg',
    width: 1200,
    height: 630,
    alt: 'ZARIMIN',
};

const SOCIAL_LINK_META = {
    facebook: {
        icon: '/social-logo/facebook-f-brands-solid.svg',
        color: 'blue',
        label: 'Facebook',
    },
    twitter: {
        icon: '/social-logo/tx-twitter-brands-solid.svg',
        color: 'blue',
        label: 'Twitter',
    },
    instagram: {
        icon: '/social-logo/instagram-brands-solid.svg',
        color: 'pink',
        label: 'Instagram',
    },
    spotify: {
        icon: '/social-logo/spotify-brands-solid.svg',
        color: 'green',
        label: 'Spotify',
    },
    youtube: {
        icon: '/social-logo/youtube-brands-solid.svg',
        color: 'red',
        label: 'YouTube',
    },
    default: {
        icon: '/social-logo/link-solid.svg',
        color: 'gray',
        label: 'Link',
    },
};


export const getSocialLinkMeta = (socialLink: string) => {
    if (socialLink.includes('facebook')) {
        return SOCIAL_LINK_META.facebook;
    }
    if (socialLink.includes('twitter')) {
        return SOCIAL_LINK_META.twitter;
    }
    if (socialLink.includes('instagram')) {
        return SOCIAL_LINK_META.instagram;
    }
    if (socialLink.includes('spotify') || socialLink.includes('open.spotify.com')) {
        return SOCIAL_LINK_META.spotify;
    }
    if (socialLink.includes('youtube') || socialLink.includes('youtu.be')) {
        return SOCIAL_LINK_META.youtube;
    }
    return SOCIAL_LINK_META.default;
};
