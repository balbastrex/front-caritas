import {Box, Button, Card, CardMedia, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {useState} from 'react';

const BlogPostCardMediaWrapper = styled('div')({
  height: 400,
  maxWidth: 333.33,
  position: 'relative'
});

export const ReportCard = ({ report, defaultData, onPrint }) => {
  const [data, setData] = useState(defaultData);

  return (
    <Grid
      item
      key={report.id}
      md={4}
      xs={12}
      minWidth={333.33}
    >
      <Card
        sx={{
          height: '100%',
          p: 2,
        }}
      >
        <BlogPostCardMediaWrapper>
          <Box sx={{mt: 2}}>
            <Typography variant="h5" align="center">
              {report.title}
            </Typography>
          </Box>
          <CardMedia
            image={report.cover}
            sx={{
              borderRadius: 1,
              height: '80%',
              position: 'absolute',
              top: 50,
              zIndex: 10,
              width: '100%',
            }}
          />
        </BlogPostCardMediaWrapper>
        <Box sx={{display: 'flex', justifyContent: report.options ? 'space-between' : 'center'}}>
          {
            report.options && (
              <FormControl sx={{m: 1, minWidth: 150}} size="small">
                <InputLabel id="demo-select-small">UF</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={data}
                  label="UF"
                  onChange={(event) => {
                    setData(event.target.value);
                  }}
                >
                  {report.options?.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )
          }
          <Button
            color="primary"
            variant="contained"
            onClick={() => onPrint(report.id, data)}
          >
            Imprimir
          </Button>
        </Box>
      </Card>
    </Grid>
  )
}
