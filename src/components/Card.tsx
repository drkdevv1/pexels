import {
    Card as MUICard,
    CardMedia,
    CardContent,
    Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CardProps } from '../types/interfaces/images';

const StyledCard = styled(MUICard)(({ theme }) => ({
    width: 500,
    margin: theme.spacing(1),
    borderRadius: '16px',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        boxShadow: theme.shadows[8],
        '& .photographer-info': {
            transform: 'translateY(0)',
            opacity: 1
        }
    },
}));

const PhotograpberInfo = styled(CardContent)(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
    color: 'white',
    transform: 'translateY(100%)',
    transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
    opacity: 0,
    padding: theme.spacing(1.5),
}));

export const Card: React.FC<CardProps> = ({
    src,
    photographer,
    photographer_url,
    alt,
    avg_color, url
}) => {

    const handleImageClick = () => {
        window.open(url, '_blank');
    };

    return (
        <StyledCard>
            <CardMedia
                component="img"
                height="700"
                image={src.large2x}
                alt={alt}
                sx={{
                    backgroundColor: avg_color,
                    cursor: 'pointer'
                }}
                onClick={handleImageClick}
            />
            <PhotograpberInfo className="photographer-info">
                <Link
                    href={photographer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: 'white' }}
                    underline="hover"
                >
                    Photo by {photographer}
                </Link>
            </PhotograpberInfo>
        </StyledCard>
    );
};