import PropTypes from 'prop-types';
import { List, ListSubheader } from '@mui/material';
import {useAuth} from '../../hooks/use-auth';
import {isAllowedRouteForProfile} from '../authentication/allowed-route-profiles';
import { DashboardSidebarItem } from './dashboard-sidebar-item';

const renderNavItems = ({ depth = 0, items, path, profileId }) => (
  <List disablePadding>
    {items.reduce((acc, item) => reduceChildRoutes({ acc, depth, item, path, profileId }), [])}
  </List>
);

const reduceChildRoutes = ({ acc, depth, item, path, profileId }) => {
  const key = `${item.title}-${depth}`;
  const partialMatch = item.path ? path.includes(item.path) : false;
  const exactMatch = path.split('?')[0] === item.path; // We don't compare query params

  if (!isAllowedRouteForProfile(profileId, item.path)) {
    return acc;
  }

  if (item.children) {
    acc.push(
      <DashboardSidebarItem
        active={partialMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={partialMatch}
        path={item.path}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          items: item.children,
          path,
          profileId
        })}
      </DashboardSidebarItem>
    );
  } else {
    acc.push(
      <DashboardSidebarItem
        active={exactMatch}
        chip={item.chip}
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        path={item.path}
        title={item.title}
      />
    );
  }

  return acc;
};

export const DashboardSidebarSection = (props) => {
  const { items, path, title, ...other } = props;
  const { user } = useAuth();

  return (
    <List
      subheader={(
        <ListSubheader
          disableGutters
          disableSticky
          sx={{
            color: 'neutral.500',
            fontSize: '0.75rem',
            fontWeight: 700,
            lineHeight: 2.5,
            ml: 4,
            textTransform: 'uppercase'
          }}
        >
          {title}
        </ListSubheader>
      )}
      {...other}>
      {renderNavItems({
        items,
        path,
        profileId: user?.profileId
      })}
    </List>
  );
};

DashboardSidebarSection.propTypes = {
  items: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
