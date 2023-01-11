import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {baseThemeOptions as theme} from '../../theme/base-theme-options';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import {Box, useMediaQuery} from '@mui/material';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    // paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const isNewOrderPage = router.pathname === '/dashboard/orders/new';

  const paddingLeft = !isNewOrderPage && lgUp ? 35 : 0;

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
            paddingLeft: paddingLeft
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      {
        !isNewOrderPage && (
          <DashboardSidebar
            onClose={() => setIsSidebarOpen(false)}
            open={isSidebarOpen}
          />
        )
      }
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
