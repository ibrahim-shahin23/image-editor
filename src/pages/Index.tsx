import React, { useState, useRef } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Slider, 
  ToggleButton, 
  ToggleButtonGroup, 
  Card, 
  Stack
} from "@mui/material";
import { 
  RotateLeft, 
  RotateRight,
  Image as ImageIcon
} from "@mui/icons-material";
import FlipHorizontal from "../components/icons/FlipHorizontal";
import FlipVertical from "../components/icons/FlipVertical";
import { styled } from "@mui/material/styles";
import { downloadCanvasImage, applyFilter } from "../utils/imageUtils";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
  overflow: 'visible',
  backgroundColor: '#fff',
  padding: theme.spacing(4),
  maxWidth: 900,
  width: '100%'
}));

const FilterButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(1, 3),
  textTransform: 'none',
  '&.Mui-selected': {
    backgroundColor: '#a5b4fc',
    color: 'white',
    '&:hover': {
      backgroundColor: '#8c9ef8',
    }
  }
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 8,
  padding: theme.spacing(1.5, 4),
  textTransform: 'none',
}));

const ImageArea = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f7',
  borderRadius: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 300,
  width: '100%',
  padding: theme.spacing(2),
}));

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('');
  const [filterIntensity, setFilterIntensity] = useState<number>(100);
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };
  
  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string,
  ) => {
    if (newFilter === activeFilter) {
      setActiveFilter('');
    } else {
      setActiveFilter(newFilter);
    }
  };
  
  const handleFilterIntensityChange = (event: Event, newValue: number | number[]) => {
    setFilterIntensity(newValue as number);
  };
  
  const resetFilters = () => {
    setActiveFilter('');
    setFilterIntensity(100);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  };

  const saveImage = () => {
    alert("Save functionality will be implemented soon!");
  };

  const handleRotate = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setRotation((prev) => (prev - 90) % 360);
    } else {
      setRotation((prev) => (prev + 90) % 360);
    }
  };

  const handleFlip = (direction: 'horizontal' | 'vertical') => {
    if (direction === 'horizontal') {
      setFlipH(prev => !prev);
    } else {
      setFlipV(prev => !prev);
    }
  };

  const getActiveFilterLabel = () => {
    if (activeFilter === 'brightness') return 'Brightness';
    if (activeFilter === 'saturation') return 'Saturation';
    if (activeFilter === 'inversion') return 'Inversion';
    if (activeFilter === 'grayscale') return 'Grayscale';
    return 'Filter Intensity';
  };

  return (
    <Box sx={{ bgcolor: '#e6f2ff', minHeight: '100vh', py: 4, px: 2 }}>
      <Container>
        <StyledCard>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Easy Image Editor
          </Typography>
          
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} mt={4}>
            <Box sx={{ width: { xs: '100%', md: '40%' } }}>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              
              <ToggleButtonGroup
                exclusive
                value={activeFilter}
                onChange={handleFilterChange}
                aria-label="image filters"
                sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}
              >
                <FilterButton value="brightness" aria-label="brightness">
                  Brightness
                </FilterButton>
                <FilterButton value="saturation" aria-label="saturation">
                  Saturation
                </FilterButton>
                <FilterButton value="inversion" aria-label="inversion">
                  Inversion
                </FilterButton>
                <FilterButton value="grayscale" aria-label="grayscale">
                  Grayscale
                </FilterButton>
              </ToggleButtonGroup>
              
              <Box sx={{ mt: 4 }}>
                <Typography gutterBottom>
                  {getActiveFilterLabel()}
                </Typography>
                <Slider
                  value={filterIntensity}
                  onChange={handleFilterIntensityChange}
                  aria-labelledby="filter-intensity-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  min={0}
                  max={200}
                  disabled={activeFilter === ''}
                  sx={{
                    color: '#a5b4fc',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#fff',
                      border: '2px solid currentColor',
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">0%</Typography>
                  <Typography variant="body2" color="text.secondary">{filterIntensity}%</Typography>
                  <Typography variant="body2" color="text.secondary">200%</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Typography gutterBottom>
                  Rotate & Flip
                </Typography>
                <Stack direction="row" spacing={1}>
                  <ToggleButton 
                    value="rotate-left" 
                    aria-label="rotate left"
                    onClick={() => handleRotate('left')}
                  >
                    <RotateLeft />
                  </ToggleButton>
                  <ToggleButton 
                    value="rotate-right" 
                    aria-label="rotate right"
                    onClick={() => handleRotate('right')}
                  >
                    <RotateRight />
                  </ToggleButton>
                  <ToggleButton 
                    value="flip-horizontal" 
                    aria-label="flip horizontal"
                    selected={flipH}
                    onClick={() => handleFlip('horizontal')}
                  >
                    <FlipHorizontal />
                  </ToggleButton>
                  <ToggleButton 
                    value="flip-vertical" 
                    aria-label="flip vertical"
                    selected={flipV}
                    onClick={() => handleFlip('vertical')}
                  >
                    <FlipVertical />
                  </ToggleButton>
                </Stack>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <ActionButton
                  variant="outlined"
                  color="inherit"
                  onClick={resetFilters}
                >
                  RESET FILTERS
                </ActionButton>
              </Box>
            </Box>
            
            <Box sx={{ width: { xs: '100%', md: '60%' } }}>
              <ImageArea>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Selected"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      filter: activeFilter ? applyFilter(activeFilter, filterIntensity) : '',
                      transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
                      transition: 'transform 0.3s ease, filter 0.3s ease'
                    }}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <ImageIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                    <Typography variant="body1" color="text.secondary">
                      Choose Image to Edit
                    </Typography>
                  </Box>
                )}
              </ImageArea>
              
              <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="choose-image-button"
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="choose-image-button">
                  <Button
                    component="span"
                    variant="contained"
                    sx={{ 
                      bgcolor: '#6e7681', 
                      '&:hover': { bgcolor: '#555b63' },
                      borderRadius: 1,
                      textTransform: 'none'
                    }}
                  >
                    CHOOSE IMAGE
                  </Button>
                </label>
                
                <Button
                  variant="contained"
                  onClick={saveImage}
                  sx={{ 
                    bgcolor: '#a5b4fc', 
                    '&:hover': { bgcolor: '#8c9ef8' },
                    borderRadius: 1,
                    textTransform: 'none'
                  }}
                >
                  SAVE IMAGE
                </Button>
              </Stack>
            </Box>
          </Stack>
        </StyledCard>
      </Container>
    </Box>
  );
};

export default Index;
