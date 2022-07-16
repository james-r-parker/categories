import { Grid, TextField, IconButton } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SearchProps {
  onChange: (value: string) => void
}

const Search: React.FC<SearchProps> = ({ onChange }) => {

  const [value, setValue] = React.useState<string>("");

  const onSearch = React.useCallback(() => {
    onChange(value);
    setValue("");
  }, [onChange, value]);

  const onKeyPress = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  }, [onSearch]);

  return (
    <Grid container direction={"column"} spacing={3}>
      <Grid item>
        <TextField
          label="Parcel Contents"
          fullWidth
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onKeyUp={onKeyPress}
          InputProps={{
            endAdornment: <IconButton aria-label="search" onClick={onSearch}><SearchIcon /></IconButton>
          }}
        />
      </Grid>
    </Grid>
  )
}

export default Search
