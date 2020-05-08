import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { toggleSiteSidebar } from '@/features/site-sidebar/site-sidebar.slice';
import {
  toggleFiltersBar,
  toggleSearchModal
} from '@/features/filters/filters.slice';

export default function MobileFooter() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filtersBarActive, searchModalActive } = useSelector(s => s.filters);
  const sidebarActive = useSelector(s => s.siteSidebarActive);

  return (
    <React.Fragment>
      <div className="site__mobile__footer">
        <div className="flex">
          <div>
            <button onClick={() => router.back()}>
              <ReactSVG src="/images/site/icon-uikit-reply.svg" />
              <span>Back</span>
            </button>
          </div>
          <div>
            <button
              className={searchModalActive ? 'active' : ''}
              onClick={() => dispatch(toggleSearchModal())}
            >
              <ReactSVG src="/images/site/icon-uikit-search.svg" />
              <span>Search</span>
            </button>
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
