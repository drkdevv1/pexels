import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Card } from './Card';
import { CardListProps } from '../types/interfaces/images';

const CardContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    padding: theme.spacing(1),
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: '100%',
    boxSizing: 'border-box',
}));

export const CardList: React.FC<CardListProps> = ({ images }) => {
    return (
        <CardContainer>
            {images.map((image) => (
                <Card
                    key={image.id}
                    {...image}
                />
            ))}
        </CardContainer>
    );
};