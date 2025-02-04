import { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiMethods } from '../../../utils/fetchApi';
import { CardList } from '../../../components/CardList';
import { Image, PexelsResponse } from '../../../types/interfaces/images';
import { endpoints, PEXELS_API_KEY } from '../../../config/api';
import { SearchBar } from '../../../components/SearchBar';
import { useAuthContext } from '../../../context/auth-context';
export const ImageSearch = () => {
    const { session } = useAuthContext();
    const navigate = useNavigate();
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nextPage, setNextPage] = useState<string | null>(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const [noResults, setNoResults] = useState(false);


    const fetchCuratedImages = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await ApiMethods.get<PexelsResponse>(
                endpoints.photos.curated,
                {
                    'Authorization': PEXELS_API_KEY
                },
                false
            );
            setImages(response.photos);
            setNextPage(response.next_page);
        } catch (err) {
            setError('Error fetching images');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadMoreImages = async () => {
        if (!nextPage || loadingMore) return;
        setLoadingMore(true);
        try {
            const response = await ApiMethods.get<PexelsResponse>(
                nextPage,
                {
                    'Authorization': PEXELS_API_KEY
                },
                false
            );
            setImages(prevImages => [...prevImages, ...response.photos]);
            setNextPage(response.next_page);
        } catch (err) {
            setError('Error loading more images');
        } finally {
            setLoadingMore(false);
        }
    };

    const searchImages = async (query: string) => {
        setLoading(true);
        setError(null);
        setNoResults(false);
        try {
            const response = await ApiMethods.get<PexelsResponse>(
                `${endpoints.photos.search}?query=${encodeURIComponent(query)}`,
                {
                    'Authorization': PEXELS_API_KEY
                },
                false
            );
            setImages(response.photos);
            setNextPage(response.next_page);
            setNoResults(response.photos.length === 0);
        } catch (err) {
            setError('Error searching images');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCuratedImages();
    }, []);

    return (
        <Container maxWidth={false}>
            <Box sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                        Pexels API
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/profile')}
                    >
                        {session?.user.username}
                    </Button>
                </Box>
                <SearchBar
                    onSearch={searchImages}
                    onClear={fetchCuratedImages}
                    disabled={loading || loadingMore}
                    setNoResults={setNoResults}
                />
                {loading && (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Typography color="error" align="center">
                        {error}
                    </Typography>
                )}

                {!loading && !error && noResults && (
                    <Typography align="center" sx={{ mt: 4 }}>
                        No images found for your search
                    </Typography>
                )}


                {!loading && !error && images.length > 0 && (
                    <>
                        <CardList images={images} />
                        {nextPage && (
                            <Box display="flex" justifyContent="center" mt={4}>
                                <Button
                                    variant="contained"
                                    onClick={loadMoreImages}
                                    disabled={loadingMore}
                                >
                                    {loadingMore ? <CircularProgress size={24} /> : 'Load More'}
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Box>
        </Container>
    );
};