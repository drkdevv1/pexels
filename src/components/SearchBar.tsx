import { useState } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';

const SearchWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    maxWidth: '600px',
    margin: '0 auto',
    padding: theme.spacing(2),
}));

interface SearchBarProps {
    onSearch: (query: string) => void;
    onClear: () => void;
    disabled?: boolean;
    setNoResults: (value: boolean) => void;
}
export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear, disabled, setNoResults }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    const handleClear = () => {
        setSearchQuery('');
        setNoResults(false);
        onClear();
    };

    return (
        <form onSubmit={handleSubmit}>
            <SearchWrapper>
                <TextField
                    fullWidth
                    placeholder="Search for images..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={disabled}
                    size="small"
                />
                {searchQuery && (
                    <IconButton
                        onClick={handleClear}
                        disabled={disabled}
                    >
                        <ClearIcon />

                    </IconButton>

                )}
                <IconButton
                    type="submit"
                    disabled={disabled || !searchQuery.trim()}
                    color="primary"
                >
                    <SearchIcon />
                </IconButton>
            </SearchWrapper>
        </form>
    );
};