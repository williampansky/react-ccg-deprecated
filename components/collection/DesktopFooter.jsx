import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { toggleFiltersBar } from '@/features/filters/filters.slice';
import DesktopSearchInput from '@/features/filters/DesktopSearchInput';

export default function DesktopFooter() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filtersBarActive } = useSelector(s => s.filters);

  return (
    <React.Fragment>
      <div className="site__desktop__footer">
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
        </div>
      </div>
    </React.Fragment>
  );
}
