import { PropsWithChildren } from 'react';
import { Box, styled } from '@mui/material';

const BoxStyled = styled(Box)`
    padding: ${({ theme }) => theme.spacing(0, 1, 0, 1)};
`;

export const MainLayout = (props: PropsWithChildren) => {
  return (
    <BoxStyled>
      {props.children}
    </BoxStyled>
  );
};