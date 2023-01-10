import BusinessIcon from '@mui/icons-material/Business';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChurchIcon from '@mui/icons-material/Church';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import {Box, Divider, Drawer, Typography, useMediaQuery} from '@mui/material';
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '../../hooks/use-auth';
import {Home as HomeIcon} from '../../icons/home';
import {Users as UsersIcon} from '../../icons/users';
import {isAllowedSectionForProfile} from '../authentication/allowed-route-profiles';
import {Scrollbar} from '../scrollbar';
import {DashboardSidebarSection} from './dashboard-sidebar-section';
import {OrganizationPopover} from './organization-popover';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const getSections = (t) => [
  {
    title: t('General'),
    items: [
      {
        title: t('Dashboard'),
        path: '/',
        icon: <HomeIcon fontSize="small" />
      }
      /*{
        title: t('Analytics'),
        path: '/dashboard/analytics',
        icon: <ChartBarIcon fontSize="small" />
      },
      {
        title: t('Finance'),
        path: '/dashboard/finance',
        icon: <ChartPieIcon fontSize="small" />
      },
      {
        title: t('Logistics'),
        path: '/dashboard/logistics',
        icon: <TruckIcon fontSize="small" />,
        chip: <Chip
          color="secondary"
          label={(
            <Typography
              sx={{
                fontSize: '10px',
                fontWeight: '600'
              }}
            >
              NEW
            </Typography>
          )}
          size="small"
        />
      },
      {
        title: t('Account'),
        path: '/dashboard/account',
        icon: <UserCircleIcon fontSize="small" />
      }*/
    ]
  },
  {
    title: t('Mantenimiento'),
    items: [
      {
        title: t('Economatos'),
        path: '/dashboard/markets',
        icon: <StorefrontIcon fontSize="small" />,
      },
      /*{
        title: t('customers'),
        path: '/dashboard/customers',
        icon: <UsersIcon fontSize="small" />,
        children: [
          {
            title: t('Listado'),
            path: '/dashboard/customers'
          },
          {
            title: t('Details'),
            path: '/dashboard/customers/1'
          },
          {
            title: t('Edit'),
            path: '/dashboard/customers/1/edit'
          }
        ]
      },*/
      {
        title: t('Parroquias'),
        path: '/dashboard/parishes',
        icon: <ChurchIcon fontSize="small" />,
      },
      {
        title: t('Beneficiarios'),
        icon: <AssignmentIndIcon fontSize="small" />,
        path: '/dashboard/beneficiaries',
      },
      {
        title: t('Productos'),
        icon: <ViewHeadlineIcon fontSize="small" />,
        path: '/dashboard/products',
        children: [
          {
            title: t('Listado'),
            path: '/dashboard/products',
            icon: <SummarizeIcon fontSize="small" />,
          },
          {
            title: t('Entradas'),
            path: '/dashboard/receipts',
            icon: <ReceiptIcon fontSize="small" />,
          }
        ]
      },
      {
        title: t('Ventas'),
        icon: <ShoppingCartCheckoutIcon fontSize="small" />,
        path: '/dashboard/orders',
      },
      {
        title: t('Historico Ventas'),
        path: '/dashboard/invoices',
        icon: <ShoppingCartCheckoutIcon fontSize="small" />,
      },
      {
        title: t('Turnos'),
        path: '/dashboard/turns',
        icon: <EventRepeatIcon fontSize="small" />,
      },
      {
        title: t('Proveedores'),
        path: '/dashboard/providers',
        icon: <BusinessIcon fontSize="small" />,
      },
      {
        title: t('Calendario'),
        path: '/dashboard/calendar',
        icon: <CalendarMonthIcon fontSize="small" />,
      },
      {
        title: t('Usuarios'),
        path: '/dashboard/users',
        icon: <UsersIcon fontSize="small" />,
      }
    ]
  },
  /*{
    title: t('Platforms'),
    items: [
      {
        title: t('Job Listings'),
        path: '/dashboard/jobs',
        icon: <OfficeBuildingIcon fontSize="small" />,
        children: [
          {
            title: t('Browse'),
            path: '/dashboard/jobs'
          },
          {
            title: t('Details'),
            path: '/dashboard/jobs/companies/1'
          },
          {
            title: t('Create'),
            path: '/dashboard/jobs/new'
          }
        ]
      },
      {
        title: t('Social Media'),
        path: '/dashboard/social',
        icon: <ShareIcon fontSize="small" />,
        children: [
          {
            title: t('Profile'),
            path: '/dashboard/social/profile'
          },
          {
            title: t('Feed'),
            path: '/dashboard/social/feed'
          }
        ]
      },
      {
        title: t('Blog'),
        path: '/blog',
        icon: <NewspaperIcon fontSize="small" />,
        children: [
          {
            title: t('Post List'),
            path: '/blog'
          },
          {
            title: t('Post Details'),
            path: '/blog/1'
          },
          {
            title: t('Post Create'),
            path: '/blog/new'
          }
        ]
      }
    ]
  },
  {
    title: t('Apps'),
    items: [
      {
        title: t('Kanban'),
        path: '/dashboard/kanban',
        icon: <ClipboardListIcon fontSize="small" />
      },
      {
        title: t('Mail'),
        path: '/dashboard/mail',
        icon: <MailIcon fontSize="small" />
      },
      {
        title: t('Chat'),
        path: '/dashboard/chat',
        icon: <ChatAlt2Icon fontSize="small" />
      },
      {
        title: t('Calendar'),
        path: '/dashboard/calendar',
        icon: <CalendarIcon fontSize="small" />
      }
    ]
  },*/
  /*{
    title: t('Pages'),
    items: [
      {
        title: t('Auth'),
        path: '/authentication',
        icon: <LockClosedIcon fontSize="small" />,
        children: [
          {
            title: t('Register'),
            path: '/authentication/register?disableGuard=true'
          },
          {
            title: t('Login'),
            path: '/authentication/login?disableGuard=true'
          }
        ]
      },
      {
        title: t('Pricing'),
        path: '/dashboard/pricing',
        icon: <CreditCardIcon fontSize="small" />
      },
      {
        title: t('Checkout'),
        path: '/checkout',
        icon: <CashIcon fontSize="small" />
      },
      {
        title: t('Contact'),
        path: '/contact',
        icon: <MailOpenIcon fontSize="small" />
      },
      {
        title: t('Error'),
        path: '/error',
        icon: <XCircleIcon fontSize="small" />,
        children: [
          {
            title: '401',
            path: '/401'
          },
          {
            title: '404',
            path: '/404'
          },
          {
            title: '500',
            path: '/500'
          }
        ]
      }
    ]
  }*/
];

