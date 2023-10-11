import { CircularProgress, styled } from '@mui/material';
import React from 'react';

const LoadingContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  textAlign: 'center',
}));

const LoadingText = styled('div')((props) => ({
  marginTop: props.theme.spacing(2),
  color: props.theme.colors.text.primary,
}));

export default function Loading() {
  return (
    <LoadingContainer>
      <div>
        <div>
          <CircularProgress />
        </div>
        <LoadingText>Loading...</LoadingText>
      </div>
    </LoadingContainer>
  );
}
