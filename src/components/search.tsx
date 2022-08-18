import { Grid, Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Category } from '../pages';

type Suggestions = {
  suggestions: Suggestion[],
}

type Suggestion = {
  suggestion: Category[],
}

interface SearchProps {
  onChange: (value: string) => void,
  onSelect: (value: string, category: Category[]) => void
}

const Search: React.FC<SearchProps> = ({ onChange, onSelect }) => {

  const [value, setValue] = React.useState<string>("");
  const [options, setOptions] = React.useState<Suggestion[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const toLabel = (sugestion: Suggestion | string | null) => {
    if (sugestion !== null && typeof sugestion === "object") {
      const d = [];
      for (let c of sugestion.suggestion.slice(1)) {
        d.push(c.name);
      }
      return d.join(">");
    }
    return "";
  }

  React.useEffect(() => {
    const t = setTimeout(async () => {
      if (value && value.length > 0) {
        setLoading(true);
        const result = await fetch(`/api/suggest/${value.trim().toLowerCase()}`);
        if (result.status === 200) {
          const data: Suggestions = await result.json();
          setOptions(data.suggestions);
        }
        setLoading(false);
      }
    }, 250);

    return () => {
      clearTimeout(t);
    }
  }, [value]);

  return (
    <Grid container direction={"column"} spacing={3}>
      <Grid item>
        <Autocomplete
          freeSolo
          options={options}
          getOptionLabel={toLabel}
          filterOptions={(options) => options}
          open={open && !loading && options.length > 0}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          renderInput={(params) => (
            <TextField {...params} label="Search" fullWidth />
          )}
          onInputChange={(event, newInputValue, reason) => {
            if (reason === 'reset') {
              setValue('')
              return;
            } else {
              setValue(newInputValue)
            }
          }}
          onChange={(event: any, newValue: Suggestion | string | null) => {
            if (newValue && typeof newValue === "object") {
              onSelect(value, (newValue as Suggestion).suggestion);
              setValue("");
              setOptions([]);
            }
            else if (newValue && typeof newValue === "string") {
              onChange(value);
              setValue("");
              setOptions([]);
            }
            event.preventDefault();
            event.stopPropagation();
          }}
          inputValue={value}
        />
      </Grid>
    </Grid>
  )
}

export default Search
