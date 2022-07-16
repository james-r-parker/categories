import { Box, Grid, Paper, Typography } from "@mui/material"
import React from "react";
import { ApiResponse } from "../pages"

interface OverviewProps {
    result: ApiResponse,
    query: string
}

const Overview: React.FC<OverviewProps> = ({ result, query }) => {

    const category = React.useMemo(() => {
        return result.categories.reduce((p: string, c) => {
            if (p === "") {
                p = c.name;
            }
            else {
                p += " > " + c.name;
            }
            return p;
        }, "");
    }, [result]);

    const hsCode = React.useMemo(() => {
        return [...result.categories].reverse().filter(x => x.meta?.hsCode !== undefined && x.meta?.hsCode.length > 0)[0]?.meta?.hsCode || "Unknown";
    }, [result]);

    const prohibited = React.useMemo(() => {
        return ([...result.categories].reverse().filter(x => x.meta?.prohibited !== undefined)[0]?.meta?.prohibited || 'false') === 'true';
    }, [result]);

    const protectable = React.useMemo(() => {
        return ([...result.categories].reverse().filter(x => x.meta?.protectable !== undefined)[0]?.meta?.protectable || 'true') === 'true';
    }, [result]);

    return (
        <Paper>
            <Box p={4}>
                {JSON.stringify(result)}
                <Typography variant='h3' component="h3" mb={2}>{query}</Typography>
                <Typography variant='h6' component="p" mb={1}>Category : {category}</Typography>
                <Typography variant='h6' component="p" mb={1}>Tariff Code : {hsCode}</Typography>
                <Typography variant='h6' component="p" mb={1}>Prohibited : {prohibited ? '✅' : '❌'}</Typography>
                <Typography variant='h6' component="p" mb={1}>Protectable : {protectable ? '✅' : '❌'}</Typography>
            </Box>
        </Paper>
    )
}

export default Overview