export const DashboardSidebar = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { user } = useAuth();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    noSsr: true
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState(false);

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath]);

  const handleOpenOrganizationsPopover = () => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = () => {
    setOpenOrganizationsPopover(false);
  };

  const renderSectionWithProfileID = (section) => {

    return isAllowedSectionForProfile(user?.profileId, section.title) && (
      <DashboardSidebarSection
        key={section.title}
        path={router.asPath}
        sx={{
          mt: 2,
          '& + &': {
            mt: 2
          }
        }}
        {...section} />
    )
  }

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <div>
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <NextLink
                href="/"
                passHref
              >
                <a>
                  <img src={'/logo.jpg'} style={{ width: '220px'}} alt='logo'/>
                </a>
              </NextLink>
            </Box>
            {/*<Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1
                }}
              >
                <div>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    Acme Inc
                  </Typography>
                  <Typography
                    color="neutral.400"
                    variant="body2"
                  >
                    {t('Your tier')}
                    {' '}
                    : Premium
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: 'neutral.500',
                    width: 14,
                    height: 14
                  }}
                />
              </Box>
            </Box>*/}
          </div>
          <Divider
            sx={{
              borderColor: '#2D3748',
              my: 1
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            {sections.map(renderSectionWithProfileID)}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748'  // dark divider
            }}
          />
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography
              color="secondary.main"
              variant="subtitle1"
            >
              {t('Cáritas Diocesana de Valencia')}
            </Typography>
          </Box>
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => theme.palette.mode === 'dark' ? 1 : 0,
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
