import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import { toggleFiltersBar } from '@/features/filters/filters.slice';
import { toggleSiteSidebar } from '@/features/site-sidebar/site-sidebar.slice';
import DesktopSearchInput from '@/features/filters/DesktopSearchInput';

export default function DesktopFooter() {
  const dispatch = useDispatch();
  const { filtersBarActive } = useSelector(s => s.filters);
  const sidebarActive = useSelector(s => s.siteSidebarActive);

  return (
    <React.Fragment>
      <div
        className={[
          'site__desktop__footer',
          sidebarActive ? 'collection__sidebar--active' : ''
        ].join(' ')}
      >
        <div className="flex">
          <div className="flex-grow">
            <DesktopSearchInput />
          </div>
          <div>
            <button
              className={filtersBarActive ? 'active' : ''}
              onClick={() => dispatch(toggleFiltersBar())}
            >
              <ReactSVG src="/images/site/icon-uikit-settings.svg" />
              <span>Filters</span>
            </button>
          </div>
          <div>
            <button
              className={sidebarActive ? 'active' : ''}
              onClick={() => dispatch(toggleSiteSidebar())}
            >
              <ReactSVG src="/images/site/icon-uikit-thumbnails.svg" />
              <span>Sidebar</span>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
