import { PropsWithChildren } from 'react';
import { Box, styled } from '@mui/material';

const BoxStyled = styled(Box)`
    @media (min-width: 1280px) {
        max-width: 1280px;
        margin: auto;
    }
`;

export const MainLayout = (props: PropsWithChildren) => {
  return (
    <BoxStyled>
      {props.children}
    </BoxStyled>
  )
}