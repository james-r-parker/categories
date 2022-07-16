import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { ApiResponse } from '../pages';

interface ResultItemProps {
  id: string,
  name: string,
  meta?: { [name: string]: string }
  onChange: (id: string, meta: { [name: string]: string }) => void
}

const ResultItem: React.FC<ResultItemProps> = ({ id, name, meta, onChange }) => {

  const [hsCode, setHsCode] = React.useState<string>(meta?.hsCode || '');
  const [prohibited, setProhibited] = React.useState<boolean>((meta?.prohibited || 'false') === "true");
  const [protectable, setProtectable] = React.useState<boolean>((meta?.protectable || 'true') === "true");

  const onSave = React.useCallback(() => {
    onChange(id, { hsCode: hsCode, prohibited: prohibited.toString(), protectable: protectable.toString() })
  }, [id, onChange, hsCode, prohibited, protectable]);

  return (
    <Paper>
      <Box p={4} style={{ minWidth: 400 }}>
        <Typography variant='h5' component="h5" textAlign="center" mb={3}>{name}</Typography>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <TextField
              label="HS Code"
              value={hsCode}
              onChange={(e) => setHsCode(e.currentTarget.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={prohibited} onChange={(e) => setProhibited(e.target.checked)} />} label="Prohibited" />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox checked={protectable} onChange={(e) => setProtectable(e.target.checked)} />} label="Protectable" />
          </Grid>
          <Grid item>
            <Button onClick={onSave} variant="outlined" fullWidth>Save</Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

interface ResultProps {
  query: string,
  result: ApiResponse,
  onChange: (id: string, meta: { [name: string]: string }) => void
}

const Result: React.FC<ResultProps> = ({ query, result, onChange }) => {

  return (
    <>
      <Typography variant='h3' component="h3" mb={3}>{query}</Typography>
      <Grid container direction="row" spacing={6} justifyContent="center" alignItems="center">
        {result.categories.map((c) => {
          return (
            <Grid item key={c.id}>
              <ResultItem {...c} onChange={onChange} />
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

export default Result
