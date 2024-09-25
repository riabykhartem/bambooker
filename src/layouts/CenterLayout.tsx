import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

const BoxStyled = styled(Box)`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

export default function CenterLayout() {
  return (
    <BoxStyled>
      <Outlet />
    </BoxStyled>
  );
};